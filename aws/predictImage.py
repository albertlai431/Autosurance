import os
import io
import boto3
import json
import csv
import base64
from boto3 import client

# grab environment variables
ENDPOINT_NAME = 'IC-image-data-1566724744'
runtime= boto3.client('runtime.sagemaker')

def lambda_handler(event, context):
    filepath = event['Body']
    # print("Received event: " + json.dumps(event, indent=2))
    s3 = boto3.client('s3')

    # bucket = s3.Bucket(u'ht6-1') 
    # obj = bucket.Object(key='user_image/%s'%filepath)  
    # response = obj.get()
    # img = response[u'Body'].read() 
    img = s3.get_object(Bucket='ht6-1',Key=filepath)
    payload = img['Body'].read()
    # print(type(payload))
    
    response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                      ContentType='application/x-image',
                                      Body=payload)
    
    value = response['Body'].read()
    if value[0]>value[1]:
        return 'Accident'
    else:
        return 'No Accident'
    