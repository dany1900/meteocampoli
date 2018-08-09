<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

    <title>Radar Google Maps - Realizzazione Claudio Veronese</title>
    <style>
      html, body, #map-canvas {
        height: 100%;
        margin: 0px;
        padding: 0px
      }
	   
	.barra {
				height: 50px;
				background: #646464;
				opacity: 0.7;
				padding: 0;
				position:absolute;
				bottom: 0px;
				left: 0px;
				z-index: 2;
				width: 100% !important;
    }
	
	.agg {
  position: absolute;
  z-index: 2;
  right: 1%;
  color: #ffffff;
  bottom: 14px;
  display: inline-block;
  font-family: 'Lucida Grande', 'Lucida Sans Unicode', Helvetica, Arial, Verdana, sans-serif;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  text-shadow: 0 -1px 0 #333333;
}
	</style>
	
    <!--<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>-->
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCSN5zhH1YypRpNA2Ydc9415o-j-SkwGnY&sensor=false"></script>


<script type="text/javascript" src="http://www.vallemuricana.it/radar_overlay.js/radar_overlay.js"></script>
 
  </head>
  <body>
  <nav class="barra"></nav>
  
    <div id="map-canvas"></div>

	
	<div style="z-index: 2; left: 0px; position: absolute; bottom: 0px; padding: 0;"> 
	<a title="Home Page - Valle Muricana Meteo" onmouseup="window.open('http://www.vallemuricana.it')">
	<img src="/joomla2/css/logo_scritta2.png" style="width:270px;height:53px;cursor:pointer;position: absolute; bottom: 0px; padding: 0;"/></a></div>

	
	
	<div style="Z-INDEX: 2; LEFT: 25%; POSITION: absolute; TOP: 10px; visibility:visible; background: rgba(255, 255, 255, 0.8); box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); border-radius: 5px; padding:4px; opacity:0.8;">	
      <img src="/images/radar_montemidia_legenda.jpg" alt="scala pioggia" title="Intensit&agrave; precipitazioni - Legenda colori radar" style="cursor:help;">
	</div>

	
    <div style="Z-INDEX: 2; LEFT: 0px; POSITION: absolute; TOP: 55px; visibility:visible;">
	   <a href="javascript:location.reload()" title="Aggiorna radar" style="cursor:ponter;">
       <img src="/WD/wxwugraphs/images/refresh.png" width="35px" height="35px" alt="refresh">
       </a>
    </div>
	
	<div class="agg">
	  Ultimo aggiornamento: 27/11/2014 14:35  </div>
  </body>
</html>