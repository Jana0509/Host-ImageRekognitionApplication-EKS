import json
import boto3
import base64

def lambda_handler(event, context):
    # Initialize Rekognition client
    rekognition = boto3.client('rekognition')
    
    # Check if 'image' key exists in the event and if it's base64-encoded
    if 'image' not in event:
        return {
            'statusCode': 400,
            'body': json.dumps({'Error': 'No image provided in the event.'})
        }

    # Extract the base64 image string from the event
    base64_image = event['image']
    
    try:
        # Decode the base64 string into bytes
        image_bytes = base64.b64decode(base64_image)

        # Call Rekognition API to recognize celebrities
        celebrity_response = rekognition.recognize_celebrities(Image={'Bytes': image_bytes})

        # Call Rekognition API to detect faces and emotions
        face_response = rekognition.detect_faces(Image={'Bytes': image_bytes}, Attributes=['ALL'])

        # Prepare response for celebrities
        celebrities = []
        for celebrity in celebrity_response['CelebrityFaces']:
            name = celebrity['Name']
            label = celebrity['Id']
            celebrities.append({'Name': name, 'Label': label})

        # Prepare response for emotions
        emotions = []
        for face in face_response['FaceDetails']:
            face_emotions = []
            for emotion in face['Emotions']:
                face_emotions.append({'Type': emotion['Type'], 'Confidence': emotion['Confidence']})
            emotions.append({'Emotions': face_emotions})

        # Return the combined result as a JSON response
        return {
            'statusCode': 200,
            'body': json.dumps({
                'Celebrities': celebrities,
                'Emotions': emotions
            })
        }

    except Exception as e:
        # Handle errors and exceptions
        return {
            'statusCode': 500,
            'body': json.dumps({'Error': str(e)})
        }
