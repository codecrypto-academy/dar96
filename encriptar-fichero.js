const {createCipheriv, createECDH} = require('crypto')
const { exit } = require('process')
const args = require('yargs').argv
//Como necesitaremos leer de los ficheros de las claves importamos fs
const fs = require('fs')

//Debemos poner todos los argumentos, ejemplo: npx nodemon encriptar-fichero.js --private jvh --public dfc --data fichero.txt
if(!args.private && !args.public && !args.data){
    console.log('Faltan parametros')
    exit(0)
}

const origen = createECDH('secp521r1')
//Leemos el fichero de clave privada que se nos ha pasado como argumento al lanzar la app
const key = fs.readFileSync('./data/'+args.private+'.key').toString()
//Enlazamos esa clave privada al entorno de claves que hemos creado con el mismo tipo de curva secp521r1 con el que se creo esa clave
origen.setPrivateKey(key, 'hex')

//Hacemos lo mismo con la publica
const pub = fs.readFileSync('./data/'+args.public+'.pb').toString()

//Ahora necesitamos la clave secreta compartida con la que se va a encriptar y posteriormente desencriptar el fichero
//La clave secreta tiene 66 bytes
const secret = Uint8Array.from(origen.computeSecret(pub, 'hex', 'binary'))

//Cifrado del fichero
//Elegimos un algoritmo de cirado, en este caso aes-256-cbc
const algo = "aes-256-cbc"
//Ahora necesitamos un cifrador, el cifrador necesita un algoritmo, una clave secreta, y un vector de inicialización
//En este caso usaremos la clave secreta de 32 bits, por eso hacemos el slice
//El vector de inicializacion es de 16 bytes, los primeros 16 bytes de la clave secreta
var cifrador = createCipheriv(algo, secret.slice(0,32), secret.slice(0,16)) 

//Tomamos el texto que vamos a cifrar
const texto = fs.readFileSync('./data/'+args.data)

//Encriptamos el texto
//El texto viene en formato utf-8 y lo queremos en formato hexadecimal
//Cuando el fichero es pequeño podemos usar el hex 
let encriptado = cifrador.update(texto, 'utf-8', 'hex')
//El cifrador siempre necesita una funcion llamada final que se le añade
encriptado += cifrador.final('hex')

//Guardamos el texto encriptado
fs.writeFileSync('./data/'+args.public+'-'+ args.data + '.enc', encriptado)
