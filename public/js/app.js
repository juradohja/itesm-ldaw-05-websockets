window.socket = null;
var player = "";
var pregameScreenOn = true;

function connectToSocketIo() {
  let server = window.location.protocol + "//" + window.location.host;
  window.socket = io.connect(server);

  // Welcome
  window.socket.on('welcome', function(data) {
    player = data.name;
    $("#user").text(player);
    welcomeToast(player);
    if(pregameScreenOn){
      updateCards(data.players);
    }
  });

  // New Player Connected
  window.socket.on('newPlayer', function(data) {
    var players = data.players;
    var newPlayer = players[players.length - 1];
    newPlayerToast(newPlayer);
    if(pregameScreenOn){
      updateCards(data.players);
    }
  });

  // Player Disconnected
  window.socket.on('playerDisconnect', function (data) {
    var playerName = data.name;
    playerDisconnectToast(playerName);
    if(pregameScreenOn){
      updateCards(data.players);
    }
  });

  // Game starts
  window.socket.on('startGame', function (data) {
    console.log("starting game");
    var letter = data.letter;
    $("#letter").text(letter);
    $("#pregameScreen").hide();
    $("#gameScreen").show();
    gameStartsToast(letter);
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

function stopGame(){
  window.socket.emit("stopGame");
}
