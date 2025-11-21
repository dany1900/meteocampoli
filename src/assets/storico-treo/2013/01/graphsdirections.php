<?php
error_reporting(0);
global $moistxt;
require_once ('funzioni.php');
require_once ('legend.php');
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
global $directs;
$stat = array("N"=>"","NNE"=>"","NE"=>"","ENE"=>"","E"=>"","ESE"=>"","SE"=>"","SSE"=>"","S"=>"","SSO"=>"","SO"=>"","OSO"=>"","O"=>"","ONO"=>"","NO"=>"","NNO"=>"");

#$directs = array_keys($dircolors);
for($c=0;$c<count($domdir);$c++)
{
if($domdir[$c] != "")
{
for($i=0;$i<sizeof($directs);$i++){
if($domdir[$c] == $directs[$i]){$stat[$directs[$i]]++ ; }
}
}
}

foreach ($stat as $i => $value) {
    if ($stat[$i]=="") {unset($stat[$i]);}
}	
	
$statmax = array_values($stat);
$statkeys = array_keys($stat);
$max = max($statmax);
$position = array_search($max, $statmax);
require_once "artichow/Pie.class.php";
for ($i=0;$i<count($statkeys);$i++){
$tempcolor = getdircolor($statkeys[$i]);

$RGB = explode (",",$tempcolor);

$test[] = new Color($RGB[0],$RGB[1],$RGB[2]);

}


$graph = new Graph(850, 400);


$titregraph = "Distribuzione del vento % per $titre, aree dominanti";

$pie = new Pie(array_values($stat),$test);
$pie->setLabelPrecision(0);
$pie->setLegend(array_keys($stat));
$pie->legend->setPosition(1.2);
$pie->legend->shadow->setSize(0);
$pie->setCenter(.36, .58);
$pie->setSize(.65, .65);
$pie->set3D(15);
$pie->title->set($titregraph);
$bleuclair = new color (42, 55, 83);
$pie->title-> setColor($bleuclair);
$pie->title->move(0,-40);
$pie->setLabelPosition(-40);
$pie->label->setBackgroundColor(new White(60));
$pie->explode(array(($position)=>20));

$graph->border->setColor(new blue());
$graph->add($pie);
$graph->draw();

?>
