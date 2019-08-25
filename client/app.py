import boto3
from PIL import Image
from flask import Flask, escape, request
import json
import io

# Create an S3 client
s3 = boto3.client('s3')
bucket_name = 'ht6-1'
app = Flask(__name__)


@app.route('/collision', methods=['POST'])
def collision():
    print(request)
    file = request.get_json('file')
    print(file)
    s3.put_object(Body=json.dumps(file), Bucket=bucket_name, Key="json.json")
    return "Success"


@app.route('/image', methods=['POST'])
def image():
    img = request.get_json('file')
    print(img)
    filepath = "/home/seen/Pictures/" + img['filename']
    s3.upload_file(filepath, bucket_name, "jpg.jpg")
    return "Success"


"""
    resized_img = img.resize([224, 224])
    img = Image.open(file)  # file)
    resized_img.save("jpeg.jpeg")
    filename = "./ai.jpg"
    s3.upload_file(img, bucket_name, "jpg.jpg")
    s3.upload_file(filename, bucket_name, filename)
    img = Image.open(file)

    print(img)
    s3.put_object(Body=resized_img.tobytes(),
                  Bucket=bucket_name, Key="jpeg.jpeg")

    imgByteArr = io.BytesIO()
    resized_img.save(imgByteArr, format='JPEG')
    imgByteArr = imgByteArr.getvalue()
    s3.upload_fileobj(Body=imgByteArr, Bucket=bucket_name, Key="jpg.jpg")
    """
