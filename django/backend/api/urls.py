from django.urls import path

from . import views

urlpatterns = [
    path("get-csrf", views.index, name="index"),
    path("get-token", views.getToken, name="get-token"),
    path("get-info", views.getUserInfo, name="get-info"),
    path("register", views.register, name="register"),
    path("login", views.login, name="login"),
]
