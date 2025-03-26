docker run -d \
    --name nodo2 \
    --network nodos \
    -p 10000:8545 \
    -v "$(pwd):/data" \
    hyperledger/besu:latest \
    --config-file=/data/config.toml \
    --data-path=/data/nodo2/data \
    --node-private-key-file=/data/nodo2/key \
    --genesis-file=/data/genesis.json