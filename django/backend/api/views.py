from django.http import JsonResponse
from django.views.decorators.csrf import get_token, requires_csrf_token
from django.contrib.auth.models import User
from django.core import serializers
from .models import Token, ExtendedUser
import json, os, sys, requests

ID=os.environ.get('CLIENT_ID')
HOST_IP=os.environ.get('HOST_IP')
SECRET=os.environ.get('CLIENT_SECRET')

def index(request):
    csrf = get_token(request);
    return JsonResponse( { "token" : csrf })

def serialize_object(obj):
    serialized = serializers.serialize('json', [obj, ])
    data = json.loads(serialized)
    return data

def getToken(request):
    code = json.loads(request.body.decode("utf-8"))
    url = 'https://api.intra.42.fr/oauth/token'
    params = {
            'grant_type': 'authorization_code',
            'client_id' : ID,
            'client_secret' : SECRET,
            'code' : code['code'],
            'redirect_uri' : 'http://' + HOST_IP + ':3000'
    }
    api_call = requests.post(url, params)
    data = api_call.json()
    if (list(data.keys())[0] == 'error'):
        return (JsonResponse(data))
    t = Token.create_token(data);
    return (JsonResponse(serialize_object(t), safe=False))

def get_or_create_user(api_data, token):
    orgs = User.objects.filter(email=api_data['email'])
    if not orgs:
        orgs = User.objects.create_user(api_data['first_name'],
                                        api_data['email']
                                            )
        orgs.save()
        t = Token.objects.get(access_token=token['code'])
        extended = ExtendedUser.get_or_create(api_data['email'], orgs, t)
        return orgs
    return orgs.get()

def getUserInfo(request):
    token = json.loads(request.body.decode("utf-8"))
    url = 'https://api.intra.42.fr/v2/me'
    headers = {'authorization': f'Bearer {token['code']}'}
    api_call = requests.get(url, headers = headers)
    data = api_call.json()
    if (list(data.keys())[0] == 'error'):
        return (JsonResponse(api_call))
    users = get_or_create_user(data,token);
    return (JsonResponse(serialize_object(users), safe=False))
