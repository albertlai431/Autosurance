import boto3
from PIL import Image
from flask import Flask, escape, request

# Create an S3 client
s3 = boto3.client('s3')
bucket_name = 'ht6'
app = Flask(__name__)

@app.route('/collision', methods=['POST'])
def collision():
    if request.method == "POST":
        file = request.files['file']
        img = Image.open(file)
        img.resize([224,224])
        s3.upload_fileobj(img,bucket_name,file)
        #s3.upload_file(filename, bucket_name, filename)

@app.route('/signup', methods=['POST'])
def signup():
    if request.method == "POST":
        file = request.files['file']
        s3.upload_file(file, bucket_name, file)