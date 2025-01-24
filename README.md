# Host-ImageRekognition-EKS
Creating and Deploying Image Rekognition App in Amazon Elastic Kubernetes Service

## Introduction:
This project demonstrates Rekognize the Celebrity and displays the emotions of the person based on Users Input Image using Aamazon Rekognition Service. Users
upload the image from the frontend application which is containerized and running in Elastic Kubernetes cluster in multiple availability zones for High Availability and faqult tolerant. Frontend will call the backend service which is running in Lambda which inturns calls the rekognition API to get the response.
Application load balancers are fronted to the ECS worker nodes for the effiecient traffic distribution and avoid the nodes getting overwhelmed. Complete solution is running in Virtual private cloud for High Security.

## Architecture:

![Image Rekognition](https://github.com/user-attachments/assets/1a7bcd29-c854-4951-82a7-6dec65e747ca)
