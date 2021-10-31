$(document).ready(function () {
    




    $(".info-overlay button").click(function () {

        $(".info-overlay").fadeOut(600);
    });

    // preparing user name 
    $(".user-name button").on("click", function () {


        if ($(this).siblings("input").val() != "") {

            $(this).parent().hide();
            $(this).parent().siblings(".name-parent").fadeIn().find(".name-container").children("div").text($(this).siblings("input").val());
        } else if ($(this).siblings("input").val() != /A-z0-9/) {
            $(this).parent().hide();
            $(this).parent().siblings(".name-parent").fadeIn().find(".name-container").children("div").text($(this).attr("customName"));
        }
        if ($(".player-two button").is(":hidden") && $(".player-one button").is(":hidden")) {
            $(".container .first").css({ pointerEvents: "painted" });
            $(".informaion").fadeIn(600).delay(1500).fadeOut(600);
            $(".game-start").get(0).play();
        }

    });













    var container = $(".container div").length;

    //add dynamic ID

    for (z = 0; z < container; z++) {


        if (($(".container div").eq(z).index()) < 7) {

            $(".container div").eq(z).attr("custom-y", (z + 1));
            $(".container div").eq(z).attr("custom-x", (Math.floor((z / 7)) + 1));



        } else {

            $(".container div").eq(z).attr("custom-y", ((z % 7) + 1));

            $(".container div").eq(z).attr("custom-x", (Math.floor((z / 7)) + 1));

        }
    }

    

// show result section function 

    function showwin(){
    $(".result-parent").fadeIn();
    
    if (coin == "red") {
        $(".result span").text($(".name-player-one").text()).css({ color: "red" });
    } else if (coin == "blue") {

        $(".result span").text($(".name-player-two").text()).css({ color: "blue" });

    }
    $(".win-one").delay(500).get(0).play();
    setTimeout(function () {

        $(".win-two").get(0).play();
    }, 1200);
}



    var coin = "blue"
    $(".first").on("click", function () {


        $(".coin-enter").get(0).pause();
        $(".coin-enter").get(0).currentTime = 0;
        $(".coin-enter").get(0).play();

        if (coin == "blue") {
            coin = "red";
            $(".name-player-one").css({ border: "none" });
            $(".name-player-two").css({ border: "3px solid" });

        } else {
            coin = "blue";
            $(".name-player-one").css({ border: "3px solid" });
            $(".name-player-two").css({ border: "none" });
        }

        var i = $(this).index();
        var currentActive;
        for (; i < container; i += 7) {

            if ($(".container div").eq(i).hasClass("ready")) {

                currentActive = $(".container div").eq(i);
                $(".container div").eq(i).append("<span class='" + coin + "'></span>").hide().fadeIn();
                $(".container div").eq(i).removeClass("ready").addClass(coin + "-div");
                $(".container div").eq(i - 7).addClass("ready");

            }


            if ($(this).hasClass("ready")) {
                $(this).removeClass("ready");
                $(this).children(".fa-arrow-down").remove();
                $(this).append('<i class="fas fa-hand-paper"></i>');
                $(this).css({ pointerEvents: "none" })
            }

        }

        var ey = currentActive.attr("custom-y"),
            ex = currentActive.attr("custom-x");

        var xArr = [],
            yArr = [],
            wArrOne = [],
            wArrTwo = [],
            s;
        // loop to add the column arry and the row arry to use it in check
        for (s = 0; s < container; s++) {

            if (($("[custom-y = '" + ey + "']").eq(s).index()) > -1 &&
                ($("[custom-x = '" + ex + "']").eq(s).index()) > -1) {

                yArr.push($("[custom-y = '" + ey + "']").eq(s).index());
                xArr.push($("[custom-x = '" + ex + "']").eq(s).index());
            }

        }
        // loop to add the warb one (to left )arry to use it in chick
        for (let o = 1; o <= 5; o++) {
            let theOnePlusElement = $("[custom-y = '" + (parseInt(ey) + o) + "'][custom-x = '" + (parseInt(ex) + o) + "']").index();
            let theOneMinusElement = $("[custom-y = '" + (parseInt(ey) - o) + "'][custom-x = '" + (parseInt(ex) - o) + "']").index();


            if (theOnePlusElement > -1) {

                wArrOne.push(theOnePlusElement)
            }
            if ((theOneMinusElement) > -1) {

                wArrOne.push(theOneMinusElement);
            }
        }
        wArrOne.push($("[custom-y = '" + ey + "'][custom-x = '" + ex + "']").index()); // to Add The currentActive to the arry .

        // to arrange the warb arry .
        wArrOne.sort(function (a, b) {
            return a - b;
        });





        for (let r = 1; r <= 5; r++) {
            let theTowPlusElement = $("[custom-y = '" + (parseInt(ey) + r) + "'][custom-x = '" + (parseInt(ex) - r) + "']").index();
            let theTowMinusElement = $("[custom-y = '" + (parseInt(ey) - r) + "'][custom-x = '" + (parseInt(ex) + r) + "']").index();


            if (theTowPlusElement > -1) {

                wArrTwo.push(theTowPlusElement)
            }
            if ((theTowMinusElement) > -1) {

                wArrTwo.push(theTowMinusElement);
            }
        }
        wArrTwo.push($("[custom-y = '" + ey + "'][custom-x = '" + ex + "']").index()); // to Add The currentActive to the arry .

        // to arrange the warb arry .
        wArrTwo.sort(function (a, b) {
            return a - b;
        });










        var resultX = [],
            resultY = [],
            resultWarbOne = [],
            resultWarbTwo = [],
            yy = 0,
            xx = 0,
            wOne = 0,
            wTwo = 0,
            q;
        // loop to set array x and y by using coin ,
        for (q = 0; q < 7; q++) {

            if ($(".container div:eq(" + yArr[q] + ")").children("span").hasClass("red")) {
                resultY.push("red");
            } else if ($(".container div:eq(" + yArr[q] + ")").children("span").hasClass("blue")) {

                resultY.push("blue")
            } else {
                resultY.push("empty")
            }

            if ($(".container div:eq(" + xArr[q] + ")").children("span").hasClass("red")) {
                resultX.push("red")
            } else if ($(".container div:eq(" + xArr[q] + ")").children("span").hasClass("blue")) {

                resultX.push("blue")
            } else {
                resultX.push("empty")
            }
        }


        // loop to set wOne by using coin ,

        for (let w = 0; w < wArrOne.length; w++) {
            if ($(".container div:eq(" + wArrOne[w] + ")").children("span").hasClass("red")) {
                resultWarbOne.push("red");
            } else if ($(".container div:eq(" + wArrOne[w] + ")").children("span").hasClass("blue")) {

                resultWarbOne.push("blue");
            } else {
                resultWarbOne.push("empty");
            }
        }

                // loop to set wTwo by using coin ,

        for (let u = 0; u < wArrTwo.length; u++) {
            if ($(".container div:eq(" + wArrTwo[u] + ")").children("span").hasClass("red")) {
                resultWarbTwo.push("red");
            } else if ($(".container div:eq(" + wArrTwo[u] + ")").children("span").hasClass("blue")) {

                resultWarbTwo.push("blue");
            } else {
                resultWarbTwo.push("empty");
            }
        }


        
        // checking section 
        
        // checking the vertical row
            for (let t = 0; t < resultY.length; t++) {

                if (resultY[t] == coin) {
    
                    yy++
    
                    if (yy === 4) {
                        for (var p = 0; p < 7; p++) {
    
                            (  $(".container div:eq(" + yArr[p] + ")").css({ backgroundColor: "#ffff00", borderColor: coin }))
                            showwin()
                        }
    
                    }
                } else {
                    yy = 0 ;
                }
    
            }
        
        

            // checking the horizontal row  
        for (let j = 0; j < resultX.length; j++) {

            if (resultX[j] == coin) {

                xx++

                if (xx === 4) {
                    for (var p = 0; p < 7; p++) {

                    ( $(".container div:eq(" + xArr[p] + ")").css({ backgroundColor: "#ffff00", borderColor: coin }))
                    showwin()
                    }

                }
            } else {
                xx = 0;
            }
        }
    

    // checking the curved Row One 
        for (let m = 0; m < resultWarbOne.length; m++) {

            if (resultWarbOne[m] == coin) {

                wOne++

                if (wOne === 4) {
                    for (var p = 0; p < 7; p++) {

                        ($(".container div:eq(" + wArrOne[p] + ")").css({ backgroundColor: "#ffff00", borderColor: coin }))
                        showwin()
                    }

                }
            } else {
                wOne = 0;
            }
        }
        // checking the curved Row Two
        for (let n = 0; n < resultWarbTwo.length; n++) {

            if (resultWarbTwo[n] == coin) {
                wTwo++
                if (wTwo === 4) {
                    for (var p = 0; p < 7; p++) {
                        ($(".container div:eq(" + wArrTwo[p] + ")").css({ backgroundColor: "#ffff00", borderColor: coin }))
                        showwin()
                    }
                }
            } else {
                wTwo = 0;
            }
        }
    });

    // cilck on result button to fade the result section and ccalculatr the result
    
    $(".result button").on("click", function () {

        // fade out the result section to play Agin 

        $(".result-parent").fadeOut();
        $(".container div").removeClass("ready");
        $(".container div:not(.first)").empty().css({
            border: " 1px solid black",
            backgroundColor: "white",
            boxShadow: " 0 0px 5px"
        });
        $(".container div[custom-x='7']").addClass("ready");
        if ($(".container div i").hasClass("fa-hand-paper")) {

            $(".container div.first").empty().append('<i class="fas fa-arrow-down"></i>');
            $(".container div.first").css({
                pointerEvents: "painted",
                cursor: "pointer"

            })
        }


        // Calculate the score


        var redScore = parseInt($(".red-counter").text()) + 1 ,
        blueScore = parseInt($(".blue-counter").text()) + 1 ;
        if (coin == "red") {
            $(".red-counter").text(redScore);
        } else if (coin == "blue") {
    
            $(".blue-counter").text(blueScore);
    
        }
    });
});







/*

1 - loop for the new element's row and column to get tow arrys . by x and y .  (ok)
2 - loop in these arrys to calc (power points) in these by using var .
3 - if the power points == 4 => A - transform the color of the span .
                                b -  display block (the xxxx win )  .

*/