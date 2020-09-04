import express from 'express';//import module express
import {closeDb} from './db/db.js';//import fonction ferméture Db
import helmet from 'helmet';//import helmet
import {accessLogStream} from './helpers/enregistrer.js';//import fonction pour engirstrer logs de morgan

//import {joiSchema} from './joiValidation.js';
import dvds from './router/dvds.js';
import genres from './router/genres.js';
import clients from './router/clients.js'
import locations from "./router/locations.js";
import morgan from 'morgan';

//definition app et import des routes
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(helmet());

//appel de morgan pour journalisation
//const accessLogStream = fs.createWriteStream(path.resolve(process.cwd()) + '\\public\\morgan.log', { flags: 'a' })
app.use(morgan('combined', {skip: (req, res)=> {return res.statusCode < 400 }, stream: accessLogStream}));


//Appel des ressources selon les endpoints
app.use('/api/dvds', dvds)
app.use('/api/genres', genres);
app.use('/api/clients', clients);
app.use('/api/locations', locations);


//quand node s'arrete, on ferme la BDD
process.on('exit',()=>{
    closeDb();
})

//Definition du port d'ecoute et lancement du server
const port = process.env.port || 5000;//Récupération variable environnement pour le port d'écoute
app.listen(port, ()=>{console.log(`le serveur ecoute sur le port ${port}'`)});






