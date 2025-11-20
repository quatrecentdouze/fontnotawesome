const fs = require("fs");
const path = require("path");

function countSVGs(folderPath) {
    let count = 0;

    function explore(dir) {
        try {
            const items = fs.readdirSync(dir, { withFileTypes: true });

            for (const item of items) {
                const fullPath = path.join(dir, item.name);

                if (item.isDirectory()) {
                    // Si c’est un dossier → on continue à explorer
                    explore(fullPath);
                } else if (item.isFile() && path.extname(item.name).toLowerCase() === ".svg") {
                    count++;
                }
            }
        } catch (err) {
            console.error("Erreur lors de la lecture du dossier :", err.message);
        }
    }

    explore(folderPath);
    console.log(`Il y a ${count} fichier(s) SVG dans le dossier (récursif) : ${folderPath}`);
}

// Exemple d'utilisation :
const dossier = "./fontnotawesome-assets"; // ← Remplace par ton dossier
countSVGs(dossier);
