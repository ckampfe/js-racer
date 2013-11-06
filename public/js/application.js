$(document).ready(function() {

  aGame = new Game();
  player1 = new Player($( "#player1_strip" ).attr( "data-nick" ), 1);
  player2 = new Player($( "#player2_strip" ).attr( "data-nick" ), 2);
  players = [player1, player2];


  /* GAME */

  function Game() {
    this.won = false;
  }

  /* game prototype */

  // listen for keyup events
  Game.prototype.keypressListen = function() {
    $( document ).on("keyup", function( event ) {
      switch(event.which) {
        case 80:
          console.log("80 keypress");
          console.log(player1.playerNumber);
          player1.move();
          break;
        case 81:
          console.log("81 keypress");
          console.log(player2.playerNumber);
          player2.move();
          break;
      }
    });
  }

  // send game data to server
  Game.prototype.sendWinnerInfo = function(winner, time) {
    $.post( "/winner", { "players": { "player1": player1.nick,
                                      "player2": player1.nick 
                                     },
                         "winner": winner,
                         "time": time/1000,
                         "gameId": $( ".racer_table" ).attr( "data-game-id" ),
                       }, this.editDom(response));
  }

  // insert response into #stats
  Game.prototype.editDom = function(response) {
    $( "#stats" ).html(reponse);
  }

  // is player at the last cell?
  Game.prototype.lastListen = function(player) {
    if ($("#player" + player.playerNumber + "_strip > td").filter( ":last" ).is( ".active" )) {
      aGame.gameOver();
      return true;
    } else {
      return false;
    }
  }

  /* PLAYER */

  function Player(nick, playerNumber) {
    this.nick         = nick;
    this.playerNumber = playerNumber;
  }

  /* player prototype */

  // move player
  Player.prototype.move = function() {
    $( "#player" + this.playerNumber + "_strip > td.active" ).removeClass( "active" ).next( "td" ).addClass( "active" );
  }


  aGame.keypressListen();
  for (player of players) {
    aGame.lastListen(player);
  }
});

