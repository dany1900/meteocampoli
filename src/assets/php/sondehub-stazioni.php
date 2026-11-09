<?php
// Meteo Campoli - Ultime radiosonde per stazione italiana (SondeHub v2)
// PHP 8.0.30, endpoint da installare in /assets/php/sondehub-stazioni.php
ini_set('display_errors','0');
ini_set('log_errors','1');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=180');

function rispondi($data,$status=200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}
function numero($v) { return is_numeric($v) ? (float)$v : null; }

// ID verificati tramite /sites il 09/11/2026. Inclusi siti speciali/campagne.
$stazioni = array(
    '16245'=>'Pratica di Mare', '16144'=>'San Pietro Capofiume',
    '16045'=>'Udine / Rivolto', '16064'=>'Novara / Cameri',
    '16113'=>'Cuneo / Levaldigi', '16332'=>'Lecce / Galatina',
    '16429'=>'Trapani / Birgi', '16546'=>'Decimomannu',
    '-121'=>'Potenza CNR', '-107'=>'Bolzano TEAMx',
    '-31'=>'Bracciano', '-37'=>"L'Aquila CETEMPS",
    '-116'=>'Monte Romano', '16014'=>'Sterzing / Vipiteno'
);
$elenco=array();
foreach ($stazioni as $id=>$nome) $elenco[]=array('id'=>(string)$id,'nome'=>$nome);
$site=isset($_GET['site']) ? trim((string)$_GET['site']) : '16245';
if ($site==='elenco') rispondi(array('stazioni'=>$elenco,'errore'=>null));
if (!array_key_exists($site,$stazioni)) rispondi(array('errore'=>'Stazione non valida','stazioni'=>$elenco,'sonde'=>array()),400);

$last=isset($_GET['last']) ? (int)$_GET['last'] : 172800;
$last=max(3600,min(604800,$last));
$out=array('fonte'=>'SondeHub v2 /sondes/site', 'aggiornatoIl'=>gmdate('Y-m-d\TH:i:s\Z'),
    'stazione'=>array('id'=>$site,'nome'=>$stazioni[$site]),
    'stazioni'=>$elenco,'durataOre'=>$last/3600,'sonde'=>array(),'errore'=>null);
if (!function_exists('curl_init')) { $out['errore']='cURL non disponibile'; rispondi($out,503); }
$url='https://api.v2.sondehub.org/sondes/site/'.rawurlencode($site).'?last='.$last;
$ch=curl_init($url);
curl_setopt_array($ch,array(
    CURLOPT_RETURNTRANSFER=>true, CURLOPT_FOLLOWLOCATION=>true, CURLOPT_MAXREDIRS=>3,
    CURLOPT_REDIR_PROTOCOLS=>CURLPROTO_HTTPS, CURLOPT_CONNECTTIMEOUT=>5, CURLOPT_TIMEOUT=>18,
    CURLOPT_SSL_VERIFYPEER=>true, CURLOPT_SSL_VERIFYHOST=>2,
    CURLOPT_ENCODING=>'', CURLOPT_USERAGENT=>'MeteoCampoli/1.0'
));
$body=curl_exec($ch);
$http=(int)curl_getinfo($ch,CURLINFO_HTTP_CODE);
$err=curl_error($ch);
curl_close($ch);
if (!is_string($body) || $http!==200) {
    $out['errore']='SondeHub HTTP '.$http.($err ? ' - '.$err : '');
    rispondi($out,502);
}
if (strlen($body)>12000000) { $out['errore']='Risposta SondeHub troppo grande'; rispondi($out,502); }
$data=json_decode($body,true);
if (!is_array($data)) { $out['errore']='JSON SondeHub non valido'; rispondi($out,502); }
foreach ($data as $key=>$value) {
    if (!is_array($value)) continue;
    $candidati=array();
    if (isset($value['datetime'])) $candidati[]=$value;
    else foreach ($value as $v) if (is_array($v) && isset($v['datetime'])) $candidati[]=$v;
    $ultimo=null; $ultimoTs=0;
    foreach ($candidati as $v) {
        $t=strtotime((string)$v['datetime']);
        if ($t===false || $t <= $ultimoTs || $t>time()+300) continue;
        $ultimo=$v; $ultimoTs=$t;
    }
    if ($ultimo===null) continue;
    $seriale=(string)($ultimo['serial'] ?? $key);
    if (!preg_match('/^[A-Za-z0-9_.-]{3,64}$/',$seriale)) continue;
    $out['sonde'][]=array(
        'seriale'=>$seriale,
        'dataUtc'=>gmdate('Y-m-d\TH:i:s\Z',$ultimoTs),
        'latitudine'=>numero($ultimo['lat'] ?? null),
        'longitudine'=>numero($ultimo['lon'] ?? null),
        'quota'=>numero($ultimo['alt'] ?? null),
        'temperatura'=>numero($ultimo['temp'] ?? null),
        'umidita'=>numero($ultimo['humidity'] ?? null),
        'pressione'=>numero($ultimo['pressure'] ?? null),
        'tipo'=>$ultimo['type'] ?? null,
        'url'=>'https://sondehub.org/'.rawurlencode($seriale)
    );
}
usort($out['sonde'],function($a,$b){return strcmp($b['dataUtc'],$a['dataUtc']);});
$out['sonde']=array_slice($out['sonde'],0,15);
$out['numeroLanciRilevati']=count($out['sonde']);
rispondi($out);
