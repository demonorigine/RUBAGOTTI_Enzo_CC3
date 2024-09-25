import express from "express";
import morgan from "morgan";

const host = "localhost";
const port = 8000;

const app = express();

//middleware pour trouver le chemin des fichiers static
app.use(express.static("static"));

//moteur de rendu par défaut
app.set("view engine", "ejs");


app.get(["/", "/index.html"], async function (request, response, next) {
  response.sendFile("index.html", { root: "./" });
});

app.get("/random/:nb", async function (request, response, next) {
  const length = parseInt(request.params.nb, 10);

  // Générer un tableau de nombres aléatoires
  const numbers = Array.from({ length }).map(() => Math.floor(100 * Math.random()));

  // Message de bienvenue
  const welcome = `Voici ${length} nombres aléatoires`;

  response.render("random", { numbers, welcome });
});

const server = app.listen(port, host);

server.on("listening", () =>
  console.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

console.info(`File ${import.meta.url} executed.`);