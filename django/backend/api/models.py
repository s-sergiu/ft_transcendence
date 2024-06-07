from django.db import models
from django.contrib.auth.models import User
import sys, hashlib
 
class MatchData(models.Model):
    player1 = models.CharField(max_length = 64)
    player2 = models.CharField(max_length = 64)
    score1 = models.CharField(max_length = 2)
    score2 = models.CharField(max_length = 2)
    timenow = models.CharField(max_length = 64)
    winner = models.CharField(max_length = 64)
    loser = models.CharField(max_length = 64)
    def add_entry(data):
        if (data['score1'] > data['score2']): 
            win = data['player1'];
            lose = data['player2'];
        else:
            win = data['player2'];
            lose = data['player1'];
        m = MatchData( player1 = data['player1'],
                       player2 = data['player2'],
                       score1 = data['score1'],
                       score2 = data['score2'],
                       timenow = data['timenow'],
                       winner = win,
                       loser = lose,
                      )
        m.save()
    def get_entry(data):
        m = MatchData.objects.filter(player1 = data) | MatchData.objects.filter(player2 =data);
        return m;
    def get_wins(data):
        m = MatchData.objects.filter(winner = data) 
        if m is None:
            return 0;
        return m;
    def get_loss(data):
        m = MatchData.objects.filter(loser = data) 
        if m is None:
            return 0;
        return m;

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
    location = models.CharField(max_length = 64, null = True)
    image_medium = models.CharField(max_length = 256)
    image_small = models.CharField(max_length = 128)
    pool_month = models.CharField(max_length = 64)
    pool_year = models.CharField(max_length = 64)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.ForeignKey(Token, on_delete=models.CASCADE, null = True)
    def create_user(api_data, user):
        ext = ExtendedUser.objects.filter(email = api_data['email'])
        if not ext:
            email = api_data['email']
            email_encoded = email.lower().encode('utf-8')
            email_hash = hashlib.sha256(email_encoded).hexdigest()
            url = 'https://www.gravatar.com/avatar/' + email_hash;
            ext = ExtendedUser(email = api_data['email'],
                               login = api_data['username'],
                               first_name = api_data['first_name'],
                               last_name = api_data['last_name'],
                               location = api_data['location'],
                               image_medium = url,
                               user = user,
                               )
            ext.save()
        return ext
    def get_or_create(api_data, user, token):
        ext = ExtendedUser.objects.filter(email = api_data['email'])
        if ext:
            test = ext.get()
            if test.token is None:
                return None
            if (token.access_token != test.token.access_token):
                ext.update(token = token);
                delete = test.token
                delete.delete()
        if not ext:
            ext = ExtendedUser(email = api_data['email'],
                               login = api_data['login'],
                               first_name = api_data['first_name'],
                               last_name = api_data['last_name'],
                               location = api_data['location'],
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

