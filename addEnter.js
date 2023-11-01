import { readFile, writeFile } from 'fs';

export const addPrice = (price) => {
  const newData = { price, date: Date.now() };

  // Lire le fichier JSON existant (ou le créer s'il n'existe pas)
  readFile('data.json', 'utf-8', (err, data) => {
    let jsonData = [];
    if (!err) {
      // Le fichier JSON existe, donc analyser son contenu
      try {
        jsonData = JSON.parse(data);
        if (!Array.isArray(jsonData)) {
          throw new Error('Le fichier JSON n\'est pas un tableau valide.');
        }
      } catch (parseError) {
        console.error('Erreur d\'analyse du fichier JSON existant:', parseError);
        return;
      }
    }

    // Ajouter les nouvelles données au tableau existant
    jsonData.push(newData);

    // Réécrire le fichier JSON avec les données mises à jour
    writeFile('data.json', JSON.stringify(jsonData, null, 2), (writeError) => {
      if (writeError) {
        console.error('Erreur d\'écriture dans le fichier JSON :', writeError);
        return;
      }
      console.log('Données ajoutées au fichier JSON avec succès.');
    });
  });
};
