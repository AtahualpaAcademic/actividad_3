const fs = require('fs').promises;

async function leerArchivo(nombreArchivo) {
  try {
    const data = await fs.readFile(nombreArchivo, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    return [];
  }
}

async function escribirArchivo(nombreArchivo, data) {
  await fs.writeFile(nombreArchivo, JSON.stringify(data, null, 2));
}

module.exports = {
  leerArchivo,
  escribirArchivo
};
