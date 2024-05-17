from django.http import JsonResponse
from django.views.decorators.csrf import get_token
from django.contrib.auth.models import User
from django.core import serializers
from .models import Token, ExtendedUser
import json, os, sys, requests

ID=os.environ.get('CLIENT_ID')
HOST_NAME=os.environ.get('HOST_NAME')
SECRET=os.environ.get('CLIENT_SECRET')
REACT_PORT=os.environ.get('REACT_PORT')
HTTP_METHOD=os.environ.get('HTTP_METHOD')
REDIRECT_URL= HTTP_METHOD + "://" + HOST_NAME + ':' + REACT_PORT

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
            'redirect_uri' : REDIRECT_URL
    }
    api_call = requests.post(url, params)
    data = api_call.json()
    if (list(data.keys())[0] == 'error'):
        return (JsonResponse(data))
    t = Token.get_or_create(data);
    return (JsonResponse(serialize_object(t), safe=False))

def get_or_create_user(api_data, token):
    try:
        orgs = User.objects.filter(email=api_data['email'])
    except:
        orgs = None;

    t = Token.objects.get(access_token=token['code'])
    if not orgs:
        orgs = User.objects.create_user(api_data['first_name'],
                                        api_data['email']
                                            )
        orgs.save()
        extended = ExtendedUser.get_or_create(api_data, orgs, t)
        return extended
    extended = ExtendedUser.get_or_create(api_data, orgs.get(), t)
    return extended

def getUserInfo(request):
    token = json.loads(request.body.decode("utf-8"))
    url = 'https://api.intra.42.fr/v2/me'
    headers = {'authorization': f'Bearer {token['code']}'}
    api_call = requests.get(url, headers = headers)
    data = api_call.json()
    if (list(data.keys())[0] == 'error'):
        return (JsonResponse(data))
    users = get_or_create_user(data,token);
    return (JsonResponse(serialize_object(users), safe=False))

def populateDB(request):
    data = json.loads(request.body.decode("utf-8"))
    ExtendedUser.create_users(data);
    return None

def requestFromDB(request):
    choice = json.loads(request.body.decode("utf-8"))
    ext = ExtendedUser.objects.get(id = choice['choice'])
    return (JsonResponse(serialize_object(ext), safe=False))

