import {Dvd} from './db.js';
import {closeDb} from '../db/db.js';

//Creation de DVD
export async function createDvd(dvd) {
    const newDvd = new Dvd({
        titre: dvd.titre,
        genre: dvd.genre,
        prix: dvd.prix,
        date: dvd.date,
        details: dvd.details
    });
    const resultat = await newDvd.save();
    //closeDb();
    return resultat;
};


//Recuperation des DVD
export async function getAllDvd() {
    const resultat = await Dvd.find().populate("genre",{"nom":1, "_id":0}).sort({titre:'asc'}).select({"titre":1, "genre":1, "details":1, "prix":1, "date":1, "disponible":1, "_id":0});
    return resultat;
};

//Recuperation d'un dvd selon ID
export async function getDvdById(id) {
    const resultat = await Dvd.findById(id).populate("genre",{"nom":1, "_id":0}).select({"titre":1, "genre":1, "details":1, "prix":1, "date":1});
    return resultat;
};

//Recuperation Dvd selon criteres : titre, genre, prix, disponible
//on lui passe un objet {}
export async function getDvdByCriters(critere) {
    if (!parseInt(critere.genre)) {
        console.log('je suis ici')
        return await Dvd.find().populate("genre",{"nom":1, "_id":0});
    }
    const resultat = await Dvd.find(critere).populate("genre",{"nom":1, "_id":0});
    return resultat;   
};

//Modification d'un DVD, on lui passe l'id et les valeurs à modifier sous forme de d'objet {}
export async function updateDvd(id, values) {
    const resultat = await Dvd.findByIdAndUpdate({_id:id}, {$set:values}, {new: true});
    return resultat;
}

//Suppression d'un DVD
export async function deleteDvd(id) {
    const resultat = await Dvd.findByIdAndDelete({_id: id});
    return resultat;
};