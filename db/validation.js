import {Anomalies} from './db.js';


//Fonction pour vérifier la possibilité de Louer pour un client donné et un dvd donné
// async verificationLocation(dvd, client){
//     //si le dvd n'existe pas ou qu'il n'est pas disponible on renvoie une erreur
//     let isValid = true,
//     if (!dvd || !dvd.disponible) {
//         isValid = false
//         return new Error("Le dvd n'existe pas ou n'est pas disponible");
//     }
//     //si le client n'existe pas ou qu'il a atteint le maximum de location autorisée, on renvoie une erreur et on écrit dans un fichier
//     else if(!client){ 
//         isValid = false 
//         return new Error("Le client n'existe pas");
//     }
//     else if(client.nbrLocation >= 9){
//         anomalie = new Anomalies({
//             dvd: dvd,
//             client: client
//         });
//         await anomalie.save();
//         isValid = false
//         return new Error("Vous avez atteint le nombre de location autorisée");
//     }
//     return isValid;
// }