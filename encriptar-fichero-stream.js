//Esto es una copia del fichero para cuando se necesite cifrar ficheros grandes, en donde debemso usar los stream para que se vayan cifrando y descifrando
// poco a poco y no ocupen tanta memoria

const {createCipheriv, createECDH} = require('crypto')
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

var cifrador = createCipheriv(algo, secret.slice(0,32), secret.slice(0,16)) 

// Con streams (pipe): Node.js maneja update y final por ti, por eso no hace falta llamarlos manualmente.
fs.createReadStream('./data/'+args.data)
    .pipe(cifrador)
    .pipe(new fs.createWriteStream('./data/'+args.public+'-'+ args.data + '.enc'))

// const texto = fs.readFileSync('./data/'+args.data)
// let encriptado = cifrador.update(texto, 'utf-8', 'hex')
// encriptado += cifrador.final('hex')
// fs.writeFileSync('./data/'+args.public+'-'+ args.data + '.enc', encriptado)
