import http from "node:http";

const host = "localhost";
const port = 8000;

import fs from "node:fs/promises";

async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(contents);
  } 
  catch (error) {
    console.error(error);
    // On vérifie si le code d'erreur montre que le fichier n'existe pas
    if (error.code === "ENOENT") {
      response.writeHead(500);
      response.end("Error 500: Le fichier est introuvable.");
    } else {
      // Pour toute autre erreur
      response.writeHead(500);
        response.end("Error 500: Problèmes internes au serveur.");
    }
  }
}




const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});