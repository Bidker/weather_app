import jwt

from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.utils import jwt_get_secret_key


def jwt_decode_handler_for_refresh_token(token):
    '''
    This code is from here:
    https://github.com/jpadilla/django-rest-framework-jwt/blob/master/rest_framework_jwt/utils.py#L99
    but i override `leeway` parameter in jwt.decode()
    '''
    options = {
        'verify_exp': api_settings.JWT_VERIFY_EXPIRATION,
    }
    # get user from token, BEFORE verification, to get user secret key
    unverified_payload = jwt.decode(token, None, False)
    secret_key = jwt_get_secret_key(unverified_payload)
    return jwt.decode(
        token,
        api_settings.JWT_PUBLIC_KEY or secret_key,
        api_settings.JWT_VERIFY,
        options=options,
        leeway=api_settings.JWT_REFRESH_EXPIRATION_DELTA,
        audience=api_settings.JWT_AUDIENCE,
        issuer=api_settings.JWT_ISSUER,
        algorithms=[api_settings.JWT_ALGORITHM]
    )
