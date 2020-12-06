# Servidor express
Proyecto generado mediante express-generator con plantillas ejs.
## Base de datos
Base de datos PostgresSQL

## Configurar base de datos
1. Al momento usaremos una base de datos llamada **dental_friends** con un usuario(crear si no existe) **dental_friends** y password **dental_friends**
2. Ejecutar archivos sql que estan en la carpeta ../sql

## Iniciar servidor
1. Teniendo instalado NodeJs escribir: **npm install** en la ruta del proyecto, esto en donde esta app.js

2. Instalar nodemon para que cada vez que actualice el servidor, este se recarge automaticamente: **npm install --save-dev nodemon**

3. Ejecutar servidor: **nodemon -e js,ejs**

4. Dirigirse a la http://localhost:3000/ en el browser

Nota: si no puede ejecutar nodemon, ejecutar **npm start**
