import express from 'express';//import module express
import {sauvegardeErrDbLogs} from '../helpers/enregistrer.js';
import * as dbDvd from '../db/dbDvd.js';
const router = express.Router();


//GESTION (créer, modifier, supprimer) des DVDs de notre DvDthèque, 
//il est aussi possible de rechercher un DVD à partir de plusieurs critères (proposez au moins 4 citères


//Récupération tous les dvds et recupération selon critère
router.get('/', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        dbDvd.getAllDvd()
            .then(resultat => {res.send(resultat)})
            .catch(error => {
                sauvegardeErrDbLogs(error.message);
                res.status(404).send('impossible de recupérer la liste des Dvd')
            });
    }
    else {
        let critere;
        console.log(req.query.genre)
        if(req.query.genre)critere={genre: req.query.genre};
        else if(req.query.disponible)critere={disponible: req.query.disponible};
        else{return res.status(400).send('Critère de recherche non valid')};
        dbDvd.getDvdByCriters(critere)
            .then(resultat => {res.send(resultat)})
            .catch(error => {
                sauvegardeErrDbLogs(error.message);
                res.status(404).send(`'impossible de recupérer la liste des Dvd ${error}`)
            })
    }
});

//Création ajout d'un dvd
router.post('/', (req, res) => {
    const dvd = {
        titre: req.body.titre,
        genre: req.body.genre,
        date: new Date(req.body.date),
        prix: parseInt(req.body.prix),
        details: req.body.details
    };
    dbDvd.createDvd(dvd)
        .then(resultat => res.send(resultat))
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(400).send(error)
        });
    //closeDb();
});

//Recup d'un dvd selon id
router.get('/:id', (req, res) => {
    dbDvd.getDvdById(req.params.id)
        .then(resultat => {res.send(resultat)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(404).send('impossible de recupérer le genre');
        });
});


//Modification DVD
router.put('/:id', (req, res) => {
    const dvdModifications = {
        titre: req.body.titre,
        genre: req.body.genre,
        date: new Date(req.body.date),
        prix: parseInt(req.body.prix),
        details: req.body.details
    };
    dbDvd.updateDvd(req.params.id, dvdModifications)
        .then(resultat => {res.send(resultat)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(304).send(`Echec de la mise à jour : ${error.message}`);
        });
});

//Suprression DVD
router.delete('/:id', (req, res) => {
    dbDvd.deleteDvd(req.params.id)
        .then(resultat => {res.status(200).send(`Suppression réussie : ${resultat}`)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(404).send(`Echec de la suppression : ${error.message}`);
        });
});

export default router;