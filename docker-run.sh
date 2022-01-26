#!/bin/sh
docker kill nest-moim-container
docker rm nest-moim-container
docker run --name nest-moim-container -v $PWD:/app -p 3001:3001 -d nest-moim