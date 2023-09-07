#!/bin/bash
# Spécifiez le répertoire du bureau
baseDir="$HOME/Desktop/"
nomProjet=$1
versionAngular=$2
versionJava=$3
serveurWeb=$4
baseDeDonnees=$5
systeme=$6
groupId=com.example       # Remplacez par votre groupId personnalisé
artifactId=$nomProjet     # Utilisez le nom du projet comme artifactId
version=1.0.0-SNAPSHOT   # Remplacez par votre version personnalisée
name="$nomProjet"        # Utilisez le nom du projet comme name

read -p "Nom d'utilisateur docker hub : " hub_USERNAME
read -p "jeton docker hub : " jeton
read -p "refernciel docker hub : " refernciel
read -p "version image : " v_image
read -p "Nom d'utilisateur GitHub : " GITHUB_USERNAME
read -p "Version de Spring Boot (par exemple, 2.6.0) : " springBootVersion

# Demander le jeton d'authentification GitHub
read -sp "Jeton d'authentification GitHub (créez-en un ici : https://github.com/settings/tokens) : " GITHUB_TOKEN

# Créer un dépôt Git distant sur GitHub en utilisant l'API GitHub
response=$(curl -s -H "Authorization: token $GITHUB_TOKEN" -d '{"name":"'$nomProjet'"}' https://api.github.com/user/repos)

# Vérifier si la création du dépôt a réussi
if [[ $response == *"\"message\":\"Requires authentication\""* ]]; then
  echo "Échec de la création du dépôt sur GitHub. Assurez-vous que le jeton d'authentification GitHub est correct."
  exit 1
fi

# Créer un nouveau référentiel Docker Hub en utilisant l'API Docker Hub
dockerhub_response=$(curl -s -H "Authorization: Bearer $DOCKERHUB_TOKEN" -d '{"namespace": "'$DOCKERHUB_USERNAME'", "name": "'$nomProjet'", "is_private": false}' https://hub.docker.com/v2/repositories/namespaces/)

# Vérifier si la création du référentiel Docker Hub a réussi
if [[ $dockerhub_response == *"\"name\":\"invalid\""* ]]; then
  echo "Échec de la création du référentiel sur Docker Hub. Assurez-vous que le jeton d'accès personnel Docker Hub est correct et a les autorisations appropriées."
  exit 1
fi

# Aller dans le répertoire du bureau
cd "$baseDir"

# Créer un répertoire pour le projet
mkdir "$nomProjet"
cd "$nomProjet"

# Cloner le dépôt Git localement
git clone "https://github.com/$GITHUB_USERNAME/$nomProjet.git"
cd $nomProjet

# Créer un projet Angular dans le dossier "front" avec la version spécifiée
npx -p @angular/cli@${versionAngular} ng new front --skip-git --skip-install --routing=false --style=css

# Créer un projet Spring Boot dans le dossier "Back"
curl "https://start.spring.io/starter.zip?type=maven-project&javaVersion=$versionJava&bootVersion=$springBootVersion&groupId=$groupId&artifactId=$artifactId&version=$version&name=$name" -o spring-boot.zip
unzip spring-boot.zip -d Back
cd Back
mvn clean package
cd ..

# Créer un Dockerfile pour le projet Angular
cat <<EOF > front/Dockerfile
# Étape 1 : Build de l'application Angular
FROM node AS build
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
# Installez Angular CLI de manière globale
RUN npm install -g @angular/cli
EOF

# Condition pour choisir la commande de construction Angular en fonction de la version
if [ "$versionAngular" -le 13 ]; then
  echo "RUN ng build --prod" >> front/Dockerfile
else
  echo "RUN ng build --configuration=production" >> front/Dockerfile
fi

# Construire l'image Docker pour le projet Angular
cd front
docker build -t "$nomProjet-angular" .
cd ..

docker login -u $hub_USERNAME -p $jeton
# Taguer l'image Docker Angular avec votre nom d'utilisateur Docker Hub
docker tag "$nomProjet-angular" "$refernciel:$nomProjet-angular.$v_image"
# Push de l'image Docker Angular vers Docker Hub
docker push "$refernciel:$nomProjet-angular.$v_image"

# Aller dans le dossier Back
cd Back

# Créer un Dockerfile pour le projet Spring Boot
cat <<EOF > Dockerfile-springboot
# Étape 1 : Utilisez l'image de base appropriée pour Java
FROM openjdk:$versionJava

# Étape 2 : Configurez le répertoire de travail
WORKDIR /app

# Étape 3 : Copiez le fichier JAR de votre projet Spring Boot dans le conteneur
COPY target/$nomProjet-1.0.0-SNAPSHOT.jar app.jar

# Étape 4 : Exposez le port sur lequel votre application Spring Boot écoute
EXPOSE 8080

# Étape 5 : Commande pour exécuter votre application Spring Boot
CMD ["java", "-jar", "app.jar"]
EOF

# Construire l'image Docker pour le projet Spring Boot
docker build -t "$nomProjet-springboot" -f Dockerfile-springboot .
cd ..

docker login -u $hub_USERNAME -p $jeton
docker tag "$nomProjet-springboot" "$refernciel:$nomProjet-springboot.$v_image"
docker push "$refernciel:$nomProjet-springboot.$v_image"

# Aller dans le dossier Back
cd Back

# Créer un Dockerfile pour l'image Docker combinée (serveur Web, base de données et projet Spring Boot)
cat <<EOF > Dockerfile-image
# Étape 1 : Pull de l'image du serveur Web
FROM $serveurWeb as server

# Étape 2 : Pull de l'image de la base de données
FROM $baseDeDonnees as database

# Étape 3 : Créez une image globale en combinant le serveur Web et la base de données
FROM $systeme
# Installez les outils supplémentaires ou effectuez des configurations personnalisées si nécessaire
# RUN apk update && apk add --no-cache some-package

# Copiez tout depuis l'image du serveur Web
COPY --from=server / /server

# Copiez tout depuis l'image de la base de données
COPY --from=database / /database

# Exposez les ports, volumes, etc. nécessaires pour le serveur Web (le cas échéant)
EXPOSE 80
VOLUME /app

# Exposez les ports, volumes, etc. nécessaires pour la base de données (le cas échéant)
EXPOSE 3306
VOLUME /data

# Indiquez que cette image est une image composite
LABEL com.example.composite=true
EOF

# Construire l'image Docker combinée
docker build -t "$nomProjet-totale" -f Dockerfile-image .
cd ..
docker tag "$nomProjet-totale" "$refernciel:$nomProjet-totale.$v_image"
docker login -u $hub_USERNAME -p $jeton
docker push "$refernciel:$nomProjet-totale.$v_image"

# Initialiser le dépôt Git local et ajouter les fichiers du projet Angular
cd front
git init
git add .
git commit -m "Initial commit for Angular project"

# Pousser le projet Angular vers le dépôt GitHub dans une branche "angular"
git remote add origin "https://github.com/$GITHUB_USERNAME/$nomProjet.git"
git checkout -b angular
git push -u origin angular
cd ..

# Ajouter les fichiers du projet Spring Boot au dépôt Git local
cd Back
git init
git add .
git commit -m "Initial commit for Spring Boot project"

# Pousser le projet Spring Boot vers le dépôt GitHub dans une branche "spring-boot"
git remote add origin "https://github.com/$GITHUB_USERNAME/$nomProjet.git"
git checkout -b spring-boot
git push -u origin spring-boot
cd ..

echo "succées."
read -p "Appuyez sur Entrée pour quitter..."
