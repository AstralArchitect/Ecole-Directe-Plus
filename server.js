import fs from 'fs';
import https from 'https';
import express from 'express';

import path from 'path'; // Nouveau: on importe 'path'
import { fileURLToPath } from 'url'; // Nouveau: on importe 'fileURLToPath'

// *** NOUVELLES LIGNES POUR DÉFINIR __dirname ***
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// **********************************************

// Chemins vers les fichiers de certificat créés par mkcert
const certPath = 'ecole-directe.plus+1.pem';
const keyPath = 'ecole-directe.plus+1-key.pem';
const port = 443;

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    console.error('Erreur : Certificats (clés .pem) introuvables. Utilisez mkcert pour les créer.');
    process.exit(1);
}

const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
};

const app = express();
// Sert tous les fichiers statiques du dossier actuel (dist)
app.use(express.static(__dirname)); 

https.createServer(options, app).listen(port, () => {
    console.log(`Serveur sécurisé lancé sur https://ecole-directe.plus:${port}`);
    console.log("Attention: Le port 443 nécessite l'exécution en Administrateur.");
});