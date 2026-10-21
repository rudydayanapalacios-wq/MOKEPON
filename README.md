<div align="center">

<!-- MOKEPON · PURPLE / LILAC / ORANGE -->

# <span style="color:#C9A7FF">M O K E P O N</span>

### <span style="color:#FFAD66">PLAYER 01 · A NEW ADVENTURE</span>

**Elige tu mascota · Explora el mapa · ¡Prepárate para combatir!**

![Estado del proyecto](https://img.shields.io/badge/ESTADO-En%20desarrollo-C9A7FF?style=for-the-badge&labelColor=281A3A)
![HTML](https://img.shields.io/badge/HTML-E8CFFF?style=for-the-badge&logo=html5&logoColor=281A3A)
![CSS](https://img.shields.io/badge/CSS-FFAD66?style=for-the-badge&logo=css3&logoColor=281A3A)
![JavaScript](https://img.shields.io/badge/JavaScript-C9A7FF?style=for-the-badge&logo=javascript&logoColor=281A3A)
![Node.js](https://img.shields.io/badge/Node.js-FFAD66?style=for-the-badge&logo=nodedotjs&logoColor=281A3A)
![Express](https://img.shields.io/badge/Express-E8CFFF?style=for-the-badge&logo=express&logoColor=281A3A)

---

</div>

## 🟣 Índice

- [Acerca del proyecto](#-acerca-del-proyecto)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos](#-requisitos)
- [Instalación y ejecución](#-instalación-y-ejecución)
- [Jugar desde el celular](#-jugar-desde-el-celular)
- [Cómo jugar](#-cómo-jugar)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Funcionamiento técnico](#-funcionamiento-técnico)
- [Solución de problemas](#-solución-de-problemas)
- [Estado y mejoras](#-estado-y-mejoras)
- [Créditos](#-créditos)

## 🟣 Acerca del proyecto

**Mokepon** es un juego web desarrollado como proyecto de práctica de desarrollo web. El jugador selecciona una criatura, puede participar en combates y explorar un mapa mediante controles en pantalla.

El proyecto utiliza una página web para la interfaz y un servidor con Node.js y Express para servir los archivos y gestionar la comunicación del juego.

> **Estado:** proyecto en desarrollo. Las funciones y los pasos descritos aquí corresponden a la versión local que se está construyendo; pueden cambiar a medida que avance el proyecto.

## 🟠 Características

- **Selección de mascota:** elige entre criaturas disponibles como Capipepo, Hipodoge y Ratigueya.
- **Combate:** selecciona ataques y consulta el resultado de la partida.
- **Mapa:** controla el movimiento de tu mascota en el mapa.
- **Servidor de juego:** registra jugadores y recibe sus posiciones.
- **Interfaz adaptable en progreso:** se están preparando y probando controles para dispositivos móviles.

## 🪻 Tecnologías

| Tecnología | Función en el proyecto |
|---|---|
| HTML | Estructura de la interfaz del juego |
| CSS | Estilos y presentación visual |
| JavaScript | Interacciones, controles y lógica del juego |
| Node.js | Entorno para ejecutar el servidor |
| Express | Servidor web y rutas del juego |

## 🟣 Requisitos

Antes de ejecutar el proyecto necesitas:

- Un computador con Windows, macOS o Linux.
- [Node.js](https://nodejs.org/) instalado.
- Los archivos del proyecto en tu equipo.
- Un navegador actualizado.


## 🟠 Instalación y ejecución

### 1. Descargar o clonar el proyecto

```bash
git clone https://github.com/rudydayanapalacios-wq/MOKEPON
cd mokepon
```

> Reemplaza `https://github.com/rudydayanapalacios-wq/MOKEPON` por la URL real de tu repositorio de GitHub.

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Iniciar el servidor

```bash
node index.js
```

Si Windows no reconoce el comando `node`, puedes usar:

```powershell
& "C:\Program Files\nodejs\node.exe" index.js
```

Cuando aparezca el mensaje `Servidor funcionando`, deja la terminal abierta mientras juegas.

### 4. Abrir el juego en el computador

🎮 **Enlace local:**

[http://localhost:8080/](http://localhost:8080/)

## 🪻 Jugar desde el celular

Puedes jugar desde el celular si ambos dispositivos están conectados a la misma red Wi-Fi.

### 1. Consultar la IP del computador

Abre otra ventana de PowerShell y ejecuta:

```powershell
ipconfig
```

Busca la dirección IPv4 del adaptador Wi-Fi.

### 2. Abrir el juego desde el celular

Usa la IP que encontraste, seguida del puerto `8080`.

📱 **Enlace para el celular:**

`http://IP-DEL-COMPUTADOR:8080/`

Por ejemplo, si la IP de tu computador es `192.168.1.14`, el enlace sería:

[http://192.168.1.14:8080/](http://192.168.1.14:8080/)

> **Importante:** la IP del ejemplo debe coincidir con la dirección IPv4 actual de tu computador. Si cambia, actualiza el enlace.

### 3. Si el juego no conecta

- Mantén el servidor encendido en el computador.
- Comprueba que ambos dispositivos estén en la misma red Wi-Fi.
- Revisa las direcciones utilizadas en las solicitudes `fetch` de `public/mokepon.js`. Desde el celular, `localhost` apunta al propio celular, no al computador.
- Si la conexión es rechazada, revisa el Firewall de Windows.


## 🟠 Cómo jugar

1. Abre el juego en el navegador.
2. Selecciona una de las mascotas disponibles.
3. Pulsa **Seleccionar** para continuar.
4. Usa los controles de movimiento para explorar el mapa.
5. En la sección de combate, elige un ataque y revisa el resultado.
6. Usa **Reiniciar** cuando quieras comenzar de nuevo, si está disponible en la pantalla de combate.

## 🟣 Estructura del proyecto

La estructura actual de los archivos principales es:

```text
mokepon/
├── index.js
├── package.json
├── package-lock.json
└── public/
    ├── index.html
    ├── mokepon.js
    ├── styles.css
    └── assets/
        ├── capipepo.png
        ├── hipodoge.png
        ├── ratigueya.png
        ├── mokemap.png
        └── imágenes de ataques
```

`package.json` y `package-lock.json` aparecen en esta estructura si existen en la carpeta del proyecto. La carpeta `assets/` contiene imágenes usadas por el juego.

## 🪻 Funcionamiento técnico

A grandes rasgos, el proyecto se divide en dos partes:

- **Cliente (`public/`):** contiene el HTML, CSS, JavaScript del navegador y los recursos gráficos.
- **Servidor (`index.js`):** ejecuta Express, sirve los archivos estáticos de `public/` y expone rutas para gestionar jugadores y sus posiciones.

La interfaz se comunica con el servidor mediante solicitudes HTTP. La ruta y el método de cada solicitud deben coincidir con los definidos en `index.js`.

## 🟠 Solución de problemas

| Problema | Qué comprobar |
|---|---|
| `node` no se reconoce | Verifica la instalación de Node.js o usa la ruta completa a `node.exe`. |
| `Cannot GET /...` | Comprueba que no estés abriendo manualmente en el navegador una ruta que espera una solicitud `POST`. |
| `ERR_FILE_NOT_FOUND` para `mokepon.js` | Confirma que el HTML use `./mokepon.js` si el archivo está directamente dentro de `public/`. |
| El celular no conecta | Verifica la IP del computador, la misma red Wi-Fi, el servidor activo y el firewall. |
| El juego abre en el celular, pero no conecta al servidor | Revisa las URL de `fetch`; no uses `localhost` para referirte al computador desde el celular. |

## 🪻 Estado y mejoras

El proyecto continúa en desarrollo. Algunas tareas que se pueden abordar en próximas versiones:

- [ ] Comprobar el juego en diferentes tamaños de pantalla.
- [ ] Verificar los controles táctiles en dispositivos móviles.
- [ ] Probar la comunicación entre varios jugadores.
- [ ] Añadir capturas de pantalla de las distintas secciones.
- [ ] Documentar las rutas del servidor y los formatos de sus solicitudes.

## 🟣 Créditos

Proyecto de práctica de desarrollo web, construido paso a paso con HTML, CSS, JavaScript, Node.js y Express.

**Mokepon** · Código, criaturas y aventura. <span style="color:#FFAD66">◆</span>

---

<div align="center">


*Gracias por visitar el proyecto.*

</div>
