  //Palabras a divinar por la persona
  const palabras = [
    "guatemala",
    "pc",
    "marcha",
    "perito",
    "perro",
    "hola",
    "kirito",
    "Quinto",
    "monitor",
    "fabriccio",
    "for",
    "function",
    "mama",
    "computadora",
    "pez",
    "visual",
  ];

  //Declaracion de variebles
  let palabraSeleccionada = ""; // Almacena la palabra que se debe adivinar
  let letrasUsadas = []; //sive para tener un registro de las palabras que la persona a usado
  let vidas = 7; // Número de vidas iniciales del jugador

  // Función para seleccionar una palabra aleatoria del arreglo "palabras"
  function seleccionarPalabra() {
     // Utiliza Math.random() para obtener un número decimal aleatorio entre 0 y 1,
    // luego multiplica este número por la longitud del arreglo "palabras" para obtener un índice aleatorio.
    // Math.floor() redondea el índice hacia abajo para asegurar que sea un número entero válido.
    // Luego, se accede a la palabra correspondiente en el arreglo y se convierte a minúsculas.    
    return palabras[
      Math.floor(Math.random() * palabras.length)
    ].toLowerCase();
  }

  // Función para mostrar la palabra ocultando letras no adivinadas
  function mostrarPalabra(palabra, letrasAdivinadas) {
    // Inicializa una cadena vacía llamada "palabraMostrada" para construir la representación visible de la palabra.
    let palabraMostrada = "";
    // Itera a través de cada letra en la "palabra" original.
    for (let letra of palabra) {
      // Comprueba si la letra actual está en el arreglo de "letrasAdivinadas".
      if (letrasAdivinadas.includes(letra)) {
        // Si la letra está adivinada, se agrega al "palabraMostrada".
        palabraMostrada += letra;
      } else {
         // Si la letra no está adivinada, se agrega un guión bajo seguido de un espacio al "palabraMostrada".
        palabraMostrada += "_ ";
      }
    }
    // Retorna la "palabraMostrada" que contiene las letras adivinadas y guiones bajos para las no adivinadas.
    return palabraMostrada;
  }

  // Actualizar la función jugar para manejar las vidas restantes
  function jugar(letra) {
    // Comprueba si la letra ya ha sido utilizada
    if (letrasUsadas.includes(letra)) {
      alert("Ya usaste esta letra, ¡intenta otra!");
      return;
    }

    // Registra la letra utilizada
    letrasUsadas.push(letra);

    // Comprueba si la letra está en la palabra a adivinar
    if (palabraSeleccionada.includes(letra)) {
      const palabraMostrada = mostrarPalabra(
        palabraSeleccionada,
        letrasUsadas
      );
      // Actualiza la pantalla mostrando la palabra con letras adivinadas
      document.getElementById("palabra").textContent = palabraMostrada;

      // Comprueba si el jugador ha adivinado toda la palabra
      if (palabraMostrada === palabraSeleccionada) {
        alert("Muy bien Ganasteeeeeeeeeeeeeeeee    :) ");
        reiniciarJuego();
      }
    } else {
      // Reduce la cantidad de vidas disponibles
      vidas--;
      dibujarAhorcado(); // Llama a la función para dibujar el ahorcado
      document.getElementById("letrasUsadas").textContent =
        letrasUsadas.join(" "); // Muestra las letras utilizadas
      document.getElementById("vidasValor").textContent = vidas; // Actualizar el valor de las vidas

      // Comprueba si el jugador ha perdido todas las vidas
      if (vidas === 0) {
        alert(`Perdiste La palabra era: "${palabraSeleccionada}".`);
        dibujarAhorcado(); // Vuelve a dibujar el ahorcado para mostrar el estado final
        reiniciarJuego(); // Reinicia el juego
      }
    }
  }

  // Función para dibujar el ahorcado
  function dibujarAhorcado() {
    // Obtiene el elemento <canvas> del documento HTML con el ID "canvas"
    const canvas = document.getElementById("canvas");
    // Obtiene el contexto de dibujo en 2D del <canvas>
    const ctx = canvas.getContext("2d");

    // Limpia el canvas
    // Limpia el contenido previo del <canvas>
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Establece el color del trazo en negro (#000)
    ctx.strokeStyle = "#000"; // Color del trazo
    // Establece el ancho del trazo en 4 píxeles
    ctx.lineWidth = 4; // Ancho del trazo

    // Dibuja el ahorcado condicionalmente según las vidas restantes (vidas)

    // Poste vertical
    if (vidas < 7) {
      ctx.beginPath();// es una instrucción que se utiliza en el contexto de un elemento <canvas>
      ctx.moveTo(100, 50); // Mueve el punto de inicio
      ctx.lineTo(100, 150); // Dibuja una línea vertical
      ctx.stroke(); // Realiza el trazo
    }

    // Viga horizontal
    if (vidas < 6) {
      ctx.beginPath();
      ctx.moveTo(100, 50); // Mueve el punto de inicio
      ctx.lineTo(150, 50); // Dibuja una línea horizontal
      ctx.stroke(); // Realiza el trazo
    }

    // Cuerda
    if (vidas < 5) {
      ctx.beginPath();
      ctx.moveTo(150, 50); // Mueve el punto de inicio
      ctx.lineTo(150, 80); // Dibuja una línea vertical
      ctx.stroke(); // Realiza el trazo
    }

    // Cabeza
    if (vidas < 4) {
      ctx.beginPath();
      ctx.arc(150, 95, 15, 0, Math.PI * 2); // Dibuja un círculo (cabeza)
      ctx.stroke(); // Realiza el trazo
    }
    // Cuerpo
    if (vidas < 3) {
      ctx.beginPath();
      ctx.moveTo(150, 110); // Mueve el punto de inicio
      ctx.lineTo(150, 160); // Dibuja una línea vertical
      ctx.stroke(); // Realiza el trazo
    }

    // Brazos
    if (vidas < 3) {
      ctx.beginPath();
      ctx.moveTo(140, 130); // Mueve el punto de inicio (brazo izquierdo)
      ctx.lineTo(160, 130); // Dibuja una línea (brazo derecho)
      ctx.stroke(); // Realiza el trazo
    }

    // Pierna izquierda
    if (vidas < 2) {
      ctx.beginPath();
      ctx.moveTo(150, 160); // Mueve el punto de inicio
      ctx.lineTo(140, 180); // Dibuja una línea
      ctx.stroke(); // Realiza el trazo
    }

    // Pierna derecha
    if (vidas < 1) {
      ctx.beginPath();
      ctx.moveTo(150, 160); // Mueve el punto de inicio
      ctx.lineTo(160, 180); // Dibuja una línea
      ctx.stroke(); // Realiza el trazo
    }
  }

  function crearBotonesLetras() {
    // Obtener el elemento div donde se agregarán los botones de letras
    const botonesLetrasDiv = document.getElementById("botonesLetras");
    // Borrar cualquier contenido previo en el div
    botonesLetrasDiv.innerHTML = "";

    // El siguiente bucle crea botones para cada letra del alfabeto (a-z)
    for (let i = 97; i <= 122; i++) {
      // Convierte el valor ASCII en una letra minúscula
      const letra = String.fromCharCode(i);
      // Crea un elemento de botón en el documento
      const boton = document.createElement("button");
      // Establece el texto del botón como la letra actual
      boton.textContent = letra;
      // Agrega una clase CSS al botón llamada "boton-letra"
      boton.classList.add("boton-letra"); // Agrega una clase CSS al botón
      // Asigna un evento onclick al botón para que llame a la función "jugar" con la letra correspondiente
      boton.onclick = function () {
        jugar(letra);
        boton.disabled = true; // Deshabilita el botón después de hacer clic en él
      };
      // Agrega el botón al elemento div que contiene los botones de letras
      botonesLetrasDiv.appendChild(boton);
    }
  }

  function adivinarPalabra() {
    // Obtener el elemento de entrada de texto para adivinar la palabra
    const inputAdivinar = document.getElementById("inputAdivinar");
    // Obtener el valor ingresado en el input y convertirlo a minúsculas
    const valor = inputAdivinar.value.toLowerCase();

    // Comparar el valor ingresado con la palabra seleccionada
    if (valor === palabraSeleccionada) {
      // Si el valor coincide con la palabra seleccionada, muestra un mensaje de felicitación
      alert("¡Felicidades! ¡GANASTE WIIIIIIIIIIII!");
      // Reiniciar el juego para jugar de nuevo
      reiniciarJuego();
      return;
    } else {
      // Si el valor no coincide con la palabra, muestra un mensaje de error
      alert("¡Incorrecto! La Cantaste");
      // Borra el contenido del input para que el jugador pueda intentar de nuevo
      inputAdivinar.value = "";
    }
  }

  function reiniciarJuego() {
    // Seleccionar una nueva palabra aleatoria del arreglo 'palabras'
    palabraSeleccionada = seleccionarPalabra();
    // Reiniciar el registro de letras usadas
    letrasUsadas = [];
    // Restablecer el número de vidas a 7 (valor inicial)
    vidas = 7; // Restablecer las vidas a 7
    // Actualizar el valor de las vidas en el elemento HTML con id "vidasValor"
    document.getElementById("vidasValor").textContent = vidas; // Actualizar el valor de las vidas

    // Mostrar la nueva palabra ocultando letras no adivinadas
    document.getElementById("palabra").textContent = mostrarPalabra(
      palabraSeleccionada,
      letrasUsadas
    );
    // Reiniciar el registro de letras usadas en el elemento HTML con id "letrasUsadas"
    document.getElementById("letrasUsadas").textContent = "";
    // Dibujar el ahorcado inicial en el canvas
    dibujarAhorcado();
    // Crear nuevamente los botones de letras
    crearBotonesLetras();
  }

  // Inicializar el juego al cargar la página
  window.onload = function () {
    reiniciarJuego(); //Reinicia el juego
    crearBotonesLetras(); //Crea los botones
  };
