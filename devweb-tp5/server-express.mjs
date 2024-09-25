import express from "express";
import morgan from "morgan";
import createError from 'http-errors';


const host = "localhost";
const port = 8000;

const app = express();

// middleware pour trouver le chemin des fichiers static
app.use(express.static("static"));

// moteur de rendu par défaut
app.set("view engine", "ejs");

// route /random/:nb
app.get("/random/:nb", async function (request, response, next) {
  // On convertit le paramètre en nombre entier
  const length = Number.parseInt(request.params.nb, 10);

  // On vérifie si le paramètre est un nombre valide
  if (Number.isNaN(length)) {
    return next(createError(400, "Le paramètre n'est pas un nombre valide"));
  }

  // Générer un tableau de nombres aléatoires
  const numbers = Array.from({ length }).map(() => Math.floor(100 * Math.random()));

  // Message de bienvenue
  const welcome = `Voici ${length} nombres aléatoires`;

  response.render("random", { numbers, welcome });
});

app.use((request, response, next) => {
  concole.debug(`default route handler : ${request.url}`);
  return next(createError(404));
});

app.use((error, _request, response, _next) => {
  concole.debug(`default error handler: ${error}`);
  const status = error.status ?? 500;
  const stack = app.get("env") === "development" ? error.stack : "";
  const result = { code: status, message: error.message, stack };
  return response.render("error", result);
});

const server = app.listen(port, host);

server.on("listening", () =>
  console.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

console.info(`File ${import.meta.url} executed.`);