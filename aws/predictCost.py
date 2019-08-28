import os
import io
import boto3
import json
import csv

# grab environment variables
ENDPOINT_NAME = 'linear-learner-2019-08-25-00-33-25-422'
runtime= boto3.client('runtime.sagemaker')
s3 = boto3.client('s3')

def lambda_handler(event, context):
    
    print("Received event: " + json.dumps(event, indent=2))
    
    filepath = event['Body']
    # print("Received event: " + json.dumps(event, indent=2))
    data = s3.get_object(Bucket='ht6-1',Key='%s'%filepath)
    ev_data = data['Body'].read().decode()
    ev_data_json = json.loads(ev_data)

    country = ev_data_json['country'] if ev_data_json['country'] else '0' 
    coverage = ev_data_json['coverage'] if ev_data_json['coverage'] else '0' 
    education = ev_data_json['education'] if ev_data_json['education'] else '0' 
    employment = ev_data_json['employment'] if ev_data_json['employment'] else '0' 
    gender = ev_data_json['gender'] if ev_data_json['gender'] else '0' 
    income = ev_data_json['income'] if ev_data_json['income'] else '0' 
    location = ev_data_json['location'] if ev_data_json['location'] else '0' 
    marital = ev_data_json['marital'] if ev_data_json['marital'] else '0' 
    premium = ev_data_json['premium'] if ev_data_json['premium'] else '0' 
    inception = ev_data_json['inception'] if ev_data_json['inception'] else '0' 
    policyNum = ev_data_json['policyNum'] if ev_data_json['policyNum'] else '0' 
    policies = ev_data_json['policies'] if ev_data_json['policies'] else '0' 
    policy = ev_data_json['policy'] if ev_data_json['policy'] else '0' 
    claim = ev_data_json['claim'] if ev_data_json['claim'] else '0' 
    classes = ev_data_json['class'] if ev_data_json['class'] else '0' 
    size = ev_data_json['size'] if ev_data_json['size'] else '0' 
    severity = ev_data_json['severity'] if ev_data_json['severity'] else '0' 
    payload = country+","+coverage+","+education+","+employment+","+gender+","+income+","+location+","+marital+","+premium+","+inception+","+policyNum+","+policies+","+policy+","+claim+","+classes+","+size+","+severity
    print(payload)
    response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                      ContentType='text/csv',
                                      Body=payload)
    # print(response)
    # result = json.loads(response['Body'].read().decode())
    # print(result)
    # pred = int(result['predictions'][0]['predicted_label'])
    # predicted_label = 'M' if pred == 1 else 'B'
    content = response['Body'].read()
    data = json.loads(content)
    price = data['predictions'][0]['score']
    
    if int(price)<0:
        price=abs(price)*18.3
    if int(price)>0 and int(price)<800:
        price = price*13.8
    price=price*3.7
    return round(price,2)