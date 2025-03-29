### Instalamos la base de datos pg con docker
docker run --name curso-pg-14 -e POSTGRES_PASSWORD=my-secret-pw –p 5433:5432 -d postgres:13

## Configuramos la conexión en dbeaver

## Cargamos la base de datos northwind
https://github.com/Jviejo/curso-dbs-14/tree/master/northwind


### Iniciamos el nodo eth
Para ello creamos el fichero genesis.json y luego levantamos el contendor en docker

docker run -d -v ${PWD}/data:/data -v ${PWD}/genesis.json:/genesis.json --name eth-node ethereum/client-go:v1.10.20 init --datadir data /genesis.json

Se ejecuta la imagen para inicializar el directorio con la base de datos de Ethereum
Se mapea ${PWD}/data al directorio data del container
Se mapea el fichero genesis.json al /genesis.json
Visitar el directorio ${PWD}/data para ver el contenido. Ahí está la base de
datos leveldb que soporta el blockchain

## Luego ejecutamos y lanzamos el nodo
docker run -d -p 8545:8545 -p 30303:30303 -v ${PWD}/data:/data --name eth-node-01 ethereum/client-go:v1.10.20 --datadir /data --http.api personal,eth,net,web3 --http --http.addr 0.0.0.0 --http.port 8545 --http.corsdomain '*' --mine --miner.etherbase 0x467221fb66EC2a4A5947B51325B8d06EF3f8363e --miner.threads 1

Publica los puertos 8545 y 30303
Mapea el directorio local ${PWD}/data al directorio data del container
El nombre del contenedor es eth-node-01
La imagen es ethereum/client-go
El api esta activa en cualquier ip (0.0.0.0) en el 8545
Cualquier dominio puede acceder http.corsdomain ‘*’
La dirección de minería es 0xff… y se dedica un thread