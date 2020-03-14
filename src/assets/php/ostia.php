<?php

$xml = simplexml_load_file("http://api.wunderground.com/weatherstation/WXCurrentObXML.asp?ID=IROMELID3");


?>


<html>

<link rel="stylesheet" media="all" href="http://meteocampoli.altervista.org/css/skin.css"/>

<link href='http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:400,300' rel='stylesheet' type='text/css'>



<link rel="stylesheet" media="all" href="http://meteocampoli.altervista.org/css/skin.css"/>


<script src="http://meteocampoli.altervista.org/refresh.js" type="text/javascript"></script>






<body>


				<div style="text-align: center"><h2><a href="http://www.vedetta.org/locations.php?view=9" target="_blank">Ostia (RM)</a></strong></li>



	<h4><?php echo($cut_string = substr($xml-> observation_time, 15 ,-5)); ?></h4>


            <h3><h8><?php echo($xml-> temp_c) ."&deg;";?></h8></h3>


				<h4>Umidita: <?php echo($xml-> relative_humidity); ?>%<br />


				Dew Point: <?php echo($xml-> dewpoint_c) ."&deg;";?><br />


				Pressione: <?php echo($xml-> pressure_mb); ?>	<br />


				Vento e dir: <?php echo($xml-> wind_dir). " - " . ($xml-> wind_mph); ?> kmh<br />


				Pioggia Oggi (cm): <?php echo($cut_string = substr($xml-> precip_today_metric, 0 ,-3)); ?><br />


				Rain Rate: <?php echo($xml-> precip_1hr_metric); ?>


            </h4>

</body>