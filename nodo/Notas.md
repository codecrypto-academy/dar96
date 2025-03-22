Creamos el contenedor, con la imagen de geth y creamos una nueva cuenta
docker run -v ${PWD}/datos:/data -v ${PWD}/pwd.txt:/p.txt ethereum/client-go:v1.13.15  account new --datadir /data --password /p.txt

Hemos mapeado el directorio en local datos y pwd.txt al directorio en el contenedor data y p.txt respectivamente luego creamos una nueva cuenta que guardamso en el contenedor en data y usamos la contraseña dentro del contenedor en p.txt

Hemos utilizado la version 1.13 para que sea compatible con clique, el cual vemos en el fichero genesis
Aquí tenemos dos aspectos importantes: por un lado, el cliente que ejecuta Ethereum y, por otro, el protocolo de consenso. En este caso, el cliente es GETH y el protocolo es Proof of Authority (PoA).

GETH es la implementación de Ethereum escrita en Go y, además, es la más antigua que existe actualmente. Sin embargo, dado que su enfoque está dirigido principalmente hacia la red pública y no las redes privadas, en la versión v1.14 fue deprecada la funcionalidad de consenso PoA (como Clique) porque no querían seguir manteniéndola en su código fuente al no tener soporte oficial.

El cliente por defecto para redes privadas es BESU.

En redes privadas basadas en EVM (Ethereum Virtual Machine), el protocolo de consenso más comúnmente utilizado es Proof of Authority (PoA).

Existen varias implementaciones de PoA:
Clique: Este protocolo no se recomienda para entornos de producción, ya que su uso está enfocado a entornos de desarrollo.
IBFT 2.0: Este protocolo PoA es compatible con redes privadas existentes, aunque no es la opción recomendada para aplicaciones empresariales.
QBFT: Este es el protocolo PoA recomendado para redes privadas de nivel empresarial.

Aunque GETH deprecó Clique en la versión v1.14, sigue siendo una opción legítima para configurar y operar una red privada, utilizando la versión 1.13.15. Es importante recordar que el protocolo de consenso define cómo se valida cada bloque, pero el resto de la arquitectura de Ethereum permanece igual. 


Debemos añadir un fichero genesis para iniciar el nodo de ethereum
{
  "config": {
    "chainId": 15,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "berlinBlock": 0,
    "clique": {
        //Cada 5 seg se crea un bloque
      "period": 5,
      "epoch": 30000
    }
  },
  "difficulty": "1",
  "gasLimit": "8000000",
  "extradata": 
  //caqmbiamos la cuenta en el extrdata por la que hemos creado y tenemos dentro de la carpeta keystore, ya que es la va a firmar el nodo
  "0x00000000000000000000000000000000000000000000000000000000000000007df9a875a174b3bc565e6424a0050ebc1b2d1d820000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  //Aqui podemos añadir la cantidad de cuentas que queramos asi como que balance le queremos dar
  "alloc": {
    "7df9a875a174b3bc565e6424a0050ebc1b2d1d82": { "balance": "300000" },
    "f41c74c9ae680c1aa78f42e5647a62f353b7bdde": { "balance": "400000" }
  }
}
Iniciar el nodo con el genesis.json Importante que el chainId no exista en una mainnet, con utilizar algo como 7788 vale. En este caso hemos usado 15.

docker run -v ${PWD}/genesis.json:/genesis.json -v ${PWD}/datos:/data ethereum/client-go:v1.13.15 init --datadir /data /genesis.json

Mapeamos los directorios, y luego iniciamos el nodo definiendo donde se guardan los datos y donde esta el genesiss en el contenedor

Desplegar el nodo
docker run -v ${PWD}/pwd.txt:/p.txt -v ${PWD}/datos:/data -p 5556:8545 --name nodo_eth -d ethereum/client-go:v1.13.15 --datadir data --networkid 15 --unlock e8a151fa202e41817682a491aeabffd8ad54b70c --allow-insecure-unlock --mine --miner.etherbase e8a151fa202e41817682a491aeabffd8ad54b70c --password /p.txt --nodiscover --http --http.addr "0.0.0.0" --http.api "admin,eth,debug,miner,net,txpool,personal,web3" --http.corsdomain "*"

docker run \
 -v ${PWD}/pwd.txt:/p.txt \
 -v ${PWD}/datos:/data \
 mapeamos los directorios
 -p 5556:8545 \
 El puerto por defecto del contenedor es el 8545, mapeamos el 5556 para acceder a el y que nos redirija al 8545
 --name nodo_eth \
 -d \  
 ethereum/client-go:v1.13.15 \
 A partir de aquí es todo de la imagen
 --datadir /data \
 --networkid 15 \
 --unlock ${signerAddress} \ desbloquar el nodo 
 --mine --miner.etherbase ${signerAddress} \ definir que va a minar
 --allow-insecure-unlock como es un nodo RPC y un nodo minero a loa vez y esto no es lo habitual ni es seguro hay que permitirle la inseguridad
 --password /pwd.txt \ la contraseña para firmar 
 --nodiscover \ que no busque a otros nodos
 Aqui tiene que ver con el protocolo http
 --http que permite el protocolo
 --http.addr "0.0.0.0"  si no le ponemos nada va a funcionar nromal con el localhost
 --http.api "admin,eth,debug,miner,net,txpool,personal,web3" \  las api que va a aceptar
 --http.corsdomain "*" la politica de cors en este caso de cualquier parte

 Podfemos probar haciendo un curl
 curl --location 'http://192.168.1.189:5556/' --header 'Content-Type: application/json' --data '{
	"jsonrpc":"2.0",
	"method":"eth_getBalance",
	"params":[
		"0x467221fb66EC2a4A5947B51325B8d06EF3f8363e", 
		"latest"
	],
	"id":1
}'

Consultar los rpc:
https://documenter.getpostman.com/view/4117254/ethereum-json-rpc/RVu7CT5J#2166dfcf-f1a5-8ba7-6099-4808b41389a3