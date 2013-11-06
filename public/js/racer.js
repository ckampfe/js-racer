var startTime = Date.now();
var wonYet = false;
$(document).ready(function(){
  $(document).on("keyup", function(event) {
    if (wonYet !== true) {
      switch (event.which) {
        case 80:
          mover("player1");
          break;
        case 81:
          mover("player2");
          break;
      }
    }
  });
});

function mover(player) {
  if (!($("#" + player + "_strip > td").filter(":last").is(".active"))) {
    $("#" + player + "_strip > td.active").removeClass("active").next("td").addClass("active");
  } else {
    wonYet = true;
    winnerDisplay(player);
    var winTime = Date.now() - startTime;
    sendWinnerInfo(player, winTime);
  }
}

function winnerCheck(player) {
  if ($("#" + player + "_strip td").filter(":last").is(".active")) { return true; }
}

function winnerDisplay(player) {
  $("h1").empty();
  $( "body").css( "background", "linear-gradient(to right, red, orange, yellow)" );
  $("body").append("<h1>" + player + " is the glorious winnerCheckrrr!!!1111</h1>");
}

function sendWinnerInfo(winner, time) {
 console.log(time); 
  $.post( "/winner",
          { "winner": winner,
            "time": time/1000,
            "player1": $("#player1_strip").attr("data-nick"),
            "player2": $("#player2_strip").attr("data-nick"),
            "gameId": $(".racer_table").attr("data-game-id") },
          function(response) {
            $("#stats").html(response);
          }
        )
}
