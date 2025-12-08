import { build } from 'vite';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildProject() {
    try {
        console.log('Building Vite project...');
        await build();
        console.log('Vite build completed successfully.');

        let sourcePath = path.join(__dirname, 'ecole-directe.plus+1-key.pem');
        let destinationPath = path.join(__dirname, 'dist', 'ecole-directe.plus+1-key.pem');

        if (fs.existsSync(sourcePath)) {
            fs.copyFile(sourcePath, destinationPath, (err) => {
                if (err) {
                    console.error(`Error cop ecole-directe.plus+1-key.pem: ${err}`);
                }
            });
        } else {
            console.warn(`Warning: ${sourcePath} not found. Skipping copy operation.`);
        }
            
        sourcePath = path.join(__dirname, 'ecole-directe.plus+1.pem');
        destinationPath = path.join(__dirname, 'dist', 'ecole-directe.plus+1.pem');

        if (fs.existsSync(sourcePath)) {
            fs.copyFile(sourcePath, destinationPath, (err) => {
                if (err) {
                    console.error(`Error copying ecole-directe.plus+1.pem: ${err}`);
                }
            });
        } else {
            console.warn(`Warning: ${sourcePath} not found. Skipping copy operation.`);
        }

        sourcePath = path.join(__dirname, 'server.js');
        destinationPath = path.join(__dirname, 'dist', 'server.js');

        if (fs.existsSync(sourcePath)) {
            fs.copyFile(sourcePath, destinationPath, (err) => {
                if (err) {
                    console.error(`Error copying server.js: ${err}`);
                }
            });
        } else {
            console.warn(`Warning: ${sourcePath} not found. Skipping copy operation.`);
        }

    } catch (e) {
        console.error('Vite build failed:', e);
        process.exit(1);
    }
}

buildProject();
