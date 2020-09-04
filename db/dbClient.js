import {Client} from './db.js';

//Creation Client
export async function createClient(client) {
    const newClient = new Client({
        nom: client.nom,
        email: client.email,
        details: client.details
    });
    return await newClient.save();
};

//Recuperation des Clients
export async function getAllClient() {
    return await Client.find();
};

//Recuperation Client par id
export async function getClientById(id) {
    return await Client.findById(id);
}

//Recuperation Client selon criteres : nom
//on lui passe un objet {}
export async function getClientByName(critere) {
    return await Client.find(critere);   
};

//Modification d'un Client, on lui passe l'id et les valeurs à modifier sous forme de d'objet {}
export async function updateClient(id, values) {
    return await Client.findByIdAndUpdate({_id:id}, {$set:values}, {new: true});
}

//Suppression d'un Client
export async function deleteClient(id) {
    return await Client.findByIdAndDelete({_id: id});
};