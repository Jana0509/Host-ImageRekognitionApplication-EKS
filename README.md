# Host-ImageRekognition-EKS
Creating and Deploying Image Rekognition App in Amazon Elastic Kubernetes Service


--------------------------------------------------------------

## Introduction:
This project demonstrates Rekognize the Celebrity and displays the emotions of the person based on Users Input Image using Aamazon Rekognition Service. Users
upload the image from the frontend application which is containerized and running in Elastic Kubernetes cluster in multiple availability zones for High Availability and faqult tolerant. Frontend will call the backend service which is running in Lambda which inturns calls the rekognition API to get the response.
Application load balancers are fronted to the ECS worker nodes for the effiecient traffic distribution and avoid the nodes getting overwhelmed. Complete solution is running in Virtual private cloud for High Security.


--------------------------------------------------------------
## Architecture:

![Image Rekognition](https://github.com/user-attachments/assets/1a7bcd29-c854-4951-82a7-6dec65e747ca)


--------------------------------------------------------------
## Project Highlights:

1. Version Control : used GIT and Github for Versioning and storing the frontend codebase.

2. Containerization: Containerized the static application using Docker to ensure consistent runtime environments.

3. Docker: Used Docker to create the Container Image for the static Application

4. EKS Cluster : Deployed the EKS Cluster for Running the containers in High Availbility and fault tolerant Environment.

5. Kubernetes Tools : Managed Kubernetes clusters using kubectl, eksctl for streamlined cluster operations.

6. Elastic Container Registry (ECR) : Set up Amazon ECR to store Docker images for streamlined deployment to EKS.

7. Route 53 : Created the Domain and Hosted Zone for the application. Configured Alias to the Application Load balancer for DNS names

8. Load Balancer: Deployed a Network Load Balancer (NLB) in public subnets to distribute traffic across clusters in multiple AZs.

9. VPC Setup : Designed a custom VPC from scratch

10. Nodes : Created the Multiple EC2 instances called as node groups for the pods to run.

11. Pods : Created the pod using EKS for the application to run.

--------------------------------------------------------------

## Understanding the EKS Cluster:
• Control Plane: Managed by AWS, including components such as the API server, scheduler, controller manager, and etcd.

• Worker Nodes: Containerized application is running in worker nodes which is group of EC2 instances and tied to Auto Scaling groups, ensuring efficient handling of varying loads.

• Networking: Configured secure communication between the control plane and worker nodes.

• Monitoring and Logging: Integrated CloudWatch for real-time performance and health tracking.

-----------------------------------------------------------------
## Key Learning Outcomes: 
1. Created the Frontend application made up of HTML,CSS and JS and containerized the application using docker platform
2. Designed and implemented a VPC from scratch.
3. Pushed the Docker containers to the Amazon Elastic Container Registry which makes deployment easily to fetch the image from ECR.
4. Created and configured EKS clusters and worker nodes for high availability.
5. Created and configured the EKS Cluster, Nodegroups and Service using CLI.
6. Deployed TLS/SSL certificates for secure communication via ACM.
7. Distributed traffic effectively with NLB and alias routing using Route 53.

--------------------------------------------------------------------

## Conclusion:
This Image rekognition Application using AWS GenAI services such as Rekognition helps to identity the celebrity and their emotion.  From infrastructure design to deployment, this project showcases how scalable cloud architecture can power AI-driven applications.
