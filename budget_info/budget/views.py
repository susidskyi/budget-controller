from django.shortcuts import render
from django.db.models import Q 

from rest_framework import viewsets

from budget.serializers import ExpensesSerializer, IncomesSerializer
from budget.models import Incomes, Expenses 
from budget.utils import create_date_filter


class ExpensesViewSet(viewsets.ModelViewSet):
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer

    def get_queryset(self):
        _q = create_date_filter(self.request.query_params)

        return Expenses.objects.filter(_q)
        

class IncomesViewSet(viewsets.ModelViewSet):
    queryset = Incomes.objects.all()
    serializer_class = IncomesSerializer

    def get_queryset(self):
        _q = create_date_filter(self.request.query_params)

        return Incomes.objects.filter(_q)
