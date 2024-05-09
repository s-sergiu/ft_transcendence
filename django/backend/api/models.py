from django.db import models

# Create your models here.
class Token(models.Model):
    access_token = models.CharField(max_length = 64)
    token_type = models.CharField(max_length = 6)
    expires_in = models.IntegerField(null = True)
    refresh_token = models.CharField(max_length = 64)
    scope = models.CharField(max_length = 6)
    created_at = models.IntegerField(null = True)
    secret_valid_until = models.IntegerField(null = True)
    def create_token(data):
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
        return None
