from django.http import JsonResponse
from django.utils.crypto import get_random_string
from django.views.decorators.csrf import get_token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.core import serializers
from django.db.models import Q
from .models import Token, ExtendedUser, MatchData
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
        return (JsonResponse({'Message':'User already exists!'}))
    return (JsonResponse(serialize_object(users), safe=False))

def register(request):
    data= json.loads(request.body.decode("utf-8"))
    username_length = len(data['username'])
    password_length = len(data['password'])
    if username_length < 5:
        return (JsonResponse({'Message' : 'Error', 'Error' : 'Username is too short!'}))
    if password_length < 8:
        return (JsonResponse({'Message' : 'Error', 'Error' : 'Password is too short!'}))
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

def getMatchLoss(request):
    data = json.loads(request.body.decode("utf-8"))
    loss = MatchData.get_loss(data['code']).count();
    return (JsonResponse({'result' : loss}))

def getMatchWins(request):
    data = json.loads(request.body.decode("utf-8"))
    wins = MatchData.get_wins(data['code']).count();
    return (JsonResponse({'result' : wins}))

def removeFriend(request):
    data = json.loads(request.body.decode("utf-8"))
    user = ExtendedUser.objects.get(login = data['login'])
    friend = User.objects.get(pk = data['friend'])
    user.friends.remove(friend);
    return (JsonResponse({'Message' : 'removeFriend'}))

def addFriend(request):
    data = json.loads(request.body.decode("utf-8"))
    user = ExtendedUser.objects.get(login = data['login'])
    friend = User.objects.get(pk = data['friend'])
    user.friends.add(friend);
    return (JsonResponse({'Message' : 'addFriend'}))

def getFriendList(request):
    data = json.loads(request.body.decode("utf-8"))
    friend_list = ExtendedUser.objects.get(login = data['login']['login'])
    test = friend_list.friends.all();
    ser = serializers.serialize('json', test)
    return (JsonResponse(ser, safe=False))
    return (JsonResponse({'Message' : 'Userlist'}))

def getUserList(request):
    data = json.loads(request.body.decode("utf-8"))
    userlist = User.objects.all().exclude(Q(username = data['login']['login']) | Q(username = 'admin') )
    ser = serializers.serialize('json', userlist)
    return (JsonResponse(ser, safe=False))
    return (JsonResponse({'Message' : 'Userlist'}))

def getMatchData(request):
    data = json.loads(request.body.decode("utf-8"))
    match = MatchData.get_entry(data['code']);
    ser = serializers.serialize('json', match.all())
    return (JsonResponse(ser, safe=False))

def getPhoto(request):
    name = request.body.decode('utf-8');
    ext = ExtendedUser.objects.filter(login = name).get()
    image = str(ext.image);
    return (JsonResponse({'Message' : image}))

def sendPhoto(request):
    file = request.FILES.get('image')
    user = request.POST.get('username')
    if file is not None:
        ext = ExtendedUser.objects.filter(login = str(user)).get()
        ext.image.save(str(file), file.file);
        return (JsonResponse({'Message' : str(file) }))
    return (JsonResponse({'Message' : 'fileChange Failed!'}))

def changeMatchData(request):
    data = json.loads(request.body.decode("utf-8"))
    MatchData.add_entry(data['matchData']);
    return (JsonResponse({'Message' : 'changeInfo'}))

def changeInfo(request):
    data = json.loads(request.body.decode("utf-8"))
    ext = ExtendedUser.objects.filter(email = data['email']['email'])
    ext.update(location = data['info']['location'])
    ext.update(first_name = data['info']['first_name'])
    ext.update(last_name = data['info']['last_name'])
    return (JsonResponse({'Message' : 'changeInfo'}))
