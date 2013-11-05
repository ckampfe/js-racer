var wonYet = false;
$(document).ready(function(){
  $(document).on("keyup", function(event) {
    if (wonYet !== true) {
      switch (event.which) {
        case 80:
          turn("player1");
        case 81:
          turn("player2");
      }
    }

    function turn(player) {
      mover(player);
      if (winnerCheck(player) === true) {
        wonYet = true;
        winnerDisplay(player);
      }
    }
  });
});

function mover(player) {
  if (!($("#" + player + "_strip > td").filter(":last").is(".active"))) {
    $("#" + player + "_strip > td.active").removeClass("active").next("td").addClass("active");
  }
}

function winnerCheck(player) {
  if ($("#" + player + "_strip td").filter(":last").is(".active")) {
    return true;
  }
}

function winnerDisplay(player) {
  $("h1").empty();
  $( "body").css( "background", "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)" );
  $("body").append("<h1>" + player + " is the glorious winnerCheckrrr!!!1111</h1>");
}
