$(document).ready(function($) {
  var zoom = false;
  var daterun;
  var minimo = 0;
  var massimo = 0;
  var old_step = 0;
  var dt = new Date();

  $("a.frecce").click(function(e) {
    e.preventDefault();

    var select =  $("select#display-data");
    var selectedIndex = $("select#display-data").prop("selectedIndex");
    var count = massimo - minimo;

    switch (this.id) {
      case "ultimo":
        select.prop("selectedIndex", count);
        break;
      case "primo":
        select.prop("selectedIndex", 0);
        break;
      case "avanti":
        if (selectedIndex < count) select.prop("selectedIndex",selectedIndex + 1);
        break;
      case "indietro":
        if (selectedIndex > 0) select.prop("selectedIndex", selectedIndex - 1);
        break;
    }
    refresh();
  });

  $(" .image_click").click(function(e) {
    e.preventDefault();

    var select =  $("select#display-data");
    var selectedIndex = $("select#display-data").attr("selectedIndex");
    var count = massimo - minimo;

    switch (this.id) {
      case "nextBtn":
        if (selectedIndex < count) select.attr("selectedIndex",selectedIndex + 1);
        break;
      case "prevBtn":
        if (selectedIndex > 0) select.attr("selectedIndex", selectedIndex - 1);
        break;
    }
    refresh();
  });



  // scrivo i campi a seconda dei modelli

  /*console.log("pippo");
   if ($("select#modello").val() == "moloch.0p02.ita.ecm" || $("select#modello").val() == "moloch.0p02.ita.gfs" || $("select#modello").val() == "bolam.0p07.med") {
     $( "#select_campi" ).html( "<select id='campi'><option title='Precipitazione cumulata nelle ore precedenti' value='pcp1h'>Precipitazione 1 ora</option><option selected='selected' title='Precipitazione cumulata nelle 3 ore precedenti' value='pcp3h'>Precipitazione 3 ore</option><option title='Precipitazione cumulata nelle 6 ore precedenti' value='pcp6h'>Precipitazione 6 ore</option><option title='Precipitazione cumulata nelle 12 ore precedenti' value='pcp12h'>Precipitazione 12 ore</option><option title='Precipitazione cumulata nelle 24 ore precedenti' value='pcp24h'>Precipitazione 24 ore</option><option title='Neve accumulata nelle 6 ore precedenti' value='snow6h'>Neve 6 ore</option><option title='Neve accumulata nelle 24 ore precedenti' value='snow24h'>Neve 24 ore</option><option title='nuvolositÃ ' value='tc'>NuvolositÃ </option><option title='Vento a 10 m (km/h)' value='wind10'>Vento a 10 m</option><option title='Vento raffica (km/h)' value='gust'>Vento raffica</option><option title='Pressione a livello del mare (hPa)' value='mslp'>Pressione</option><option title='Temperatura a 2 metri (Â°C)' value='t2m'>Temperatura a 2 m</option><option title='Temperatura e geopotenziale a 950 hPa' value='zt950'>Temperatura 950 hPa</option><option title='Temperatura e geopotenziale a 850 hPa' value='zt850'>Temperatura 850 hPa</option><option title='Temperatura e geopotenziale a 500 hPa' value='zt500'>Temperatura 500 hPa</option><option title='UmiditÃ  relativa a 925 hPa' value='rh950'>UmiditÃ  e vento 950 hPa</option><option title='UmiditÃ  relativa a 850 hPa' value='rh850'>UmiditÃ  e vento 850 hPa</option><option title='UmiditÃ  relativa a 700 hPa' value='rh700'>UmiditÃ  e vento 700 hPa</option><option title='UmiditÃ  relativa a 500 hPa' value='rh500'>UmiditÃ  e vento 500 hPa</option><option title='Temperatura potenziale equivalente a 850 hPa (Â°C) + vento a 850 e 300 hPa (kt)' value='the850'>Theta-e 850 hPa</option><option title='Total Totals e Sweat Index' value='tt'>Total Totals</option><option title='K index' value='ki'>K index</option><option title='Lifted index' value='li'>Lifted index</option><option title='Delta Theta-e' value='dthe'>Delta Theta-e</option><option title='Cape' value='cape'>Cape</option><option title='Cin' value='cin'>Cin</option><option title='Lapse Rate' value='lpr'>Lapse Rate</option><option title='Acqua precipitabile' value='pw'>Acqua precipitabile</option></select>" );
  }
   else if  ($("select#modello").val() == "arw_ecm_3km" || $("select#modello").val() == "arw_gfs_3km" || $("select#modello").val() == "arw_gfs_12km") {
     $( "#select_campi" ).html( "<select id='campi'><option title='Precipitazione cumulata nelle ore precedenti' value='pcp1h'>Precipitazione 1 ora</option><option selected='selected' title='Precipitazione cumulata nelle 3 ore precedenti' value='pcp3h'>Precipitazione 3 ore</option><option title='Precipitazione cumulata nelle 6 ore precedenti' value='pcp6h'>Precipitazione 6 ore</option><option title='Precipitazione cumulata nelle 12 ore precedenti' value='pcp12h'>Precipitazione 12 ore</option><option title='Precipitazione cumulata nelle 24 ore precedenti' value='pcp24h'>Precipitazione 24 ore</option><option title='Neve accumulata nelle 6 ore precedenti' value='snow6h'>Neve 6 ore</option><option title='Neve accumulata nelle 24 ore precedenti' value='snow24h'>Neve 24 ore</option><option title='Tipo di precipitazione' value='ptype'>Tipo di precipitazione</option><option title='Tipo di nubi' value='ct'>NuvolositÃ </option><option title='Vento a 10 m (km/h)' value='wind10m'>Vento a 10 m</option><option title='Vento raffica (km/h)' value='windgust'>Vento raffica</option><option title='Pressione a livello del mare (hPa)' value='mslp'>Pressione</option><option title='Temperatura a 2 metri (Â°C)' value='t2m'>Temperatura a 2 m</option><option title='Temperatura e geopotenziale a 925 hPa' value='zt925'>Temperatura 925 hPa</option><option title='Temperatura e geopotenziale a 850 hPa' value='zt850'>Temperatura 850 hPa</option><option title='Temperatura e geopotenziale a 500 hPa' value='zt500'>Temperatura 500 hPa</option><option title='UmiditÃ  relativa a 2 metri' value='rh2m'>UmiditÃ  relativa a 2 m</option><option title='UmiditÃ  relativa a 925 hPa' value='rh925'>UmiditÃ  e vento 925 hPa</option><option title='UmiditÃ  relativa a 850 hPa' value='rh850'>UmiditÃ  e vento 850 hPa</option><option title='UmiditÃ  relativa a 700 hPa' value='rh700'>UmiditÃ  e vento 700 hPa</option><option title='UmiditÃ  relativa a 500 hPa' value='rh500'>UmiditÃ  e vento 500 hPa</option><option title='Altezza dello zero termico (m)' value='frzlev'>Altezza zero termico</option><option title='Temperatura potenziale equivalente a 850 hPa (Â°C) + vento a 850 e 300 hPa (kt)' value='the850'>Theta-e 850 hPa</option><option title='Total Totals e Sweat Index' value='ttsw'>Total Totals</option><option title='K index' value='ki'>K index</option><option title='Lifted index' value='lif'>Lifted index</option><option title='Delta Theta-e' value='dthe'>Delta Theta-e</option><option title='Cape' value='cape'>Cape</option><option title='Cin' value='cin'>Cin</option><option title='Acqua precipitabile' value='pw'>Acqua precipitabile</option></select>" );
  }*/


  refresh = function() {

    if ($("select#modello").val() == "gfs05") {
      window.open ('http://www.lamma.rete.toscana.it/meteo/modelli/gfs','_self',false)
    }
    if ($("select#modello").val() == "arw_gfs_12km") {
      window.open ('http://www.lamma.rete.toscana.it/modelli/atmo/mappe/atmosfera?model=arw_gfs_12km','_self',false);
    }
    if ($("select#modello").val() == "arw_gfs_3km") {
      window.open ('http://www.lamma.rete.toscana.it/modelli/atmo/mappe/atmosfera?model=arw_gfs_3km','_self',false)
    }
    if ($("select#modello").val() == "arw_ecm_3km") {
      window.open ('http://www.lamma.rete.toscana.it/modelli/atmo/mappe/atmosfera?model=arw_ecm_3km','_self',false)
    }

    if ($("select#modello").val() == "bolam.0p07.med" || $("select#modello").val() == "moloch.0p02.ita.ecm" || $("select#modello").val() == "moloch.0p02.ita.gfs")  {
      var zoomchr = "2";
      $("img#mainimage").prop("src","http://www.lamma.rete.toscana.it/models/" + $("select#modello").val() + "/" + $("select#sezione").val() +  "/" + $("select#campi").val() + ".z" + ((zoom)?zoomchr:"1") + "." + $("select#display-data").val() + ".png?"  + dt.getTime());
      $("span#maindesc").text("Area: " +  ((zoom)?"Toscana":"Italia") + " - " + $("select#campi")[0].options[$("select#campi")[0].selectedIndex].title);
      if ($("select#modello").val() == "bolam.0p07.med") {
        document.getElementById('info_bolam.0p07.med').style.display = "block";
        document.getElementById('info_moloch.0p02.ita.ecm').style.display = "none";
        document.getElementById('info_moloch.0p02.ita.gfs').style.display = "none";
      }
      if ($("select#modello").val() == "moloch.0p02.ita.ecm") {
        document.getElementById('info_bolam.0p07.med').style.display = "none";
        document.getElementById('info_moloch.0p02.ita.ecm').style.display = "block";
        document.getElementById('info_moloch.0p02.ita.gfs').style.display = "none";
      }
      if ($("select#modello").val() == "moloch.0p02.ita.gfs") {
        document.getElementById('info_bolam.0p07.med').style.display = "none";
        document.getElementById('info_moloch.0p02.ita.ecm').style.display = "none";
        document.getElementById('info_moloch.0p02.ita.gfs').style.display = "block";
      }

    }
  }






  $("select#campi").change(function(e) {
    if (run == 0) {
      switch ($(this).val()) {
        case "pcp3h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 1;
              massimo = 41;
              init(3);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 1;
              massimo = 17;
              init(3);
              break;
          }
          break;
        case "pcp1h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 1;
              massimo = 49;
              init(1,0);
              break;
          }
          break;
        case "pcp6h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 2;
              massimo = 21;
              init(6,6);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 2;
              massimo = 9;
              init(6,6);
              break;
          }
          break;
        case "snow6h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 2;
              massimo = 21;
              init(6,6);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 2;
              massimo = 9;
              init(6,6);
              break;
          }
          break;
        case "pcp12h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 2;
              massimo = 10;
              init(12,12);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 2;
              massimo = 5;
              init(12,12);
              break;
          }
          break;
        case "snow12h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 2;
              massimo = 10;
              init(12,12);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 2;
              massimo = 5;
              init(12,12);
              break;
          }
          break;
        case "pcp24h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 2;
              massimo = 5;
              init(24,24);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 2;
              massimo = 3;
              init(24,24);
              break;
          }
          break;
        case "snow24h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 1;
              massimo = 3;
              init(24,18);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 1;
              massimo = 3;
              init(24,18);
              break;
          }

          break;
        default:
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 1;
              massimo = 41;
              init(3);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 1;
              massimo = 49;
              init(1);
              break;
          }
      }
    }

    if (run == 6) {

      switch ($(this).val()) {
        case "pcp3h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 1;
              massimo = 15;
              init(3);
              break;
          }
          break;
        case "pcp1h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 1;
              massimo = 43;
              init(1,0);
              break;
          }
          break;
        case "pcp6h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 2;
              massimo = 8;
              init(6,6);
              break;
          }
          break;
        case "snow6h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 2;
              massimo = 8;
              init(6,6);
              break;
          }
          break;
        case "pcp12h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 2;
              massimo = 4;
              init(12,12);
              break;
          }
          break;
        case "snow12h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 2;
              massimo = 4;
              init(12,12);
              break;
          }
          break;
        case "pcp24h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 2;
              massimo = 2;
              init(24,24);
              break;
          }
          break;
        case "snow24h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 1;
              massimo = 2;
              init(24,18);
              break;
          }
          break;
        default:
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 1;
              massimo = 43;
              init(1);
              break;
          }
      }
    }
    if (run == 18) {

      switch ($(this).val()) {
        case "pcp3h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 1;
              massimo = 19;
              init(3);
              break;
          }
          break;
        case "pcp1h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 1;
              massimo = 54;
              init(1,0);
              break;
          }
          break;
        case "pcp6h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 2;
              massimo = 10;
              init(6,6);
              break;
          }
          break;
        case "snow6h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 2;
              massimo = 10;
              init(6,6);
              break;
          }
          break;
        case "pcp12h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 2;
              massimo = 5;
              init(12,12);
              break;
          }
          break;
        case "snow12h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 2;
              massimo = 5;
              init(12,12);
              break;
          }
          break;
        case "pcp24h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 2;
              massimo = 3;
              init(24,24);
              break;
          }
          break;
        case "snow24h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 1;
              massimo = 3;
              init(24,18);
              break;
          }

          break;
        default:
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.gfs":
            case "moloch.0p02.ita.ecm":
              minimo = 1;
              massimo = 54;
              init(1);
              break;
          }
      }
    }
    if (run == 12 ) {
      switch ($(this).val()) {
        case "pcp3h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 1;
              massimo = 45;
              init(3);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 1;
              massimo = 21;
              init(3);
              break;
          }
          break;
        case "pcp1h":
          switch($("select#modello").val()) {
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 1;
              massimo = 61;
              init(1,0);
              break;
          }
          break;
        case "pcp6h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 2;
              massimo = 23;
              init(6,6);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 2;
              massimo = 11;
              init(6,6);
              break;
          }
          break;
        case "snow6h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 2;
              massimo = 23;
              init(6,6);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 2;
              massimo = 11;
              init(6,6);
              break;
          }
          break;
        case "pcp12h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 2;
              massimo = 11;
              init(12,12);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 2;
              massimo = 6;
              init(12,12);
              break;
          }
          break;
        case "snow12h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 2;
              massimo = 11;
              init(12,12);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 2;
              massimo = 6;
              init(12,12);
              break;
          }
          break;
        case "pcp24h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 2;
              massimo = 6;
              init(24,24);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 2;
              massimo = 3;
              init(24,24);
              break;
          }
          break;
        case "snow24h":
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 1;
              massimo = 4;
              init(24,18);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 1;
              massimo = 3;
              init(24,18);
              break;
          }

          break;
        default:
          switch($("select#modello").val()) {
            case "bolam.0p07.med":
              minimo = 1;
              massimo = 45;
              init(3);
              break;
            case "moloch.0p02.ita.ecm":
            case "moloch.0p02.ita.gfs":
              minimo = 7;
              massimo = 61;
              init(1);
              break;
          }
      }

    }
    refresh();

  });

  $("select#sezione").change(function(e) {
    $("select#campi").change();
  });

  $("select#modello").change(function(e) {
    console.log($(this).val());
    switch ($(this).val()) {
      case 'moloch.0p02.ita.ecm':
      case 'moloch.0p02.ita.gfs':
        //   $( "#select_campi" ).html( "<select id=\"campi\"><option title=\"Precipitazione cumulata nelle ore precedenti\" value=\"pcp1h\">Precipitazione 1 ora</option><option selected=\"selected\" title=\"Precipitazione cumulata nelle 3 ore precedenti\" value=\"pcp3h\">Precipitazione 3 ore</option><option title=\"Precipitazione cumulata nelle 6 ore precedenti\" value=\"pcp6h\">Precipitazione 6 ore</option><option title=\"Precipitazione cumulata nelle 12 ore precedenti\" value=\"pcp12h\">Precipitazione 12 ore</option><option title=\"Precipitazione cumulata nelle 24 ore precedenti\" value=\"pcp24h\">Precipitazione 24 ore</option><option title=\"Neve accumulata nelle 6 ore precedenti\" value=\"snow6h\">Neve 6 ore</option><option title=\"Neve accumulata nelle 24 ore precedenti\" value=\"snow24h\">Neve 24 ore</option><option title=\"nuvolositÃ \" value=\"tc\">NuvolositÃ </option><option title=\"Vento a 10 m (km/h)\" value=\"wind10\">Vento a 10 m</option><option title=\"Vento raffica (km/h)\" value=\"gust\">Vento raffica</option><option title=\"Pressione a livello del mare (hPa)\" value=\"mslp\">Pressione</option><option title=\"Temperatura a 2 metri (Â°C)\" value=\"t2m\">Temperatura a 2 m</option><option title=\"Temperatura e geopotenziale a 950 hPa\" value=\"zt950\">Temperatura 950 hPa</option><option title=\"Temperatura e geopotenziale a 850 hPa\" value=\"zt850\">Temperatura 850 hPa</option><option title=\"Temperatura e geopotenziale a 500 hPa\" value=\"zt500\">Temperatura 500 hPa</option><option title=\"UmiditÃ  relativa a 925 hPa\" value=\"rh950\">UmiditÃ  e vento 950 hPa</option><option title=\"UmiditÃ  relativa a 850 hPa\" value=\"rh850\">UmiditÃ  e vento 850 hPa</option><option title=\"UmiditÃ  relativa a 700 hPa\" value=\"rh700\">UmiditÃ  e vento 700 hPa</option><option title=\"UmiditÃ  relativa a 500 hPa\" value=\"rh500\">UmiditÃ  e vento 500 hPa</option><option title=\"Temperatura potenziale equivalente a 850 hPa (Â°C) + vento a 850 e 300 hPa (kt)\" value=\"the850\">Theta-e 850 hPa</option><option title=\"Total Totals e Sweat Index\" value=\"tt\">Total Totals</option><option title=\"K index\" value=\"ki\">K index</option><option title=\"Lifted index\" value=\"li\">Lifted index</option><option title=\"Delta Theta-e\" value=\"dthe\">Delta Theta-e</option><option title=\"Cape\" value=\"cape\">Cape</option><option title=\"Cin\" value=\"cin\">Cin</option><option title=\"Lapse Rate\" value=\"lpr\">Lapse Rate</option><option title=\"Acqua precipitabile\" value=\"pw\">Acqua precipitabile</option></select>" );

        if ($("select#campi").prop("selectedIndex") == 0) $("select#campi").prop("selectedIndex",1);
        $("select#campi option").prop("disabled", false);
        break;
      default:
        if ($("select#campi").prop("selectedIndex") == 0) $("select#campi").prop("selectedIndex",1);
        $($("select#campi option")[0]).prop("disabled","disabled");
        $($("select#campi option")[10]).prop("disabled","");
        if ($("select#campi").prop("selectedIndex") == 13) $("select#campi").prop("selectedIndex",14);
        $($("select#campi option")[13]).prop("disabled","");
    }

    $.get("http://www.lamma.rete.toscana.it/models/" + $(this).val() + "/last/DATERUN.txt" + "?" + (new Date()).getTime(), function(dr) {

      var re = new RegExp('^([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})');
      var m = re.exec(dr);
      daterun = new Date(parseFloat(m[1]), parseFloat(m[2]) - 1, parseFloat(m[3]), parseFloat(m[4]), 0, 0, 0);
      run = daterun.getHours();
      $("select#campi").change();
    });
  });

  $("a#zoom").click(function(e) {
    e.preventDefault();

    zoom = !zoom;
    refresh();
  });

  function init(step,start) {
    // data corrente
    var data = new Date(daterun.getTime());
    console.log(data);
    if (start) {
      data.setTime(data.getTime() + start * 3600000);
    }

    switch ($("select#sezione").val()) {
      case 'old1':
        data.setTime(data.getTime() - 12 * 3600000);
        break;
      case 'old2':
        data.setTime(data.getTime() - 24 * 3600000);
        break;
      case 'old3':
        data.setTime(data.getTime() - 36 * 3600000);
        break;
    }

    var options = Array();

    for (var i=minimo; i<=massimo; i++) {
      options.push("<option value=\"" + i + "\">" + giorno(data.getDay()) + " " + data.getDate() + " - " + "ore " + data.getHours() + "</option>");
      data.setTime(data.getTime() + step * 3600000);
    }
    var selected = $("select#display-data").prop("selectedIndex");
    $("span#display-frecce").html("<select id=\"display-data\">" + options.join("") + "</select>");

    $("select#display-data").change(function(e) {
      ora = parseInt(this.options[this.selectedIndex].value);
      refresh();
    });
    if (old_step == step) {
      $("select#display-data").prop("selectedIndex",selected);
      refresh();
    } else {
      $("a.frecce#primo").click();
    }
    old_step = step;
  }

  $("select#modello").change();

  function giorno(day) {
    switch (day) {
      case 0:
        return 'Dom';
      case 1:
        return 'Lun';
      case 2:
        return 'Mar';
      case 3:
        return 'Mer';
      case 4:
        return 'Gio';
      case 5:
        return 'Ven';
      case 6:
        return 'Sab';
    }
    return day;
  }
});
