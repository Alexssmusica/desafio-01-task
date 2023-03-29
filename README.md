Mongo Docker exemplo

1 - start a mongo container
docker run --name mongodb -d -p 27017:27017 mongo mongod --replSet rs0

2 - After your mongodb container is up and running, enter mongosh
docker exec -it mongodb mongosh

3 - Inside mongosh, initiate replica set
rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})
