from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Score

def register(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists")
            return redirect('register')
        user = User.objects.create_user(username=username, password=password)
        login(request, user)
        return redirect('home')
    return render(request, 'game/register.html')

def user_login(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Invalid credentials")
    return render(request, 'game/login.html')

def user_logout(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')
def home(request):
    if request.method == "POST":
        Score.objects.create(
            user=request.user,
            moves=request.POST['moves'],
            time_taken=request.POST['time']
        )
        return redirect('leaderboard')
    return render(request, 'game/index.html')

@login_required(login_url='login')
def leaderboard(request):
    scores = Score.objects.filter(user=request.user).order_by('moves', 'time_taken')
    return render(request, 'game/leaderboard.html', {'scores': scores})
