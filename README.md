Instalamos el geth a partir de https://geth.ethereum.org/docs/install-and-build/installing-geth
2. Creamos una carpeta en el directorio curso llamada proyecto-Ethereum
3. Creamos dentro de la carpeta las carpetas con los nodos que queramos, llamándolos nodeX, donde x es 1,2,3,4,…
4. geth --datadir nodex account new –password pwd.txt
5. Generamos con puppeth el fichero genesis.json
6. Creación del hub donde los nodos van a encontrar los demás bootnode --genkey=boot.key
1. Ejecución bootnode --verbosity=9 --nodekey=boot.key
7. Para cada node geth --datadir nodex init genesis.json
8. Para cada nodo lanzamos
geth 
--datadir ${DIR_NODE} directorio del nodo
--networkid ${NETWORK_CHAINID}
--syncmode full 
--http -–graphql --http.port ${HTTP_PORT} --http.api admin,eth,miner,net,txpool,personal,web3     apis disponibles y en que puerto va a escuchar
--allow-insecure-unlock como hemos activado el http hay que permitir el unlock en la cuenta
--unlock "0x${CUENTA}" la cuenta hay que hacerle el unlock para poder firmar
--password ${DIR_NODE}/pwd con esta contraseña firma
--port ${PORT} el puerto en el que va a escuchar el nodo
--ipcpath cuando creamos el nodo1 hay que incluir un nuevo path en cada uno de los otros para que no nos de error de acceso denegado porque ya el path \\.\pipe\geth.ipc ya está usado por el nodo1
--authrpc.port 1234 es necesario también para la autenticación de mas de un nodo, que no nos de problemas por usar el mismo puerto otra vez 

geth --datadir nodo1 --syncmode full --http --http.port 8545 --http.api admin,eth,miner,net,txpool,personal,web3 --allow-insecure-unlock --unlock "0xdab4d7dd3cd2d02a2791faf976fc85546262a2be" --password pwd.txt --port 30001

geth --datadir nodo2 --syncmode full --http --http.port 8546 --http.api admin,eth,miner,net,txpool,personal,web3 --allow-insecure-unlock --unlock "0xbd0e4271d42e09cb96cac116b4d363382b9fd90b" --password pwd.txt --port 30002 --ipcpath \\.\pipe\geth2.ipc --authrpc.port 8552

geth --datadir nodo3 --syncmode full --http --http.port 8547 --http.api admin,eth,miner,net,txpool,personal,web3 --allow-insecure-unlock --unlock "0xa0a7550f19ed89d67bd65798e1db11001b8fb352" --password pwd.txt --port 30003 --ipcpath \\.\pipe\geth3.ipc --authrpc.port 8553


Para comprobar que funciona correctamente agrego una cuenta en el metamask y me conecto a cualquiera de los nodos poniendo el puerto de este 8545 o 8546 o 8547 en eset ejemplo, y pongo el identificador de cadena que tenemos en el nodo, 333444 en este caso.

Para conectarnos a estos nodos via la consola, solo tenemos que poner geth attach y la url del nodo, ponemos el comando:
geth attach http://localhost:8547
si vemos lo que pone modules: son todos los modulos a los que podemos accceder y usar, admin, eth , etc
Y como nolo hemos configurado para que se pueda minar ponemos el siguiente comando:
miner.start(2)

admin.nodeInfo para ver la infromacion del nodo.
eth.blockNumber te da el numero de bloque

El aprendizaje que sacamos de esto es que hay que automatizar la creación de redes, porque de esta forma manual podemos cometer muchos errores.

Como agregar un nuevo nodo

Creamos el account:
geth --datadir nodo4 account new --password pwd.txt

Inicializamos el nodo con el fichero genesis curso.json que ya tenemos
geth --datadir nodo4 init curso.json

Lanzamos el nodo.
geth --datadir nodo4 --syncmode full --http --http.port 8548 --http.api admin,eth,miner,net,txpool,personal,web3 --allow-insecure-unlock --unlock "0xc439a124ad87f8194276079972103e1418098d6f" --password pwd.txt --port 30004 --ipcpath \\.\pipe\geth4.ipc --authrpc.port 8554

Para usar el graphql simplemente añadimos a todos estos comando --graphql
Usemos de ejemplo el nodo 2.
Lo paramos y lanzamos una vez mas pero ahora con graphql
geth --datadir nodo2 --syncmode full --http --http.port 8546 --http.api admin,eth,miner,net,txpool,personal,web3 --allow-insecure-unlock --unlock "0xbd0e4271d42e09cb96cac116b4d363382b9fd90b" --password pwd.txt --port 30002 --ipcpath \\.\pipe\geth2.ipc --authrpc.port 8552 --graphql

Podemos ir en el navegador a http://localhost:8546/graphql/ui
Con esto accedemos a una interfaz de graphql que nos permite hacer querys para interactuar con los bloques