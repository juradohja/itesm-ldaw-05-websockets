function showToast(msg) {
  console.log("El mensaje es: " + msg);
  $.toast({
    text : msg,
    position : "bottom-right"
  });
}

function newPlayerToast(name) {
  var msg = name + " se ha unido al juego.";
  $.toast({
    heading : "Nuevo jugador",
    text : msg,
    position : "bottom-right",
    showHideTransition : "slide",
    loader : false
  })
}

function welcomeToast(name) {
  var msg = "¡Bienvenido al juego, " + name + "!";
  $.toast({
    heading : "Bienvenido",
    text : msg,
    position : "bottom-right",
    showHideTransition : "slide",
    loader : false
  })
}

function playerDisconnectToast(name){
  var msg = name + " se ha desconectado.";
  $.toast({
    heading : "Jugador desconectado",
    text : msg,
    position : "bottom-right",
    showHideTransition : "slide",
    loader : false
  })
}

function gameStartsToast(letter){
  var msg = "Llena los campos para cada categoría. Cuando termines, presiona \"¡Basta!\". La letra es " + letter + ".";
  $.toast({
    heading : "Corre tiempo: " + letter,
    text : msg,
    position : "bottom-right",
    showHideTransition : "slide",
    loader : false,
    bgColor : "#609630",
    hideAfter : 5000
  })
}

function stopToast(letter){
  var msg = "El juego ha terminado.";
  $.toast({
    heading : "¡BASTA!",
    text : msg,
    position : "mid-center",
    showHideTransition : "fade",
    loader : false,
    bgColor : "#963030",
    hideAfter : 3000,
    textAlign : 'center'
  })
}
