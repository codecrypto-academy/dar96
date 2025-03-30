const {createECDH} = require('crypto')
//Con esta libreria accedemos a los argumentos al lanzar la app
const args = require('yargs').argv
//Necesitamos fs para guardar las claves
const fs = require('fs')
const { exit } = require('process')


//Nos aseguramnos que se defina un --name al momento de lanzar la app: ejemplo: npx nodemon generar-claves.js --name dfc
if(!args.name){
    console.log('Falta el argumento name')
    exit(0)
}
//Inicializa el generador de claves, pero no genera las claves todavía, usando la funcion createECDH de la libreria crypto que ya está dentro de node
const keyPair = createECDH('secp521r1')
//Generamos la pareja de claves, la funcion generateKeys además de generar las claves devuelve la clave pública
const publicKey = keyPair.generateKeys('hex')
const privateKey = keyPair.getPrivateKey('hex')
fs.writeFileSync('./data/'+args.name+'.key', privateKey)
fs.writeFileSync('./data/'+args.name+'.pb', publicKey)