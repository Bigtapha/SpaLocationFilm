// import {Location} from '../db.js';//import modele Location
// import {Dvd} from '../db.js';
// import {Client} from '../db.js';
// import {Genre} from '../db.js';


//************************Préremplissage genre

/******************GENRES **************************************************/
async function Savegenre(genre) {
    const genretosave = new Genre(genre);
    await genretosave.save();
}
const genre1 = {nom: "Science-Fiction", details: "développant un univers souvent basé sur le monde réel, puis décalé dans un contexte spatial ou temporel différent"};
const genre2 = {nom: "Comedie", details: "ayant pour but de divertir en représentant les ridicules des caractères et des mœurs d'une société"};
const genre3 = {nom: "Horreur", details: "cherchant à jouer sur les peurs du spectateur. Cette peur peut être attisée par des scènes violentes"};
const genre4 = {nom: "Action", details: "qui mise sur l'enchaînement des péripéties"};
const genre5 = {nom: "Drame", details: "dont l'histoire tourne autour de faits tragiques"};
const genre6 = {nom: "Thriller", details: " film à suspense, qui cherche à faire ressentir du suspense et une certaine tension à l'idée de ce qui pourrait arriver aux acteurs"};
const genre7 = {nom: "Aventures", details: "qui, à l'inverse du film d'action, ne s'intéresse pas aux péripéties en elles-mêmes, mais aux circonstances qui les amènent"};

const listGenre = [genre1, genre2, genre3, genre4, genre5, genre6, genre7];

for (const genre of listGenre) {
    //Savegenre(genre);
}

/*****************CLIENTS ************************************************************************************************/
async function SaveClients(client) {
    const dvdtosave = new Client(client);
    await dvdtosave.save();
}

const client1 = {nom:'Jean', email:'jean123@azerty.com', details:'Je suis fan de film'}
const client2 = {nom:'David', email:'paul123@azerty.com', details:'Je suis fan de film'}
const client3 = {nom:'John Doe', email:'john123@azerty.com', details:'Je suis fan de film'}
const client4 = {nom:'Derrick', email:'derrick123@azerty.com', details:'Je suis fan de film'}
const client5 = {nom:'Modou', email:'modou123@azerty.com', details:'Je suis fan de film'}
const listClient = [client1, client2, client3, client4, client5]
for (const client of listClient) {
    //SaveClients(client);
}

/*****************DVDs************* ********************************************************/
async function SaveDvds(dvd) {
    const genredb = await Genre.findOne({nom:dvd[1]})
    const dvdtosave = new Dvd({
        titre:dvd[0].titre,
        genre:genredb,
        date:new Date(dvd[0].date),
        details: dvd[0].details
    });
    const result = await dvdtosave.save();
    console.log(result);
}
const dvd1 = {titre:'Interstallar', date:"2014-05-10",details:"Dans un futur proche, un groupe d'explorateurs qui utilise une faille ..."}
const dvd2 = {titre:'Blade Runner', date:"1982-07-25",details:"La Terre est surpeuplée et l’humanité est partie coloniser l’espace. L..."}
const dvd3 = {titre:'Matrix', date:"1999-03-31",details:"Neo, un des pirates les plus recherchés du cyber-espace, reçoit de mys..."}
const dvd4 = {titre:'Bad Boys 3', date:"2020-01-07",details:"Marcus Burnett est maintenant inspecteur de police. Mike Lowery est, quant à lui, en pleine crise de la quarantaine..."}
const dvd5 = {titre:'Gretel et Hansel', date:"2020-01-30",details:"Il y a longtemps, dans une campagne lointaine, une jeune fille, accompagnée de son petit frère, décide de quitter la maison familial...."}
const dvd6 = {titre:'Tyler Rake', date:"2020-04-24",details:"Tyler Rake est un mercenaire intrépide qui travaille dans l'ombre. Il a été envoyé au Bangladesh par un puissant caïd mafieux..."}
const listDvd = [[dvd1,'Science-Fiction'], [dvd2,'Science-Fiction'], [dvd3,'Science-Fiction'],
                [dvd4,'Comedie'], [dvd5,'Horreur'],[dvd6,'Action']]
for (const dvd of listDvd) {
    //SaveDvds(dvd);
}