<?php
// Meteo Campoli - Test recupero archivio Wyoming (PHP 8.0+)
ini_set('display_errors', '0');
error_reporting(E_ALL);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function jsonOut($value, $status = 200) {
    http_response_code($status);
    echo json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

$id = isset($_GET['id']) ? (string)$_GET['id'] : '16245';
$data = isset($_GET['data']) ? (string)$_GET['data'] : '2026-11-08';
$ora = isset($_GET['ora']) ? (string)$_GET['ora'] : '12';
if (!preg_match('/^[0-9]{5}$/', $id) ||
    !preg_match('/^\d{4}-\d{2}-\d{2}$/', $data) ||
    !in_array($ora, array('00', '12'), true) ||
    !checkdate((int)substr($data, 5, 2), (int)substr($data, 8, 2), (int)substr($data, 0, 4))) {
    jsonOut(array('errore' => 'Parametri non validi (id, data, ora)'), 400);
}
if (!function_exists('curl_init')) jsonOut(array('errore' => 'cURL non disponibile'), 503);

$url = 'https://weather.uwyo.edu/wsgi/sounding?' . http_build_query(array(
    'datetime' => $data . ' ' . $ora . ':00:00',
    'id' => $id,
    'type' => 'TEXT:LIST'
), '', '&', PHP_QUERY_RFC3986);

$ch = curl_init($url);
curl_setopt_array($ch, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_MAXREDIRS => 3,
    CURLOPT_REDIR_PROTOCOLS => CURLPROTO_HTTPS,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 20,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_ENCODING => '',
    CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; MeteoCampoli/1.0)',
    CURLOPT_HTTPHEADER => array('Accept: text/html,text/plain;q=0.9,*/*;q=0.8')
));
$body = curl_exec($ch);
$http = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
$finalUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
$err = curl_error($ch);
curl_close($ch);

if ($body === false) {
    jsonOut(array('errore' => 'Connessione non riuscita', 'dettaglio' => $err, 'http' => $http), 502);
}
$text = html_entity_decode(strip_tags($body), ENT_QUOTES | ENT_HTML5, 'UTF-8');
$text = str_replace("\xc2\xa0", ' ', $text);
$messaggio = null;
if (preg_match('/Unable to retrieve the data[^\r\n<]*/i', $text, $m)) $messaggio = trim($m[0]);
if (preg_match("/'id' is not specified/i", $text)) $messaggio = "'id' is not specified";

// Una riga del profilo in formato TEXT:LIST inizia con pressione (hPa),
// quota (m), temperatura (°C) e punto di rugiada (°C).
$righe = array();
foreach (preg_split('/\r\n|\n|\r/', $text) as $riga) {
    if (preg_match('/^\s*(\d{1,4}(?:\.\d+)?)\s+(-?\d{1,6})\s+(-?\d{1,3}(?:\.\d+)?)\s+(-?\d{1,3}(?:\.\d+)?)/', $riga, $m)) {
        $righe[] = array(
            'pressione_hPa' => (float)$m[1],
            'quota_m' => (int)$m[2],
            'temperatura_C' => (float)$m[3],
            'rugiada_C' => (float)$m[4]
        );
    }
}
jsonOut(array(
    'fonte' => 'University of Wyoming Radiosonde Archive',
    'stazione' => $id,
    'dataUtc' => $data . 'T' . $ora . ':00:00Z',
    'httpRemoto' => $http,
    'urlFinale' => $finalUrl,
    'byteRicevuti' => strlen($body),
    'numeroLivelliTrovati' => count($righe),
    'primeMisure' => array_slice($righe, 0, 12),
    'messaggio' => $messaggio,
    'anteprimaTesto' => count($righe) === 0 ? substr(trim(preg_replace('/\s+/', ' ', $text)), 0, 350) : null
));
