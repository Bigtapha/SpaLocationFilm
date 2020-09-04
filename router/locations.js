import express from 'express';//import module express
import {sauvegardeErrDbLogs} from '../helpers/enregistrer.js';
import * as dbLocation from '../db/dbLocation.js';
const router = express.Router();



//Récupération toutes les Locations
router.get('/', (req, res) => {
    //Recuperation Liste des Locations (si la requete n'a pas de query string, alors on retourne toute les locations)
    if (Object.keys(req.query).length === 0) {
        
        dbLocation.getAllLocation()
            .then(resultat => res.send(resultat))
            .catch(error => {
                sauvegardeErrDbLogs(error.message);
                res.status(404).send('impossible de recupérer la liste des Location')
            });
    }

    //Afficher Liste des DVDs Loués par un client
    //afficher la liste des Locations selon dvd, 
    //Afficher le total des clients qui ont loués
    //Recherche de dvd par criètere et selon le client
    //On veut afficher la liste des DvDs retournés avec toutes les dates d’entrée et de sortie des DVD
    else {
        let critere;
        if(req.query.client){critere = {client: req.query.client}} //On peut afficher la liste des DVDs qu’un client a loué
        else if(req.query.dvd){critere = {dvd: req.query.dvd}} //Recherche Location selon dvd
        else if(req.query.count){critere = {count:req.query.count}}//Compter le nombre de client qui ont loués
        else if(req.query.client && req.query.dvd){critere = {client: req.query.client, dvd: req.query.dvd}}//Un client peut rechercher des DVDs dans les DVDs qu'il a loué
        else {
            res.status(400).send(`'Erreur : critère de recherche invalid`);//si critère n'est pas valide, on renvoie une erreur 400
            return;
        }
        dbLocation.getLocationByCriters(critere)
            .then(resultat => {
                if (resultat > 0){
                    //si le resultat retourné est un nombre, cela veut dire qu'on est entrain de rechercher le nombre de client qui ont loué
                    res.send(`Le nombre de client qui ont loué un film ${resultat}`);
                }
                res.send(`${resultat}`);
            })
            .catch(error => {
                sauvegardeErrDbLogs(error.message)
                res.status(404).send(`'impossible de recupérer la liste des Location ${error}`)
            });
    }
});

//Création d'une Location
//Un client peut louer 1 ou plusieurs  DVDs s’ils sont disponibles (on doit tenir compte du nombre de DVDs disponibles par titre)
router.post('/', (req, res) => {
    const Location = {
        dvd: req.body.dvd,
        client: req.body.client,
        dateDebut: new Date(req.body.dateDebut),
        dateFin: new Date(req.body.dateFin),
        prix: parseInt(req.body.prix)
    };
    
    dbLocation.createLocation(Location)
        .then(resultat => {res.send(resultat)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message)
            res.status(400).send(error)
        });
});

//Recup d'une Location selon id
router.get('/:id', (req, res) => {
    dbLocation.getLocationById(req.params.id)
        .then(resultat => {res.send(resultat)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message)
            res.status(404).send('impossible de recupérer le genre')
        });
});



//Route pour modification Location et retour d'un dvd
router.put('/:id', (req, res) => {
    const LocationModifications = {
        dvd: req.body.dvd,
        client: req.body.client,
        dateDebut: new Date(req.body.dateDebut),
        dateFin: new Date(req.body.dateFin),
        prix: req.body.prix,
        status: req.body.status
    };
    dbLocation.updateLocation(req.params.id, LocationModifications)
        .then(resultat => {res.send(`Reussite de la mise à jour : ${resultat}`)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message)
            res.status(304).send(`Echec de la mise à jour : ${error.message}`)
        });
});

//Suprression d'une Location
router.delete('/:id', (req, res) => {
    dbLocation.deleteLocation(req.params.id)
        .then(resultat => {res.status(200).send(`Suppression réussie : ${resultat}`)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message)
            res.status(404).send(`Echec de la suppression : ${error.message}`)
        });
});

export default router;