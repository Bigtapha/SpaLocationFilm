import fs from 'fs';
import path from 'path';


/***Fonction d'enregistrement des données dans un fichier */
const repertoire = path.resolve(process.cwd())

if(!fs.existsSync(`${repertoire}\\public`)){
    fs.mkdirSync(`${repertoire}\\public`)
}

const filepath = `${repertoire}\\public\\`;

export const sauvegardeErrDbLogs = (donnees) =>{
    let writeStream = fs.createWriteStream(filepath + "ErreursDBLogs.txt", {flags: 'a'});
    writeStream.write(`${donnees}\r`);
    writeStream.on('error', (err) => {
        console.log("error lors de l'écriture du fichier logs");
    })
    writeStream.on('finish', () => {
        console.log('Ecriture du fichier logs réussie')
    })
    writeStream.end();
};

export const accessLogStream = fs.createWriteStream(filepath + "morgan.log", { flags: 'a' })

