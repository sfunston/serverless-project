# README #

### Serverless Project ###

For this project, a backend infrastructure was created in AWS for a web application. The PowerPoint shows the major components and how they interact with each other.

## Uploading ##
1. A user uploads a video file to an Simple Storage Service (S3) bucket 
2. Lambda function is triggered and submits a job to the Elastic Transcoder
3. Elastic Transcoder converts video into another format
4. Video file is stored in a separate S3 bucket

## Retrieving ##
1. Request is sent to API Gateway
2. Gateway handles request, Lambda function is invoked
3. Lambda function retrieves list of transcoded videos
4. Response is sent back to client through Gateway




