<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

    <title>Radar Precipitazioni Zoom </title>
    <style>
      html, body, #map-canvas {
        height: 100%;
        margin: 0px;
        padding: 0px
      }

	/*.barra {
				height: 50px;
				background: #646464;
				opacity: 0.7;
				padding: 0;
				position:absolute;
				bottom: 0px;
				left: 0px;
				z-index: 2;
				width: 100% !important;
    }*/

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



.rete_time {

				position:absolute;
				bottom: 23px;
				right: 7px;
				z-index: 3;
				font-family: 'Lucida Grande', 'Lucida Sans Unicode', Helvetica, Arial, Verdana, sans-serif;
				font-size: 16px;
				font-weight: bold;
				text-align: center;
				text-decoration: none;
				text-shadow: 0 -1px 0 #333333;
				color: #ffffff;
				cursor:pointer;
}

.rete_param {

				position:absolute;
				bottom: 2px;
				right: 7px;
				z-index: 3;
				font-family: 'Lucida Grande', 'Lucida Sans Unicode', Helvetica, Arial, Verdana, sans-serif;
				font-size: 16px;
				font-weight: bold;
				text-align: center;
				text-decoration: none;
				text-shadow: 0 -1px 0 #333333;
				color: #ffffff;
				cursor:pointer;
}
	</style>

<!--<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>-->
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD26GYTiQczCLzKG3TNOTQfWH9b2PIcSjU&sensor=false"></script>
<script type="text/javascript">


function nrcIE(){
if (document.all){return false;}}
function nrcNS(e){
if(document.layers||(document.getElementById&&!document.all)){
if (e.which==2||e.which==3){
return false;}}}
if (document.layers){
document.captureEvents(Event.MOUSEDOWN);
document.onmousedown=nrcNS;
}else{document.onmouseup=nrcNS;document.oncontextmenu=nrcIE;}
document.oncontextmenu=new Function('return false');

	var overlay;
USGSOverlay.prototype = new google.maps.OverlayView();


function initialize() {
  /*var mapOptions = {
    zoom: 9,
    center: new google.maps.LatLng(42.0, 13.026),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };*/

  var mapOptions = {
    zoom: 8.1,
    center: new google.maps.LatLng(42.021, 13.326),
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    zoomControl: false,
	panControl: false,
	streetViewControl: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var swBound = new google.maps.LatLng(40.955,11.716);
  var neBound = new google.maps.LatLng(43.146,14.632);
  var bounds = new google.maps.LatLngBounds(swBound, neBound);
  //var srcImage = 'http://satollo.aquila.infn.it/midia/ref/ultimo_vmi_00.png';
  //new 2015 luglio
  var srcImage = 'http://img.meteo.it/forecastimg/realtime/12/today_temperatura.jpg';
  overlay = new USGSOverlay(bounds, srcImage, map);
}

function USGSOverlay(bounds, image, map) {

  // Initialize all properties.
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;

  this.div_ = null;
  this.setMap(map);
}


USGSOverlay.prototype.onAdd = function() {

  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';
  div.style.opacity = "0.5";

  // Create the img element and attach it to the div.
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';
  div.appendChild(img);
  this.div_ = div;
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
};

USGSOverlay.prototype.draw = function() {

  var overlayProjection = this.getProjection();
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};

USGSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};


google.maps.event.addDomListener(window, 'load', initialize);

	</script>
  </head>
  <body>

    <div id="map-canvas"></div>





	<div style="Z-INDEX: 2; LEFT: 15%; POSITION: absolute; TOP: 10px; visibility:visible; background: rgba(255, 255, 255, 0.8); box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); border-radius: 5px; padding:4px; opacity:0.8;">
      <img src="/images/radar_legenda.jpg" alt="scala pioggia" title="Intensit&agrave; precipitazioni - Legenda colori radar" style="cursor:help;">
	</div>


    <div style="Z-INDEX: 2; LEFT: 0px; POSITION: absolute; TOP: 55px; visibility:visible;">
	   <a href="javascript:location.reload()" title="Aggiorna radar" style="cursor:ponter;">
       <img src="/images/refresh.png" width="35px" height="35px" alt="refresh">
       </a>
    </div>


  </body>
</html>
