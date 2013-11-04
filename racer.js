$(document).ready(function(){

  $(document).on("keyup", function(event) {
    // player 1
    if (event.which === 80) {
      mover("player1")
      if (winner("player1")) {
        // do stuff
      }

      // player 2
    } else if (event.which === 81) {
      mover("player2")
      if (winner("player2")) {
        // do stuff
      }
    }
  });



  function mover(player) {
    if (player === "player1" && !($("#" + player + "_strip > td").filter(":last").is(".active"))) {
      $("#player1_strip > td.active").removeClass("active").next("td").addClass("active");
    } else if (player === "player2" && !($("#" + player + "_strip > td").filter(":last").is(".active"))) {
      $("#player2_strip > td.active").removeClass("active").next("td").addClass("active");
    }
  }

  function winner(player) {

    if ($("#" + player + "_strip td").filter(":last").is(".active")) {
      $("h1").empty()
      $( "body").css( "background", "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)" );
      $("body").append("<h1>" + player + " is the glorious winnerrrr!!!1111</h1>");
    }
  }





})