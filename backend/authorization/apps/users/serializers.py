import jwt
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_jwt.serializers import RefreshJSONWebTokenSerializer

from apps.followed_cities.serializers import FollowedCitiesSerializer
from authorization.jwt_utils import jwt_decode_handler_for_refresh_token

User = get_user_model()


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    followed_cities = FollowedCitiesSerializer(many=True)

    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'followed_cities')


class CustomRefreshJSONWebTokenSerializer(RefreshJSONWebTokenSerializer):

    def _check_payload(self, token):
        # Check payload valid (based off of JSONWebTokenAuthentication,
        # may want to refactor)
        try:
            payload = jwt_decode_handler_for_refresh_token(token)
        except jwt.ExpiredSignature:
            msg = 'Signature has expired.'
            raise serializers.ValidationError(msg)
        except jwt.DecodeError:
            msg = 'Error decoding signature.'
            raise serializers.ValidationError(msg)

        return payload
