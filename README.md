# alcalá
Permissioned Network Access Control

[![CircleCI](https://circleci.com/gh/uport-project/alcala.svg?style=svg)](https://circleci.com/gh/uport-project/alcala) [![codecov](https://codecov.io/gh/uport-project/alcala/branch/master/graph/badge.svg)](https://codecov.io/gh/uport-project/alcala)


_Alcalá is one of the five old royal gates that give access to the city of Madrid (Spain)_

![Alcalá](./alcala.jpeg)

## Build and Run Docker Image

First, to create the image and tag it `alcala:latest, execute the following command:

```bash
docker build . --tag alcala
```

Then, run a container named `alcala` with the generated image and `BACKEND_URL` `http://back.end/rpc`, available at host port `8080`:

```bash
docker run -p 8080:3000 -e BACKEND_RPC=http://back.end/rpc --name alcala alcala
```
