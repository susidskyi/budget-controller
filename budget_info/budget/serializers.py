from budget.models import Incomes, Expenses, User
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['telegram_id', 'username', 'first_name']


class IncomesSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Incomes
        fields = ['user', 'value', 'created_at']


class ExpensesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Expenses 
        fields = ['name', 'price', 'created_at']
