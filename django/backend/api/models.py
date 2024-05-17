from django.db import models
from django.contrib.auth.models import User
import sys


# Create your models here.
class Token(models.Model):
    access_token = models.CharField(max_length = 64)
    token_type = models.CharField(max_length = 6, null = True)
    expires_in = models.IntegerField(null = True)
    refresh_token = models.CharField(max_length = 64, null = True)
    scope = models.CharField(max_length = 6, null = True)
    created_at = models.IntegerField(null = True)
    secret_valid_until = models.IntegerField(null = True)
    def get_or_create(data):
        orgs = Token.objects.filter(access_token=data['access_token'])
        if not orgs:
            t = Token(access_token = data['access_token'],
                      token_type = data['token_type'],
                      expires_in = data['expires_in'],
                      refresh_token = data['refresh_token'],
                      scope = data['scope'],
                      created_at = data['created_at'],
                      secret_valid_until = data['secret_valid_until']
                      )
            t.save()
            return t
        return orgs.get()

class ExtendedUser(models.Model):
    email = models.CharField(max_length = 64)
    login = models.CharField(max_length = 64)
    first_name = models.CharField(max_length = 64)
    last_name = models.CharField(max_length = 64)
    image_medium = models.ImageField(upload_to = '.')
    image_small = models.CharField(max_length = 128)
    pool_month = models.CharField(max_length = 64)
    pool_year = models.CharField(max_length = 64)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.ForeignKey(Token, on_delete=models.CASCADE, null = True)
    def create_users(api_data):
        for x in range(1, 9):
            usr1 = User.objects.create_user("test"+str(x))
            usr1.save()
            user = api_data['user'+str(x)];
            ext = ExtendedUser(email = user['email'],
                               login = user['login'],
                               first_name = user['first_name'],
                               last_name = user['last_name'],
                               image_medium = user['image'],
                               pool_month = user['month'],
                               pool_year = user['year'],
                               user = usr1,
                               )
            ext.save()
        return ext
    def get_or_create(api_data, user, token):
        ext = ExtendedUser.objects.filter(token = token.id)
        if not ext:
            ext = ExtendedUser(email = api_data['email'],
                               login = api_data['login'],
                               first_name = api_data['first_name'],
                               last_name = api_data['last_name'],
                               image_medium = api_data['image']['versions']['medium'],
                               image_small = api_data['image']['versions']['small'],
                               pool_month = api_data['pool_month'],
                               pool_year = api_data['pool_year'],
                               user = user,
                               token = token,
                               )
            ext.save()
            return ext
        return ext.get()

