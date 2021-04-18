from django.contrib import admin
from budget.models import User, Expenses, Incomes

admin.site.register(User)
admin.site.register(Expenses)
admin.site.register(Incomes)
# Register your models here.
