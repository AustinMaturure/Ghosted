from rest_framework import serializers
from ghosted.models import *

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ['image']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']


class ColourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colour
        fields = ['name']


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['size']
  

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category = CategorySerializer()
    size = SizeSerializer(many=True, read_only=True)
    colour = ColourSerializer(many=True, read_only=True)
    upload_images = serializers.ListField(
        child=serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True
    )

    class Meta:
        model = Product
        fields = ['id', 'name', 'description','materials','discount','size','slug', 'price','category', 'colour', 'images', 'upload_images']
        lookup_field = 'slug'

    def to_representation(self, instance):
        # Override the to_representation method to return size as a list of strings
        representation = super().to_representation(instance)
        representation['size'] = [size['size'] for size in representation['size']]
        representation['colour'] = [name['name'] for name in representation['colour']]
        representation['images'] = [name['image'] for name in representation['images']]
        return representation

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images')
        product = Product.objects.create(**validated_data)
        for image in uploaded_images:
            new_product_image = ProductImages.objects.create(product=product, image=image)

        return product

