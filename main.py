import os
import telebot
from datetime import datetime
from dateutil.relativedelta import relativedelta
from dotenv import load_dotenv

from database.models import User, Expenses, Incomes
from database.conf import session

from utils import format_date

from sqlalchemy import func

load_dotenv()

bot = telebot.TeleBot(os.getenv('BOT_TOKEN'))

@bot.message_handler(commands=['balance'])
def send_balance(message):
    income_sum = session.query(func.sum(Incomes.value)).scalar() or 0
    expenses_sum = session.query(func.sum(Expenses.price)).scalar() or 0
    balance = round(income_sum - expenses_sum, 2)

    bot.send_message(
        message.chat.id, 
        f'*{balance} грн*', 
        parse_mode='Markdown'
    )

@bot.message_handler(commands=['last_incomes'])
def send_last_incomes(message):
    incomes = session.query(Incomes).order_by(Incomes.created_at.desc())[:10]
    message_to_send = [
        f'{income.user.first_name} *{income.value}*'
        for income in incomes
    ]

    max_length = len(max(message_to_send, key=len))

    for i in range(len(message_to_send)):
        item = message_to_send[i]
        message_to_send[i] = item + f"`{(max_length - len(item)) * ' '}`" + f" {format_date(incomes[i].created_at)}" 

    message_to_send = '\n'.join(message_to_send)

    bot.send_message(
        message.chat.id,
        message_to_send,
        parse_mode='Markdown'
    )

@bot.message_handler(commands=['last_expenses'])
def send_last_expenses(message):
    expenses = session.query(Expenses).order_by(Expenses.created_at.desc())[:10]
    message_to_send =  [f'{expense.name.title()}' for expense in expenses]

    max_length = len(max(message_to_send, key=len))

    for i in range(len(message_to_send)):
        item = message_to_send[i]
        message_to_send[i] = item + f"`{(max_length - len(item)) * ' '}`" + f" *{expenses[i].price}*" 

    message_to_send = '\n'.join(message_to_send)

    bot.send_message(
        message.chat.id,
        message_to_send,
        parse_mode='Markdown'
    )

@bot.message_handler(commands=['month_incomes'])
def send_month_incomes(message):
    last_month_date = datetime.today() - relativedelta(months=1)
    incomes = session.query(Incomes).filter(
        Incomes.created_at > last_month_date
    ).order_by(Incomes.created_at.desc())
    message_to_send = [
        f'{income.user.first_name.strip()} *{income.value}*'
        for income in incomes
    ]
    max_length = len(max(message_to_send, key=len))

    for i in range(len(message_to_send)):
        item = message_to_send[i]
        message_to_send[i] = item + f"`{(max_length - len(item)) * ' '}`" + f" {format_date(incomes[i].created_at)}" 

    total_incomes = sum([income.value for income in incomes])
    message_to_send = '\n'.join(message_to_send) + f'\n\nСумма: *{total_incomes}*'

    bot.send_message(
        message.chat.id,
        message_to_send,
        parse_mode='Markdown'
    )

@bot.message_handler(commands=['month_expenses'])
def send_month_expenses(message):
    last_month_date = datetime.today() - relativedelta(months=1)
    expenses = session.query(func.sum(Expenses.price)).filter(
        Expenses.created_at > last_month_date
    ).scalar() or 0

    bot.send_message(
        message.chat.id,
        f'*{expenses}* грн',
        parse_mode='Markdown'
    )

def add_transaction(user, message, chat_id):
    try:
        if message.startswith('р'):
            message = message[1:]
            item_prices = [item.strip() for item in message.strip().split(',')]

            for item in item_prices:
                product, price = item.split(' ')

                session.add(
                    Expenses(
                        user=user,
                        name=product,
                        price=price,
                    )
                )
        if message.startswith('д'):
            value = message[1:].strip()
            session.add(
                Incomes(
                    user=user,
                    value=value
                )
            )
    except Exception:
        bot.send_message(
            chat_id,
            f'`Ошибка, проверьте отправленное сообщение!`',
            parse_mode="Markdown"
        )

def listener(messages):
    for m in messages:
        chat_id = m.chat.id
        user = session.query(User).filter(User.telegram_id==m.from_user.id).first()
        if not user:
            user = User(
                telegram_id=m.from_user.id,
                first_name=m.from_user.first_name,
                username=m.from_user.username,
            )      
            session.add(user)  
        add_transaction(user, m.text.lower(), chat_id)
        session.commit()

bot.set_update_listener(listener)
bot.polling()
