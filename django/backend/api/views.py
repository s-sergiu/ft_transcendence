from django.http import JsonResponse
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

def get_normal_user(data):
    print("in user" , file=sys.stderr)
    print(data, file=sys.stderr)
    user = User.objects.filter(email=data['email'] )
    print("inside user" , file=sys.stderr)
    print(user, file=sys.stderr)
    return user.get()

def get_or_create_normal_user(data):
    orgs = User.objects.filter(username = data['username']);
    if orgs is None:
        orgs = User.objects.create_user(data['username'],
                                        data['email'],
                                        data['password'],
                                        )
        orgs.save()
        return (1);
    return (2)

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

def register(request):
    data= json.loads(request.body.decode("utf-8"))
    status = get_or_create_normal_user(data)
    if status is 2:
        return (JsonResponse({'Message' : 'User already exists!'}))
    return (JsonResponse({'Message' : 'User registered!'}))

def login(request):
    data = json.loads(request.body.decode("utf-8"))
    user = authenticate(username=data['username'], password=data['password'])
    print("user auth", file=sys.stderr);
    print(user, file=sys.stderr);
    print("end user auth auth", file=sys.stderr);
    if user is None:
        print("user is none", file=sys.stderr);
        return (JsonResponse({'404' : 'ERROR'}))
    else:
        print("user exists", file=sys.stderr);
        print(user, file=sys.stderr);
    print("exising function exists", file=sys.stderr);
    return (JsonResponse(serialize_object(user), safe=False))

