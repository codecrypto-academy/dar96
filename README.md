Crear la red
docker network create nodos

crear la private key y el address
besu --data-path=nodo1 public-key export-address --to=nodo1/address

En el fichero genesis.json he puesto en el alloc mi cuenta del metamask y en el extradata el address del nodo 1 sin el 0x de delante, dejando delante los 40 ceros y los 130 de detrás

Creamos el nodo:
docker run -d \
    --name nodo1 \
    --network nodos \
    -p 9999:8545 \
    -v "$(pwd):/data" \
    hyperledger/besu:latest \
    --config-file=/data/config.toml \
    --data-path=/data/nodo1/data \
    --node-private-key-file=/data/nodo1/key \
    --genesis-file=/data/genesis.json


    En los logs del contenedor encontramos el enode, que no es mas que la public key@ip:30303, usando el portainer podemos ver estos datos facilmente, y lo incluimos en el config.toml

    Para checkear que todo va bien podemos hacer un curl para ver por qué bloque va la red:
    curl -X POST --data '{"jsonrpc": "2.0", "method":"eth_blockNumber", "params":[],"id":1}' -H 'Content-type: application/json' http://localhost:9999
