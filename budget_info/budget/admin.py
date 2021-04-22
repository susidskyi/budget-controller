from django.contrib import admin
from budget.models import User, Expenses, Incomes, GroupNames

admin.site.register(User)
admin.site.register(Expenses)
admin.site.register(Incomes)
admin.site.register(GroupNames)
