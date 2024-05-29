# build local dockerfile to record app
docker build -t record-app:latest .
# run docker container
docker run -d -p 8080:8080 record-app:latest