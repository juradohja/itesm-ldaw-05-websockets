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
