from django.urls import path

from . import views

urlpatterns = [
    path("get-csrf", views.index, name="index"),
    path("get-token", views.getToken, name="get-token"),
    path("get-info", views.getUserInfo, name="get-info"),
    path("change-info", views.changeInfo, name="change-info"),
    path("change-match-data", views.changeMatchData, name="change-match-data"),
    path("get-match-data", views.getMatchData, name="get-match-data"),
    path("get-match-wins", views.getMatchWins, name="get-match-wins"),
    path("get-userlist", views.getUserList, name="get-userlist"),
    path("get-friendlist", views.getFriendList, name="get-friendlist"),
    path("add-friend", views.addFriend, name="add-friend"),
    path("remove-friend", views.removeFriend, name="remove-friend"),
    path("get-match-loss", views.getMatchLoss, name="get-match-loss"),
    path("register", views.register, name="register"),
    path("login", views.login, name="login"),
]
