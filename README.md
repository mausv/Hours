# [Hours](http://hours.mausv.com/)
Calculate billable and non-billable hours.

![image](https://user-images.githubusercontent.com/10158269/130177795-9d962297-7d08-46df-9492-2ae2a6a28ac1.png)

# Backend
Python 3.9.2 API with Flask to handle the conversions and addition of the hours.

Run `FLASK_APP=api.py FLASK_ENV=development python3 -m flask run --host=0.0.0.0`.

# Frontend
React 17.0.2 to call the Backend interactively.

Run `yarn start`.

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
