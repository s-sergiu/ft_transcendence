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

def getToken(request):
    #print("request body: ", request.body.decode("utf-8"), file=sys.stderr);
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
    #print("token before create : ",data['access_token'], file=sys.stderr);
    t = Token.create_token(data);
    #print("token after create : ",t.access_token, file=sys.stderr);
#    else if (check inside database)
#        return user from db
#    create user in db, add token to the user
    token_serialize = serializers.serialize('json', [t, ])
    t_data = json.loads(token_serialize)
    return (JsonResponse(t_data, safe=False))
    return (JsonResponse(data))
    return (getInfo(t.access_token))

def getUserInfo(request):
    token = json.loads(request.body.decode("utf-8"))
    #print("token getInfo: ",token, file=sys.stderr);
    if 'Cookie' in request.headers.keys():
        print("request body: ", request.headers.keys(), file=sys.stderr);
    url = 'https://api.intra.42.fr/v2/me'
    headers = {'authorization': f'Bearer {token['code']}'}
    api_call = requests.get(url, headers = headers).json()
    if (list(api_call.keys())[0] == 'error'):
        return (JsonResponse(api_call))
    #print("token api_call[email]: ",User.objects.get(), file=sys.stderr);
    if User.objects.filter(email=api_call['email']):
        users = User.objects.filter(email=api_call['email']).get()
        t = Token.objects.get(access_token=token['code'])
    else:
        users = None;
    if not users:
        #print("ERROR", file=sys.stderr);
        users = User.objects.create_user(api_call['first_name'],
                                        api_call['email']
                                        )
        users.save()
        t = Token.objects.get(access_token=token['code'])
        extended = ExtendedUser(email = api_call['email'], user = users, token = t)
        extended.save()
    else:
        print("EMAIL call getInfo: ", users.email, file=sys.stderr);
    users_serialized = serializers.serialize('json', [users, ])
    data = json.loads(users_serialized)
    return (JsonResponse(data, safe=False))


def getInfo(token):
    #print("token getInfo: " + token, file=sys.stderr);
    url = 'https://api.intra.42.fr/v2/me'
    headers = {'authorization': f'Bearer {token}'}
    api_call = requests.get(url, headers = headers).json()
    #print("api call getInfo: ", token, file=sys.stderr);
    #print("email getInfo: ", api_call['email'], file=sys.stderr);
    users = User.objects.get(email=api_call['email'])
    if not users:
        #print("ERROR", file=sys.stderr);
        users = User.objects.create_user(api_call['first_name'],
                                        api_call['email']
                                        )
        users.save()
    else:
        print("EMAIL call getInfo: ", users.email, file=sys.stderr);
    users_serialized = serializers.serialize('json', [users, ])
    data = json.loads(users_serialized)
    return (JsonResponse([token , data], safe=False))
