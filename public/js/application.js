$(document).ready(function() {

  aGame = new Game($(".racer_table"));
  player1 = new Player($( "#player1_strip" ).attr( "data-nick" ), 1);
  player2 = new Player($( "#player2_strip" ).attr( "data-nick" ), 2);
  players = [player1, player2];


  /* GAME */

  function Game(el) {
    this.gameId = el.data("game-id");
  }

  /* game prototype */

  // is player at the last cell?
  Game.prototype.lastListen = function(player) {
    var thisGame = this
    $( document ).on("keyup", function( event ) {
      console.log("lastListen triggered");
      console.log(player);
      if ($("#player" + player.playerNumber + "_strip > td").filter( ":last" ).is( ".active" )) {
        $(document).unbind("keyup")
        thisGame.sendWinnerInfo(player.nick, 0);
        return true
      } else {
        return false;
      }
    });
  }

  // listen for keyup events
  Game.prototype.keypressListen = function() {
    $( document ).on("keyup", function( event ) {
      switch(event.which) {
        case 80:
          player1.move();
          break;
        case 81:
          player2.move();
          break;
      }
    });
  }

  // send game data to server
  Game.prototype.sendWinnerInfo = function(winner, time) {
    $.post( "/winner", { "players": { "player1": player1.nick,
                                      "player2": player2.nick
                                     },
                         "winner": winner,
                         "time": time/1000,
                         "gameId": $( ".racer_table" ).attr( "data-game-id" ),
                       }, this.editDom.bind(this));
  }

  // insert response into #stats
  Game.prototype.editDom = function(response) {
    $( "#stats" ).html(response);
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
  aGame.lastListen(player1);
  aGame.lastListen(player2);
});
