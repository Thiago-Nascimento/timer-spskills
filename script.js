let elementoTempo;
let botaoIniciar = document.getElementById("botao-iniciar")
let botaoPausar = document.getElementById("botao-pausar")

const modalidade = prompt("Digite qual é a modalidade:")
const modulo = prompt("Digite qual é o módulo/prova:")
let tempoGlobal = prompt("Quanto tempo de prova: (Formato 01:00:00 - h:mm:ss)")

let idTimer;

const renderizar = () => {
    elementoTempo = document.getElementById("tempo")
    let elementoModulo = document.getElementById("modulo")
    let elementoModalidade = document.getElementById("modalidade")

    botaoPausar.classList.add("desabilitado")

    elementoTempo.innerText = tempoGlobal
    elementoModulo.innerText = modulo
    elementoModalidade.innerText = modalidade
}

const tocarAlarme = () => {
    const alarme = new Audio('sounds/alarm.mp3')
    alarme.play()
}

const pausarTimer = () => {
    if (idTimer) {
        clearInterval(idTimer)
        idTimer = null
        console.log("Pause");  
        
        botaoIniciar.classList.remove("desabilitado")
        botaoPausar.classList.add("desabilitado")
    }
}

const iniciarTimer = (tempo_input) => {
    console.log("Tempo: ", tempo_input);
    
    const [h, m, s] = tempo_input.split(':').map(Number)

    let segundos = s
    let minutos = m
    let horas = h

    botaoPausar.classList.remove("desabilitado")
    botaoIniciar.classList.add("desabilitado")

    if (!idTimer) {
        
        idTimer = setInterval(() => {
            // Decrementa os segundos
            if (segundos > 0) {
                segundos--;
            } else {
                // Se os segundos chegarem a 0, decrementa os minutos
                if (minutos > 0) {
                    minutos--;
                    segundos = 59;
                } else {
                    // Se os minutos chegarem a 0, decrementa as horas
                    if (horas > 0) {
                        horas--;
                        minutos = 59;
                        segundos = 59;
                    } else {
                        // Se horas, minutos e segundos chegarem a 0, para o timer
                        clearInterval(idTimer);
                        console.log("Tempo esgotado!");
                        tocarAlarme()
                    }
                }
            }
    
            // Exibe o tempo atual no console ou atualiza o DOM
            console.log(
                `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
            );

            tempoGlobal = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
            elementoTempo.innerText = tempoGlobal
    
        }, 1000); // Define o intervalo para 1 segundo
    }

    
    
}

