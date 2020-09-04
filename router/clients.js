import express from 'express';//import module express
import {sauvegardeErrDbLogs} from '../helpers/enregistrer.js';
import * as dbClient from '../db/dbClient.js';
const router = express.Router();

//récupération Client
router.get('/', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        dbClient.getAllClient()
            .then(resultat => {res.send(resultat)})
            .catch(error => {
                sauvegardeErrDbLogs(error.message);
                res.status(404).send(`'impossible de recupérer la liste des Clients ${error}`);
            });
    }
    else {
        const critere = {
            nom: req.query.nom
        }
        dbClient.getAllClient(critere)
            .then(resultat => {res.send(resultat)})
            .catch(error => {
                sauvegardeErrDbLogs(error.message);
                res.status(404).send(`'impossible de recupérer la liste des Clients ${error}`);
            })
    }
});

//Création client
router.post('/', (req, res) => {
    const client = {
        nom: req.body.nom,
        email: req.body.email,
        details: req.body.details
    };
    dbClient.createClient(client)
        .then(resultat => res.send(`Client ajouté avec succes ${resultat}`))
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(400).send(`Impossible d'ajouter un client ${error}`);
        });
});

//recup d'un client selon id
router.get('/:id', (req, res) => {
    dbClient.getClientById(req.params.id)
        .then(resultat => {res.send(resultat)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(404).send(`impossible de recupérer le genre ${error}`)});
});

router.put('/:id', (req, res) => {
    const clientModifications = {
        nom: req.body.nom,
        email: req.body.email,
        details: req.body.details
    };
    dbClient.updateClient(req.params.id, clientModifications)
        .then(resultat => {res.send(resultat)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(304).send(`Echec de la mise à jour : ${error}`);
        });
});

router.delete('/:id', (req, res) => {
    dbClient.deleteClient(req.params.id)
        .then(resultat => {res.status(200).send(`Suppression réussie : ${resultat}`)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(404).send(`Echec de la suppression : ${error}`);
        });
});

export default router;