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

#wind
require_once "artichow/BarPlot.class.php";
require_once "artichow/LinePlot.class.php";
$graph = new Graph(850, 400);
$titregraph = "La velocità del vento per $titre";
$bleuclair = new color (42, 55, 83);
$group = new PlotGroup();
$group->setPadding(30,30, 40, 55);
$group->axis->bottom->setLabelText ($legx);
$group->title->set($titregraph); 
$group->title-> setColor($bleuclair);
$rouge = new color (66, 160, 255,25);
$rougefonce = new color (66, 160, 255);
$plot = new BarPlot($rafales);
$plot->setBarColor($rouge);
$plot->label->set($rafales);
$plot->label->move(0, -15);
$plot->label->setAngle(90);
$plot->barBorder->setColor($rouge);
$plot->setYAxis(PLOT_LEFT);
$group->axis->left->setColor($rougefonce);
$group->axis->left->title->set("Raffiche max in km/h");
$group->add($plot);
$group->legend->add($plot, "Raffiche max", LEGEND_BACKGROUND);  
$gris = new Color(255, 250, 165, 60);
$grisfonce = new Color(255, 84, 50,8);
$marron = new Color(153, 145, 0);
$plot = new LinePlot($ventmoyen, LINEPLOT_MIDDLE);
$plot->label->set($domdir);
$plot->label->move(0, 15);
$plot->label->setColor($rouge);
$plot->setFillColor($gris);
$plot->setColor($grisfonce);
$plot->setYAxis(PLOT_RIGHT);
$group->axis->right->setColor($marron);
$group->axis->right->title->set("Media in km/h");
$group->legend->add($plot, "Media e direzione dominante", LEGEND_MARK);  
$group->add($plot);
$group->legend->setModel(LEGEND_MODEL_BOTTOM);
$group->legend->shadow->setSize(0);
$group->grid->setType(LINE_DASHED);
$graph->add($group);
$graph->border->setColor(new blue());
$graph->draw();


?>
