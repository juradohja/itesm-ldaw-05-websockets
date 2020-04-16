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
    if(data.gameRunning){
      prepareGame(data.letter);
      pregameScreenOn = false;
    } else {
      updateCards(data.players);
      pregameScreenOn = true;
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
    prepareGame(data.letter);
  })

  // Game stops
  window.socket.on('stopGame', function () {
    stopToast();
    evaluateAnswers();
    $("#btnStop").hide();
    $("#btnRestart").show();
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

function prepareGame(ltr){
  var letter = ltr;
  $("#letter").text(letter);
  $("#pregameScreen").hide();
  $("#gameScreen").show();
  $("#btnRestart").hide();
  $("#btnStop").show();
  gameStartsToast(letter);

  $("input[type='text']").prop("disabled", false);
  $("input[type='text']").removeClass("is-valid");
  $("input[type='text']").removeClass("is-invalid");
  $("input[type='text']").val("");
}

function evaluateAnswers(){
  $("input[type='text']").prop("disabled", true);
  // Nombre
  if($("#inputName").val() !== ""){
    $("#inputName").addClass("is-valid");
  } else { $("#inputName").addClass("is-invalid"); }
  // Apellido
  if($("#inputSurname").val() !== ""){
    $("#inputSurname").addClass("is-valid");
  } else { $("#inputSurname").addClass("is-invalid"); }
  // Animal
  if($("#inputAnimal").val() !== ""){
    $("#inputAnimal").addClass("is-valid");
  } else { $("#inputAnimal").addClass("is-invalid"); }
  // Ciudad o País
  if($("#inputCoC").val() !== ""){
    $("#inputCoC").addClass("is-valid");
  } else { $("#inputCoC").addClass("is-invalid"); }
  // Color
  if($("#inputColor").val() !== ""){
    $("#inputColor").addClass("is-valid");
  } else { $("#inputColor").addClass("is-invalid"); }
  // Flor o Fruto
  if($("#inputFoF").val() !== ""){
    $("#inputFoF").addClass("is-valid");
  } else { $("#inputFoF").addClass("is-invalid"); }
  // Marca
  if($("#inputBrand").val() !== ""){
    $("#inputBrand").addClass("is-valid");
  } else { $("#inputBrand").addClass("is-invalid"); }
  // Película o Serie
  if($("#inputMoTV").val() !== ""){
    $("#inputMoTV").addClass("is-valid");
  } else { $("#inputMoTV").addClass("is-invalid"); }

}
