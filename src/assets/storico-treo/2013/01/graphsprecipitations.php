<?php
error_reporting(0);
global $moistxt;
require_once ('funzioni.php');
$file=$_GET['file'];
$typefile = searchFile($file);
if($typefile=="month"){
list($jour,$meantemp,$highttemp,$hourhighttemp,$lowtemp,$hourlowtemp,$rain,$ventmoyen,$rafales,$hourrafales,$domdir) = parseFile($file);
$legx =$jour;
}
if($typefile=="year"){
list($annee,$mois,$meanmax,$meanmin,$meantemp,$highttemp,$datehighttemp,$lowtemp,$datelowtemp,$gel,$rain,$maxrain,$ventmoyen,$rafales,$domdir)=parseFile($file);
$legx = @array_values($moistxt);
@array_shift($legx);
}
#garde que le nom de fichier principal en supprimer les dir du nom
$sepfilename = explode("/",$file);
$namelink = $sepfilename[sizeof($sepfilename)-1];

$titre = gettitre($file);
#rain 

require_once ('artichow/BarPlot.class.php');
require_once ('artichow/LinePlot.class.php');
$cumul=array();
$cum="";
for($i=0;$i<sizeof($rain);$i++){$zero[]=0; $cum = $cum+$rain[$i]; $cumul[$i]=$cum;}
$graph = new Graph(850, 400);
$titregraph = "Precipitazioni per $titre";
$bleuclair = new color (42, 55, 83);
$group = new PlotGroup();
$group->setPadding(30,30, 40, 55);
$group->axis->bottom->setLabelText ($legx);
$group->title->set($titregraph); 
$group->title-> setColor($bleuclair);
$gris = new Color(192, 213, 247,30);
$grisfonce = new Color(132,176,249);
$plot = new LinePlot($cumul, LINEPLOT_MIDDLE);
$plot->setFillColor($gris);
$plot->setColor($gris);
$plot->setYAxis(PLOT_RIGHT);
$group->axis->right->setColor($grisfonce);
$group->axis->right->title->set("Precipitazioni totali accumulate");
$group->legend->add($plot, "Accumulo totale", LEGEND_BACKGROUND);  
$group->add($plot);
$rouge = new color (82, 132, 214,20);
$plot = new BarPlot($rain);
$plot->setBarColor($rouge);
$plot->label->set($rain);
$plot->label->move(0, -15);
$plot->label->setAngle(90);
$plot->barBorder->setColor($rouge);
$plot->setYAxis(PLOT_LEFT);
$group->axis->left->setColor($rouge);
$group->axis->left->title->set("Periodo Accumulo");
$group->add($plot);
$group->legend->add($plot, "Periodo Accumulo", LEGEND_BACKGROUND);  
if($typefile=="year"){
$gris = new Color(193, 197, 199, 70);
$grisfonce = new Color(84, 84, 84,30);
$plot = new LinePlot($maxrain, LINEPLOT_MIDDLE);
$plot->setColor($grisfonce);
$plot->mark->setType(MARK_SQUARE);
$plot->mark->setSize(3);
$plot->mark->setFill(new White);
$plot->mark->border->show();
$group->legend->add($plot, "Massima in un giorno", LEGEND_MARK);  
$group->add($plot);
}
$group->legend->setModel(LEGEND_MODEL_BOTTOM);
$group->legend->shadow->setSize(0);
$group->grid->setType(LINE_DASHED);
$graph->add($group);
$graph->border->setColor(new blue());
$graph->draw();


?>
