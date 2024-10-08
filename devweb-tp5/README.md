# 1.1) Liste des en-têtes de la réponse HTTP du serveur

La liste des en-têtes de la réponse HTTP du serveur est :

```
HTTP/1.1 200 OK
Content-Type: text/html
Date: Wed, 25 Sep 2024 02:15:34 GMT
Connection: keep-alive
Content-Length: 39
```

---

# 1.2) Modifications des en-têtes

Les modifications surviennent dans ces en-têtes :

```
Content-Type: application/json
Content-Length: 21
Date: Wed, 25 Sep 2024 02:17:55 GMT
```

---

# 1.3) ?

---

# 1.4) Gestion des erreurs

La console ne renvoie pas d'erreur car on ne l'a pas gérée. L'erreur possible ici est le code `ENOENT`, si le système n'arrive pas à trouver le fichier existant.

Le code pour gérer cette erreur devient :

```javascript
.catch((error) => {
    console.error(error);
    // On vérifie si le code d'erreur montre que le fichier n'existe pas
    if (error.code === "ENOENT") {
        response.writeHead(500);
        response.end("Error 500: Le fichier est introuvable.");
    }
});
```

En renommant le fichier, j'obtiens bien l'erreur code `ENOENT` car le serveur ne retrouve pas le fichier renommé `__index.html`.

---

# 1.5) Gestion d'erreur avec async/await

On obtient donc pour la gestion d'erreur en `async/await` :

```javascript
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
```

---

# 1.6) Modifications du mode developpeur

Les modifications qui ont été apportées sont :

```
La modification du dossier package.json

La création du dossier package-lock.json

La création du dossier node_modules

```

---

# 1.7) Différences entre http-dev et http-prod

Le script de développement permet au développeur d'avoir plus de ressources pour débugger ses programmes et intéragir avec le serveur de la page web tandis que le script de production est plutôt utilisé dans une optique de production de programme, dans le sens où il est optimisé pour être plus rapide et plus réactif
---

# 1.8) Codes HTTP pour les pages

Pour chaque page, on obtient:

```
http://localhost:8000/index.html
Code 200

http://localhost:8000/random.html
Code 200

http://localhost:8000/
Code 404

http://localhost:8000/dont-exist
Code 404
```
---

# 2.1) URL des documentations

La liste des différentes URL pour accéder à la documentation des modules est:

```
https://www.npmjs.com/package/express
https://www.npmjs.com/package/http-errors
https://www.npmjs.com/package/loglevel
https://www.npmjs.com/package/morgan
```
---

# 2.2) Vérification des trois routes

Les routes fonctionnels sont:
```
http://localhost:8000/ affiche bien la page de test
http://localhost:8000/random/:nb fonctionne
http://localhost:8000/index.html affiche la même chose que la première route
 ```

 ---

# 2.3) Entêtes d'Express

La liste des entêtes est:
```
HTTP
Content-Type
Content-Lenght
```

Et le principal entête qui diffère est X-Powered-By

---

# 2.4) Evenement listening

L'evenement listening se déclenche lorsque le serveur écoute l'adresse et le port, donc dès que le serveur est prêt à recevoir des requêtes.

---

# 2.5) Middleware pour gérer le static

C'est l'option `index` qui permet de rediriger automatiquement la route `/` vers la route `/index.html`

---

# 2.6) Codes HTTP sur le fichier style.css

Les différents codes renvoyés sont:

```
200 OK, car la page charge le fichier style.css.
304 Not Modified, après le rafraîchissement simple de la page car le navigateur récupère les données mises en caches puisque le fichier a été vérifié comme n'ayant pas été modifié.
200 OK, après le rafraîchissement forcé car le navigateur ignore à ce moment ce que contient le cache.
```