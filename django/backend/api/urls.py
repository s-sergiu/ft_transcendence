from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("get-token", views.getToken, name="get-token"),
    path("get-info", views.getUserInfo, name="get-info"),
]
