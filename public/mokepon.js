const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const sectionBotonReiniciar = document.getElementById('reiniciar')
    sectionBotonReiniciar.style.display = 'none'
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataque-del-jugador')
const ataqueDelEnemigo = document.getElementById('ataque-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

const contenedorAtaques = document.getElementById('contenedor-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos=[]
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let mascotaJugador
let inputHipodoge
let lienzo = mapa.getContext("2d")
let botonTierra 
let botonFuego 
let ataquesMokeponEnemigo
let botonAgua 
let victoriasJugador = 0
let victoriasEnemigo = 0
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let inputCapipepo 
let inputRatigueya
let ataquesMokepones
let vidasJugador = 3
let vidasEnemigo = 3
let mascotaJugadorObjeto
let intervalo
let intervaloAtaques
let mapaBackground = new Image()
mapaBackground.src= './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa,id=null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadx = 0
        this.velocidady = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho, 
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png',enemigoId)

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png',enemigoId)

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png',enemigoId)


const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'},
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)


const CAPIPEPO_ATAQUES=[ 
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES=[    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'},]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)


mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src="${mokepon.foto}" alt=${mokepon.nombre}>
        </label>
        `

    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')

    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    unirseAlJuego()

}

function unirseAlJuego() {
    fetch("http://192.168.1.14:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId= respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {

    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
        return
    }
    
    sectionSeleccionarMascota.style.display = 'none'
    selecionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function selecionarMokepon(mascotaJugador) {
    fetch(`http://192.168.1.14:8080/mokepon/${jugadorId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
        ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)

}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepones = `
        <button  id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepones
    })

    botonTierra = document.getElementById('boton-tierra')
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background ='#df5678'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background ='#df5678'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background ='#df5678'
                boton.disabled = true

            }
            if (ataqueJugador.length === 5){
            enviarAtaques()
            }
        })
    })
}


function enviarAtaques() {
    fetch(`http://192.168.1.14:8080/mokepon/${jugadorId}/ataques`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    .then(function(res) {
        if (res.ok) {
            intervaloAtaques = setInterval(obtenerAtaques, 500)
        }
    })
}

function obtenerAtaques() {
    if (!enemigoId) {
        clearInterval(intervaloAtaques)
        return
    }

    fetch(`http://192.168.1.14:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res) {
        if (res.ok) {
            return res.json()
        }
        throw new Error("No se pudieron obtener los ataques")
    })
    .then(function({ ataques }) {
        if (ataques.length === 5) {
            clearInterval(intervaloAtaques)
            ataqueEnemigo = ataques
            combate()
        }
    })
    .catch(function(error) {
        console.error(error)
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }

    iniciarPelea()
}

function iniciarPelea() {
    if(ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }

    }

    revisarVidas()
}

function revisarVidas() {
    if(victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICIDADES! Ganaste :D")
    } else {
        crearMensajeFinal("Lo siento, perdiste :c")

    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

    sectionMensajes.innerHTML = resultadoFinal

    sectionBotonReiniciar.style.display = 'flex'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadx
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidady
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x , mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
    
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.14:8080/mokepon/${jugadorId}/posicion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ x, y })
    })
    .then(function(res) {
        if (!res.ok) return
        
        return res.json()
    })
    .then(function(datos) {
        if (!datos || !Array.isArray(datos.enemigos)) return

        mokeponesEnemigos = datos.enemigos
            .filter(function(enemigo) {
                return enemigo.mokepon
            })
            .map(function(enemigo) {
                const nombre = enemigo.mokepon.nombre
                let mokeponEnemigo

                if (nombre === "Hipodoge") {
                    mokeponEnemigo = new Mokepon(
                        nombre,
                        "./assets/mokepons_mokepon_hipodoge_attack.png",
                        5,
                        "./assets/hipodoge.png",
                        enemigo.id
                    )
                } else if (nombre === "Capipepo") {
                    mokeponEnemigo = new Mokepon(
                        nombre,
                        "./assets/mokepons_mokepon_capipepo_attack.png",
                        5,
                        "./assets/capipepo.png",
                        enemigo.id
                    )
                } else if (nombre === "Ratigueya") {
                    mokeponEnemigo = new Mokepon(
                        nombre,
                        "./assets/mokepons_mokepon_ratigueya_attack.png",
                        5,
                        "./assets/ratigueya.png",
                        enemigo.id
                    )
                }

                if (mokeponEnemigo) {
                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y
                }

                return mokeponEnemigo
            })
            .filter(Boolean)
    })
    .catch(function(error) {
        console.error("Error al actualizar los enemigos:", error)
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadx = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadx = - 5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidady = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidady = - 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadx = 0
    mascotaJugadorObjeto.velocidady = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'w':
            moverArriba()
            break
        case 's':
            moverAbajo()
            break
        case 'a':
            moverIzquierda()
            break
        case 'd':
            moverDerecha()
            break
        default:
            break

    }  
}

function iniciarMapa(){

    mascotaJugadorObjeto = optenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function optenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
        return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)