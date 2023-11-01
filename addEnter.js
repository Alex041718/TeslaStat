import { readFile, writeFile } from 'fs';

export const addPrice = (price) => {
  // Lire le fichier JSON existant
  readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Analyser le fichier JSON en un tableau d'objets
    const jsonData = JSON.parse(data);

    // Ajouter les nouvelles données au tableau existant
    jsonData.push({ price, date: Date.now() });

    // Réécrire le fichier JSON avec les nouvelles données
    writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Données ajoutées au fichier JSON avec succès.');
    });
  });
};
