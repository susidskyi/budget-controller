from budget.models import Incomes, Expenses, User, GroupNames
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
    synonyms = serializers.SerializerMethodField('get_synonyms')

    class Meta:
        model = Expenses 
        fields = ['name', 'price', 'created_at', 'synonyms']

    def get_synonyms(self, obj):
        synonyms = [obj.name]
        if (qs := GroupNames.objects.filter(synonyms__icontains=obj.name)).exists():
            synonyms = qs.first().synonyms
        return synonyms
