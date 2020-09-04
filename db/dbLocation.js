import {Location} from './db.js';//import modele Location
import {Dvd} from './db.js';
import {Client} from './db.js';
//import {verificationLocation} from './validation.js'
import {Anomalies} from './db.js';


/***************TRAITEMENT DES REQUETES***************************************************** */
//Creation d'une Location : Un client peut louer 1 ou plusieurs  DVDs s’il sont disponible 
//(on doit tenir compte du nombre de DVDs disponibles par titre
export async function createLocation(location) {
    const dvd = await Dvd.findById(location.dvd);//on récupère le dvd passé en paramètre
    const client = await Client.findById(location.client);//on récupère le client passé en paramètre
    //si le dvd n'existe pas ou qu'il n'est pas disponible on renvoie une erreur
    if (!dvd || !dvd.disponible) {
        return new Error("Le dvd n'existe pas ou n'est pas disponible");
    }
    //si le client n'existe pas ou qu'il a atteint le maximum de location autorisée, on renvoie une erreur et on écrit dans un fichier
    else if(!client){  
        return new Error("Le client n'existe pas");
    }
    else if(client.nbrLocation >= 9){
        anomalie = new Anomalies({
            dvd: dvd,
            client: client
        });
        await anomalie.save();
        return new Error("Vous avez atteint le nombre de location autorisée");
    }
    else{
        const newLocation = new Location({
            dvd: dvd,
            client: client,
            dateDebut: new Date(location.dateDebut),
            dateFin: new Date(location.dateFin),
            prix: parseInt(location.prix)
        });
        const result = await newLocation.save();
        console.log(result);
        if (!result.status) {
            //console.log(result);
            dvd.disponible = false;
            client.nbrLocation++;
            dvd.save();
            client.save();
        }
        return result;
    }
    
};

//Recupération liste des locations
export async function getAllLocation() {
    return await Location.find().populate("client",{"nom":1, "_id":1}).populate("dvd",{"titre":1, "_id":1});
};


//Recuperation Location par id
export async function getLocationById(id) {
    return await Location.findById(id);
}

//Recuperation Location par criteres: valeurs accéptées : {'count', client,}
//On implémente en même temps la fonctionnalité de récupération du nombre de client qui ont loué un dvd

export async function getLocationByCriters(critere) {
    if (critere.count) {
        return await Location.distinct('client').count();//on retourne le nombre de client qui ont loué un dvd
    }
    if(critere.status){
        //on peut aussi afficher la liste des Dvds retournés avec toutes les dates d'entrée et de sortie
        return await Location.find({status:true})
                    .populate("client",{"nom":1, "_id":0})
                    .populate("dvd",{"titre":1, "_id":0})
                    .select({dvd:1, client:1, dateDebut:1, dateFin:1})
    }
    return await Location.find(critere).populate("client",{"nom":1, "_id":0}).populate("dvd",{"titre":1, "_id":0});    
};

//Recuperation Location selon criteres : nom
//on lui passe un objet {}
export async function getLocationByName(critere) {
    return await Location.find(critere);   
};

//Modification d'un Location, on lui passe l'id et les valeurs à modifier sous forme de d'objet {}
//On implémente ausi le retour d'un dvd en même temps, on considère que le retour d'un dvd est une mise à jour 
//d'une location qui passe à true(terminée), on décrémente le nbrLocation du client et on passe la disponibilité du Dvd à true
export async function updateLocation(id, values) {
    //On met à jour la Location en lui passant les valeurs fournies depuis le endpoint
    const result = await Location.findByIdAndUpdate({_id:id}, {$set:values}, {new: true});
    //Une fois la mise à jour terminée, on teste si le status de la location est true(location terminée), 
    //dans ce cas on met à jour le client(on décrémente le nombre de location) et le dvd(on repasse disponible à true)
    if(result.status && result.client){
        const dvd = await Dvd.findById(result.dvd);
        const client = await Client.findById(result.client)
        dvd.disponible = true;
        client.nbrLocation--;
        dvd.save();
        client.save();
    }
    return result;
};

//Suppression d'une Location, si on supprime une location, on mets à jour aussi le client et le dvd
export async function deleteLocation(id) {
    const result = await Location.findByIdAndDelete({_id: id});
    if(result.status && result.client){
        const dvd = await Dvd.findById(result.dvd);
        const client = await Client.findById(result.client)
        dvd.disponible = true;
        client.nbrLocation--;
        dvd.save();
        client.save();
    }
    return result;
};