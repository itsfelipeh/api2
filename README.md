
Este proyecto permite enviar solicitudes POST desde tu frontend a Google Apps Script sin problemas de CORS.

Uso

Sube este proyecto a Vercel.
Tu endpoint será: https://TU-APP.vercel.app/api/report
Desde el frontend, realiza fetch() a ese endpoint, no directamente a Apps Script.
Estructura

api/report.js: Proxy que redirige la solicitud POST
