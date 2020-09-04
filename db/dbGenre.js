import {Genre} from './db.js';

export async function createGenre(genre) {
    const newGenre = new Genre({
        nom: genre.nom,
        details: genre.details
    });
    const resultat = await newGenre.save();
    //closeDb();
    return resultat;
};

//Recuperation des Genres
export async function getAllGenre() {
    const resultat = await Genre.find();
    return resultat;
};

//Recuperation Genre par id
export async function getGenreById(id) {
    const resultat = await Genre.findById(id);
    return resultat;
}

//Recuperation Genre selon criteres : nom
//on lui passe un objet {}
export async function getGenreByName(critere) {
    const resultat = await Genre.find(critere);
    return resultat;   
};

//Modification d'un Genre, on lui passe l'id et les valeurs à modifier sous forme de d'objet {}
export async function updateGenre(id, values) {
    const resultat = await Genre.findByIdAndUpdate({_id:id}, {$set:values}, {new: true});
    return resultat;
}

//Suppression d'un Genre
export async function deleteGenre(id) {
    const resultat = await Genre.findByIdAndDelete({_id: id});
    return resultat;
};