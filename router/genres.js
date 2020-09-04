import express from 'express';//import module express
import {sauvegardeErrDbLogs} from '../helpers/enregistrer.js';
import {joiSchema} from './../joiValidation.js';
//import {closeDb} from '../db/db.js';
import * as dbGenre from '../db/dbGenre.js';
const router = express.Router();

//création tableau de genre
// const genres = [
//     {id: 1, nom: "Action"},
//     {id: 2, nom: "Horreur"},
//     {id: 3, nom: "Comédie"},
//     {id: 4,nom: "Fiction"},
//     {id: 5,nom: "Romance"}
// ];

//recup liste des genres avec options de recherche selon critère
router.get('/', (req, res) => {
    dbGenre.getAllGenre()
        .then(resultat => {res.send(resultat)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(404).send('impossible de recupérer la liste des genres')
        });
});

//recup d'un genre selon id
router.get('/:id', (req, res) => {
    dbGenre.getGenreById(req.params.id)
        .then(resultat => {res.send(resultat)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(404).send('impossible de recupérer le genre');
        });
});

//ajout d'un genre
router.post('/', (req, res) => {
    const genre = {nom: req.body.nom, details: req.body.details};
    dbGenre.createGenre(genre)
        .then(resultat => {res.status(201).send(resultat)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(404).send(`impossible de créer le genre : ${error.message}`);
        });
});

//modification d'un genre
router.put('/:id', (req, res) => {
    const modification = {nom: req.body.nom, details: req.body.nom};
    dbGenre.updateGenre(req.params.id, modification)
        .then(resultat => {res.send(resultat)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(304).send(`Echec de la mise à jour : ${error.message}`);
        });
});

//suppression d'un genre
router.delete('/:id', (req, res) => {
    dbGenre.deleteGenre(req.params.id)
        .then(resultat => {res.status(200).send(`Suppression réussie : ${resultat}`)})
        .catch(error => {
            sauvegardeErrDbLogs(error.message);
            res.status(404).send(`Echec de la suppression : ${error.message}`);
        });
});

export default router;