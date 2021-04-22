from django.db import models
from django.contrib.postgres.fields import ArrayField


class User(models.Model):
    telegram_id = models.IntegerField()
    username = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f'{self.username} - {self.first_name or ""}'


class Expenses(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='expense_user',
    )
    name = models.CharField(max_length=50)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'expenses'
        verbose_name = 'Expense'
        verbose_name_plural = 'Expenses'

    def __str__(self):
        return f'{self.user.username or self.user.first_name} - {self.name} - {self.price}'
    

class Incomes(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='incomes_user'
    )
    value = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'incomes'
        verbose_name = 'Income'
        verbose_name = 'Incomes'
    
    def __str__(self):
        return f'{self.user.username or self.user.first_name} - {self.value}'


class GroupNames(models.Model):
    name = models.CharField(max_length=50)
    synonyms = ArrayField(models.CharField(max_length=50))

    class Meta:
        db_table='group_names'
        verbose_name = 'Group name'
        verbose_name_plural = 'Group names'
    
    def __str__(self):
        return self.name
