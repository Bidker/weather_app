# Create your views here.
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework_jwt.views import JSONWebTokenAPIView

from apps.users.serializers import CustomRefreshJSONWebTokenSerializer, CustomUserDetailsSerializer


class CustomRefreshJSONWebToken(JSONWebTokenAPIView):
    serializer_class = CustomRefreshJSONWebTokenSerializer


class UserViewSet(GenericViewSet):
    permission_classes = (IsAuthenticated,)

    @action(methods=['GET'], detail=False)
    def my_account(self, request):
        serializer = CustomUserDetailsSerializer(request.user)
        return Response(serializer.data)
