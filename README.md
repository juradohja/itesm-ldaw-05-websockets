# Websockets
#### Por: José Alberto Jurado

GD #5 para la materia Laboratorio de desarrollo de aplicaciones
Web. Juego de Basta en línea que maneja websockets para mandar notificaciones
a cada sesión activa y actualizar la pantalla de juego según el flujo de este.

## Instalación

1. Descarga las dependencias del proyecto
```shell
npm install
```

2. Copia el `template` de las variables de entorno y configuralas según tu ambiente.
```shell
cp .env.example .env
```

3. Ejecuta las migraciones del sistema
```shell
knex migrate:latest
```

4. Ejecuta las semillas del sistema
```
knex seed:run
```

## Ejecución
```
node server.js
```
Para recargar el proyecto sin tener que ejecutarlo manualmente
después de cada cambio, utilizar nodemon.
```
nodemon server.js
```
