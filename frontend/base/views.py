from django.shortcuts import render

# Create your views here.
def inicio(request):
    return render(request, 'inicio.html')

def about(request):
    return render(request, 'about.html')

def inicioSesion(request):
    return render(request, 'login.html')

def registro(request):
    return render(request, 'registro.html')