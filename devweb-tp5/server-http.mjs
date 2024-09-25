import http from "node:http";

const host = "localhost";
const port = 8000;

import fs from "node:fs/promises";

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const urlParts = request.url.split("/"); // Décompose l'URL en segments
    switch (urlParts[1]) { // Vérifie le premier segment après le /
      case "index.html":
        const contents = await fs.readFile("index.html", "utf8");
        response.writeHead(200);
        return response.end(contents);
      case "random.html":
        response.writeHead(200);
        return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
      case "random": // Vérifie si l'URL correspond à /random
        const count = parseInt(urlParts[2], 10); // Récupère le paramètre nb
        if (isNaN(count) || count <= 0) { // Vérifie que count est un nombre valide
          response.writeHead(400); // Mauvaise requête
          return response.end(`<html><p>400: MAUVAISE REQUETE - Votre requête n'est pas valide</p></html>`);
        }
        const randomNumbers = Array.from({ length: count }, () => Math.floor(Math.random() * 100));
        response.writeHead(200);
        return response.end(`<html><p>${randomNumbers.join(", ")}</p></html>`);
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: ERREUR INTERNE AU SERVEUR</p></html>`);
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});




const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});