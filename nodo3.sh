docker run -d \
    --name nodo3 \
    --network nodos \
    -p 10001:8545 \
    -v "$(pwd):/data" \
    hyperledger/besu:latest \
    --config-file=/data/config.toml \
    --data-path=/data/nodo3/data \
    --node-private-key-file=/data/nodo3/key \
    --genesis-file=/data/genesis.json