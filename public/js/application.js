$(document).ready(function() {

  /* GAME */

  function Game() = {
    this.won = false;
  }

  /* game prototype */


  // check if game is over
  Game.prototype.gameOver? = function() {
    return this.won;
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

  Game.prototype.sendWinnerInfo = function(winner, time) {
    var players = { "player1": $( "#player1_strip" ).attr( "data-nick" ),
                    "player2": $( "#player2_strip" ).attr( "data-nick" )
    }

    $.post( "/winner", { players,
                         "winner": winner,
                         "time": time/1000,
                         "gameId": $( ".racer_table" ).attr( "data-game-id" ),
  }

  Game.prototype.editDom = function(response) {
    $( "#stats" ).html(reponse);
  }





  /* PLAYER */

  function Player(name) = {
    this.name = name;
  }

  /* player prototype */

  Player.prototype.mover = function() {

  }

  Player.prototype.last = function() {
    if ($("#" + this.name + "_strip > td").filter(":last").is(".active")) {
      return true;
    } else {

      return false;
    }
  }







});
