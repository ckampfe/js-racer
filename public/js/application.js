$(document).ready(function() {

  /* GAME */

  function Game() = {
    this.won = false;
  }

  /* game prototype */

  // check if game is over
  Game.prototype.gameOver? = function() {
    return this.won; //true || false
  }

  // end game 
  Game.prototype.gameOver = function() {
    this.won = true;
  }

  // listen for keyup events
  Game.prototype.listen = function() {
    $( document ).on("keyup", function( event ) {
      switch(event.which) {
        case 80:
          mover("player1");
          break;
        case 81:
          mover("player2");
          break;
      }
    }
  }

  // send game data to server
  Game.prototype.sendWinnerInfo = function(winner, time) {
    var players = { "player1": $( "#player1_strip" ).attr( "data-nick" ),
                    "player2": $( "#player2_strip" ).attr( "data-nick" )
    }

    $.post( "/winner", { players,
                         "winner": winner,
                         "time": time/1000,
                         "gameId": $( ".racer_table" ).attr( "data-game-id" ),
                       }, this.editDom(response));
  }

  // insert response into #stats
  Game.prototype.editDom = function(response) {
    $( "#stats" ).html(reponse);
  }




  /* PLAYER */

  function Player(name) = {
    this.name = name;
  }

  /* player prototype */

  // move player
  Player.prototype.mover = function() {
    $("#" + this.name + "_strip > td.active".removeClass( "active" ).next( "td" ).addClass( "active" );
  }

  // is player at the last cell?
  Player.prototype.last = function() {
    if ($("#" + this.name + "_strip > td").filter( ":last" ).is( ".active" )) {
      return true;
    } else {
      return false;
    }
  }


});
