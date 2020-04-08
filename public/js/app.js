window.socket = null;
var player = "";

function connectToSocketIo() {
  let server = window.location.protocol + "//" + window.location.host;
  window.socket = io.connect(server);
  window.socket.on('welcome', function(data) {
    player = data.name;
    welcomeToast(player);
    updateCards(data.players);
  })
  window.socket.on('newPlayer', function(data) {
    var players = data.players;
    var newPlayer = players[players.length - 1];
    newPlayerToast(newPlayer);
    updateCards(data.players);
  });
  window.socket.on('playerDisconnect', function (data) {
    var playerName = data.name;
    playerDisconnectToast(playerName);
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
    var color = p === player ? "bg-primary" : "bg-secondary";
    $("#playerCards").append("<div class='col-2 mb-4'>" +
      "<div class='card text-white text-center " + color + "'>" +
      "<div class='card-body'>" + p + "</div>" +
      "</div>" +
      "</div>")
  });
}

function startGame(){
  window.socket.emit("startGame");
}
