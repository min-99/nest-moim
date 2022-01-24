#!/bin/sh
docker rm nest-moim-container
docker run --name nest-moim-container -p 3001:3001 -d nest-moim