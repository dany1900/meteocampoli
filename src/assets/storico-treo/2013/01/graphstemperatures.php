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

#temp
require_once "artichow/BarPlot.class.php";
require_once "artichow/LinePlot.class.php";
$vmax = ceil(getmax($highttemp));
if($vmax%5==""){$max=$vmax;}else{
if($vmax>=0){$max = $vmax - $vmax%5+5;}
else{$max = $vmax - $vmax%5;}}
$vmin = floor(getmin($lowtemp));
if($vmin%5==""){$min=$vmin;}else{
if($vmin>=0){$min = $vmin - $vmin%5;}
else{$min = $vmin - $vmin%5-5;}}
for($i=0;$i<sizeof($highttemp);$i++){$zero[]=0;}
$graph = new Graph(850, 400);
$titregraph = "Temperature per $titre";
$bleuclair = new color (42, 55, 83);
$group = new PlotGroup();
$group->setPadding(30,5, 40, 55);
$group->axis->bottom->setLabelText ($legx);
$group->title->set($titregraph); 
$group->title-> setColor($bleuclair);
$group->setXAxisZero(FAlSE);
$group->setYMax($max);
$group->setYMin($min);
$plot = new BarPlot($lowtemp,1,2);
$bleu = new color (43, 120, 246,50);
$plot->setBarColor($bleu);
$plot->label->set($lowtemp);
$plot->label->move(-2, -15);
$plot->label->setAngle(90);
$plot->barBorder->setColor($bleu);
$plot->setYAxis(PLOT_LEFT);
$group->legend->add($plot, "Temperatura minima", LEGEND_BACKGROUND); 
$group->add($plot);
$rouge = new color (246, 43, 43,50);
$plot = new BarPlot($highttemp,2,2);
$plot->setBarColor($rouge);
$plot->label->set($highttemp);
$plot->label->move(0, -15);
$plot->label->setAngle(90);
$plot->barBorder->setColor($rouge);
$group->add($plot);
$group->legend->add($plot, "Temperatura massima", LEGEND_BACKGROUND);  
$gris = new Color(193, 197, 199, 70);
$grisfonce = new Color(84, 84, 84,30);
$plot = new LinePlot($meantemp, LINEPLOT_MIDDLE);
$plot->setFillColor($gris);
$plot->setColor($grisfonce);
$plot->mark->setType(MARK_SQUARE);
$plot->mark->setSize(3);
$plot->mark->setFill(new White);
$plot->mark->border->show();
$group->legend->add($plot, "Media", LEGEND_MARK);  
$group->add($plot);
if($typefile=="year"){
$plot = new LinePlot($meanmin, LINEPLOT_MIDDLE);
$plot->setColor($bleu);
$group->legend->add($plot, "Media minima", LEGEND_LINE);  
$group->add($plot);
$plot = new LinePlot($meanmax, LINEPLOT_MIDDLE);
$plot->setColor($rouge);
$group->legend->add($plot, "Media massima", LEGEND_LINE);  
$group->add($plot);
}
$group->legend->setModel(LEGEND_MODEL_BOTTOM);
$group->legend->shadow->setSize(0);
$plot = new Lineplot($zero, LINEPLOT_MIDDLE);
$plot->setColor(new MidGray);
$group->add($plot);
$group->grid->setType(LINE_DASHED);
$graph->add($group);
$graph->border->setColor(new blue());
$graph->draw();

?>
