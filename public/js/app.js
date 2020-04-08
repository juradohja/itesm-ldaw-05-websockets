function showToast(msg) {
  console.log("El mensaje es: " + msg);
  $.toast({
    text : msg,
    position : "bottom-right"
  });
}

window.socket = null;
var player = "";

function connectToSocketIo() {
  let server = window.location.protocol + "//" + window.location.host;
  window.socket = io.connect(server);
  window.socket.on('welcome', function(data) {
    player = data.name;
    showToast("¡Bienvenido al juego, " + player + "!");
    updateCards(data.players);
  })
  window.socket.on('newPlayer', function(data) {
    var players = data.players;
    var newPlayer = players[players.length - 1];
    showToast(newPlayer + " se ha unido al juego.");
    updateCards(data.players);
  });
  window.socket.on('playerDisconnect', function (data) {
    var playerName = data.name;
    showToast(playerName + " se ha desconectado.");
    updateCards(data.players);
  })
}

function messageToServer(msg) {
  window.socket.emit('message-to-server', {message : msg})
}

$(function() {
  connectToSocketIo();
});

function updateCards(players) {
  $("#playerCards").html("");
  players.forEach(p => {
    var color = p === player ? "bg-success" : "bg-primary";
    $("#playerCards").append("<div class='card text-white " + color + " w-25 d-inline-block'>" +
      "<div class='card-body'>" + p + "</div>" +
      "</div>")
  });
}
