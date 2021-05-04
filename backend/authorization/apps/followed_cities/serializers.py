from rest_framework import serializers

from apps.followed_cities.models import City


class FollowedCitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('pk', 'name')
        read_only_fields = ('pk',)

    def validate_name(self, name):
        user = self.context['request'].user

        if user.followed_cities.filter(name=name).exists():
            raise serializers.ValidationError('user cann\'t following one city two times')

        return name

    def create(self, validated_data):
        return City.objects.get_or_create(**validated_data)[0]
