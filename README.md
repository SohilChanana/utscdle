## Link to Our Application

https://34.130.208.104/

## Deploy to VM

Build the reverse proxy:

```docker build -t nginx:latest -f nginx/Dockerfile nginx```

Build UTSCdle:

```docker build -t utscdle:latest -f Dockerfile .```

Save the Docker images to your local machine (replace PATH):

```docker save -o [PATH]/nginx.tar.gz nginx:latest```

```docker save -o [PATH]/utscdle.tar.gz utscdle:latest```

Transfer images and compose.yaml to the host machine using scp:

```scp [PATH]/nginx.tar.gz joshuayu@34.130.208.104:~```

```scp [PATH]/utscdle.tar.gz joshuayu@34.130.208.104:~```

```scp compose.yaml joshuayu@34.130.208.104:~```

SSH into the VM:

```ssh 34.130.208.104```

On the VM, load the two images into Docker:

```docker load -i nginx.tar.gz```

```docker load -i utscdle.tar.gz```

Start the container:

```docker compose up -d```