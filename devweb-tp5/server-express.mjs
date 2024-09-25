import express from "express";
import morgan from "morgan";
import createError from 'http-errors';
import logger from "loglevel";

const host = "localhost";
const port = 8000;

const app = express();


// Fixer le niveau de verbosité
logger.setLevel(logger.levels.WARN);

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
    logger.error("Le paramètre doit être un nombre valide");
    return next(createError(400, "Le paramètre n'est pas un nombre valide"));
  }

  // Générer un tableau de nombres aléatoires
  const numbers = Array.from({ length }).map(() => Math.floor(100 * Math.random()));

  // Message de bienvenue
  const welcome = `Voici ${length} nombres aléatoires`;
  logger.info("Rendu de la page avec des nombres aléatoires");
  response.render("random", { numbers, welcome });
});

// Middleware de gestion des erreurs
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV === "development") {
    logger.debug(err); // Afficher les détails en mode développement
    res.status(err.status || 500).send({
      error: {
        status: err.status || 500,
        message: err.message,
        stack: err.stack,
      },
    });
  } else {
    logger.warn("Une erreur s'est produite, message renvoyé à l'utilisateur");
    res.status(err.status || 500).send({
      error: {
        status: err.status || 500,
        message: "Une erreur est survenue",
      },
    });
  }
});

const server = app.listen(port, host);

server.on("listening", () =>
  logger.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

logger.debug(`File ${import.meta.url} executed.`);