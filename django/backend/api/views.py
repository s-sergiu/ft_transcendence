from django.http import JsonResponse
from django.utils.crypto import get_random_string
from django.views.decorators.csrf import get_token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
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

def get_or_create_normal_user(data):
    try:
        orgs = User.objects.get(email=data['email'])
    except:
        orgs = None;
    if orgs is not None:
        return (3)
    try:
        orgs = User.objects.get(username=data['username'])
    except:
        orgs = None;
    if orgs is not None:
        return (2)
    if orgs is None:
        orgs = User.objects.create_user(data['username'],
                                        data['email'],
                                        data['password'],
                                        )
        orgs.save()
        ExtendedUser.create_user(data, orgs);
    return (1)

def get_or_create_user(api_data, token):
    unique_id = get_random_string(length=32)
    try:
        orgs = User.objects.filter(email=api_data['email'])
    except:
        orgs = None;

    t = Token.objects.get(access_token=token['code'])
    if not orgs:
        orgs = User.objects.create_user(api_data['login'],
                                        api_data['email'],
                                        unique_id
                                            )
        orgs.save()
        extended = ExtendedUser.get_or_create(api_data, orgs, t)
        return extended
    extended = ExtendedUser.get_or_create(api_data, orgs.get(), t)
    return extended

def getUserInfo(request):
    token = json.loads(request.body.decode("utf-8"))
    if token['code'] is None:
        return (JsonResponse({'Message': 'Token is empty!'}))
    url = 'https://api.intra.42.fr/v2/me'
    headers = {'authorization': f'Bearer {token['code']}'}
    api_call = requests.get(url, headers = headers)
    data = api_call.json()
    if (list(data.keys())[0] == 'error'):
        return (JsonResponse(data))
    users = get_or_create_user(data,token);
    if users is None:
        return (JsonResponse({'Message':'user already exists!'}))
    return (JsonResponse(serialize_object(users), safe=False))

def register(request):
    data= json.loads(request.body.decode("utf-8"))
    status = get_or_create_normal_user(data)
    if status == 3:
        return (JsonResponse({'Message' : status}))
    if status == 2:
        return (JsonResponse({'Message' : status}))
    return (JsonResponse({'Message' : 'User registered!'}))

def login(request):
    data = json.loads(request.body.decode("utf-8"))
    user = authenticate(username=data['username'], password=data['password'])
    if user is None:
        return (JsonResponse({'Message' : 'error'}))
    ext = ExtendedUser.objects.get(login = data['username'])
    return (JsonResponse(serialize_object(ext), safe=False))

