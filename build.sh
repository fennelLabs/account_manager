#!/bin/bash
docker build -t fennel-demo .
docker run -dt -p 3000:3000 --name demo fennel-demo:latest
docker exec demo serve -s /app/build/