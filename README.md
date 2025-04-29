# Run locally

Construire et lancer le container gérant la base de données:

```bash
docker build -t todo_db .
docker run --name todo-postgres -e POSTGRES_PASSWORD=DB_PASSWORD -p 5432:5432 -d todo_db
```

Pour stopper le container docker:

```bash
docker stop todo-postgres
```

Pour lancer le container docker:

```bash
docker start todo-postgres
```

Pour installer les dépendances:

```bash
npm install
```

Pour lancer le server : 
(ça lance nodemon qui permet une compilation dynamique)

```bash
npm run dev
```

## Gestion .env

Crée un .env dans /back-end

.env :
```bash
PORT=3000
JWT_SECRET=ton_jwt_secret
DB_USER=imEvooh
DB_PASSWORD=ton_mdp
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db
```

Pour génerer ton jwt_secret, exécute cette commande :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```