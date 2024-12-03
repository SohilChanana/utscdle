## Link to Our Application

https://utscdle.org/

## Deploy to VM

Build UTSCdle:

```docker build -t utscdle:latest -f Dockerfile .```

Save the Docker image to your local machine (replace PATH):

```docker save -o [PATH]/utscdle.tar.gz utscdle:latest```

Transfer image to the host machine using scp:

```scp [PATH]/utscdle.tar.gz joshuayu@34.130.208.104:~```

SSH into the VM:

```ssh 34.130.208.104```

On the VM, load the new image into Docker:

```docker load -i utscdle.tar.gz```

Start the container:

```docker compose up -d```