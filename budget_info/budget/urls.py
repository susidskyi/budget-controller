from django.urls import path, include
from rest_framework import routers
from budget import views


router = routers.DefaultRouter()
router.register(r'incomes', views.IncomesViewSet)
router.register(r'expenses', views.ExpensesViewSet)


urlpatterns = [
    path('', include(router.urls))
]