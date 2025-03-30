//A la hora de desencriptar el fichero usamos la llave publica del origen y la privada del destinatario
// npx nodemon desencriptar-fichero.js --private dfc --public jvh --data fichero.txt
const {createDecipheriv, createECDH} = require('crypto')
const { exit } = require('process')
const args = require('yargs').argv
const fs = require('fs')

if(!args.private && !args.public && !args.data){
    console.log('Faltan parametros')
    exit(0)
}

const origen = createECDH('secp521r1')
const key = fs.readFileSync('./data/'+args.private+'.key').toString()
origen.setPrivateKey(key, 'hex')

const pub = fs.readFileSync('./data/'+args.public+'.pb').toString()

const secret = Uint8Array.from(origen.computeSecret(pub, 'hex', 'binary'))

const algo = "aes-256-cbc"
var descifrador = createDecipheriv(algo, secret.slice(0,32), secret.slice(0,16)) 

const texto = fs.readFileSync('./data/'+ args.private + '-' +args.data + '.enc').toString()


let desencriptado = descifrador.update(texto, 'hex', 'utf-8')
desencriptado += descifrador.final('utf-8')
fs.writeFileSync('./data/'+ args.private + '-' +args.data + '.des', desencriptado)
