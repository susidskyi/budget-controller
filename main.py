import os
import telebot
from dotenv import load_dotenv
from database.models import User, Expenses, Incomes
from database.conf import session
from sqlalchemy import func

load_dotenv()

bot = telebot.TeleBot(os.getenv('BOT_TOKEN'))

def add_transaction(user, message, chat_id):
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
    if message == 'баланс':
        income_sum = session.query(func.sum(Incomes.value)).scalar() or 0
        expenses_sum = session.query(func.sum(Expenses.price)).scalar() or 0
        bot.send_message(
            chat_id, 
            f'*{round(income_sum - expenses_sum, 2)} грн*', 
            parse_mode='Markdown'
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