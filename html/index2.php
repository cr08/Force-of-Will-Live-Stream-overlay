<!DOCTYPE html>
<html lang="en" class="swup-enabled"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            
                <meta name="description" content="Force of Will Database and Deck Builder">
                <meta name="keywords" content="Force of Will, FoW, FOW, Trading Card Game, Database, Deck Builder, fowdb, Card Database, fow db, fow cards, fow decks">
                
                    <meta property="og:title" content="Force of Wind">

                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>FoWind - Apollon, the Third Olympian</title>
                <link rel="shortcut icon" type="image/png" href="./static/img/wind.png">
    
                    <script src="./static/js/jquery.min.js" crossorigin="anonymous"></script>
                    <script type="text/javascript">
                        
                            let FOWDB_IS_MOBILE = false;
                        
                    </script>
                    <script defer="" src="./static/js/swup/swup.min.js"></script>
                    <script defer="" src="./static/js/swup/swupscript.js"></script>
                    <script type="text/javascript" language="javascript">
                        let currentTimestamp = Date.now();
                        var pageTime;
                        pageTime = Math.floor(currentTimestamp/1000);


                        if(typeof(EventSource) !== "undefined") {
                            var source=new EventSource("https://ferdonia.tv/fow-overlay/sse/sse.php");
                            source.onmessage = function(event) {
                                var msg = $.parseJSON(event.data);
				console.log(msg);
				console.log(msg[5]);

                            if(msg[5] > pageTime) {

                                if(msg[1] == "XYZ-1234") {

                                    console.log("OBS_PUSH: Push data new. Pushing to card back/blank slate.");
                                    swup.loadPage({url: "./index.html"});

                                } else {

                                    console.log("OBS_PUSH: Preloading new card page...");
                                    document.getElementById('hidden_img').src = "./static/img/cards/" + msg[2];
                                    $(".cachedimage").on("load", function(){
                                        console.log("OBS_PUSH: New card image cached, loading new page...")
                                        swup.loadPage({url: "./index2.php?card=" + msg[1]});
                                    });

                                }
                                pageTime = msg[5];
                                console.log("OBS_PUSH: pageTime updated");

                            } else {
                                console.log("OBS_PUSH: Push data old. We're staying here.");
                            }
                        }
                        } else {
                            alert("Sorry, your browser does not support server-sent events.");
                        }
                    </script>
                    <script src="./static/js/base.js" type="text/javascript"></script>
                
    <script src="./static/js/bootstrap/bootstrap.js" type="text/javascript"></script>
    <script src="./static/js/bootstrap/mdb.js" type="text/javascript"></script><style type="text/css">/* Chart.js */
@-webkit-keyframes chartjs-render-animation{from{opacity:0.99}to{opacity:1}}@keyframes chartjs-render-animation{from{opacity:0.99}to{opacity:1}}.chartjs-render-monitor{-webkit-animation:chartjs-render-animation 0.001s;animation:chartjs-render-animation 0.001s;}</style>
    <script src="./static/js/database_base.js" type="text/javascript"></script>

    <script type="text/javascript" src="./static/js/view_card.js"></script>

                    <link rel="stylesheet" id="bootstrap" href="./static/css/bootstrap/bootstrap.css">
                    <link rel="stylesheet" href="./static/css/view_card_overlay.css">
                    <link rel="stylesheet" href="./static/css/bootstrap/mdb.css">
                    <link rel="stylesheet" href="./static/css/base.css">
                
    <link rel="stylesheet" href="./static/css/database_base.css">

        <body aria-busy="true">
            <img style="display:none" id="hidden_img" src="./static/img/fow_cardback.png" class="cachedimage">
            
<?php

$json = file_get_contents("./sse/data.json"	);
$data = json_decode($json);
$html = base64_decode($data[4]);
?>

<div class="card-container">
    <main id="swup" data-swup="0">
        <div id="swup-card-img card_img_overlay" class="card-left-half card transition-flip center" style="background-color:transparent">
      <div class="front face" style="background-image:url('./static/img/cards/<?php echo $data[2] ?>')"></div>
      <div class="back face" style="background-image:url('./static/img/fow_cardback.png')"></div>
        </div>
    </main>

    <main id="swup" class="transition-fade" data-swup="1">
        <div id="swup-card-txt" class="card-right-half">
<?php echo $html; ?>
            </div>
            
        </div>
        </main>
        
</body></html>