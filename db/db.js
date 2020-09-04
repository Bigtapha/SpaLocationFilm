import mongoose from 'mongoose';
//import {sauvegardeErrDbLogs} from '../helpers/enregistrer.js';

const mongoConnectionString = 'mongodb://localhost/SpaLocationFilmVidly';
mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> {
            console.log('Connecté à MongoDB !')
        })
        .catch(err => {
            sauvegardeErrDbLogs(`Erreur de connexion: ${err.message}`);//Ecriture dans un fichier des erreurs liées a la connexion
            console.log("Impossible de se connecter à MongoDB", err.name)
        });

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
//03-Création d'un schéma
//Collection de Genre: id, nom, details
//Collection de DVD : id, titre, genre, date, prix, isAvalaible
//Collection de client : id, nom, email, 
//Collection de Location : dvd, client

const genreSchema = new mongoose.Schema({
    nom: { type: String, index: { unique: true }},
    details: String
});
export const Genre = mongoose.model('Genres', genreSchema);

const clientSchema = new mongoose.Schema({
    nom: { type: String, index: { unique: true }},
    email: String,
    nbrLocation: {type: Number, default:0},
    details: String
});

export const Client = mongoose.model('Clients', clientSchema);

const dvdSchema = new mongoose.Schema({
    titre: String,//titre du dvd
    genre: [{type: mongoose.Schema.Types.ObjectId, ref: Genre}],//genre du Dvd
    date: {type:Date, default: Date.now},//date de sortie
    disponible: {type:Boolean, default: true},//disponibilité ou pas
    details: String//détails sur le dvd
});
export const Dvd = mongoose.model('Dvds', dvdSchema);

const locationSchema = new mongoose.Schema({
    dvd: [{type: mongoose.Schema.Types.ObjectId, ref: Dvd}],//dvd loué par le client
    client: [{type: mongoose.Schema.Types.ObjectId, ref: Client}],//le client qui loue le dvd
    dateDebut: Date,//date début de location
    dateFin: Date,//date fin de location
    prix:Number,
    status: {type:Boolean, default: false}//false=location en cours, true= location terminée
});
export const Location = mongoose.model('Locations', locationSchema);

const anomaliesSchema = mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref: Client},
    dvd: {type: mongoose.Schema.Types.ObjectId, ref: Dvd},
    date: {type:Date, default: Date.now},
    //details: String
})
export const Anomalies = mongoose.model('Anomalies', anomaliesSchema);


export const closeDb = () =>{
    mongoose.disconnect();
}
//export {Dvd, Client, Genre, Location};




