# [Hours](http://hours.mausv.com/)
Calculate billable and non-billable hours.

![image](https://user-images.githubusercontent.com/10158269/130005875-d8257a61-1c6b-4cce-b213-9f8748ff4353.png)

# Backend
Python 3.9.2 API with Flask to handle the conversions and summing of the hours.

# Frontend
React 17.0.2 to call the Backend interactively.

# Deployment
## Build Docker images
### Build projects
Run `yarn build` in the Frontend project.
### Build images
Run `docker build -t mausv/hours_frontend .` or `docker build -t mausv/hours_backend .` on the `Frontend` or `Backend` folder to use the `Dockerfile` to build the image.
Run `docker push <image_tag_name>`.

## Manual Docker run
Run `docker run -p 80:80 -d --name hoursfrontend mausv/hours_frontend` and `docker run -p 5000:5000 -d --name hoursbackend mausv/hours_backend` to run the containers manually.

## Docker Compose
Run `docker-compose up` in the project's root folder to get two containers up with the Front and Backend services up and running, exposing the ports 80 and 5000, respectively.

## Kubernetes
Run `kubectl apply -f Hours.yml` to run the kubernetes setup automatically and start the cluster with both services exposed.
