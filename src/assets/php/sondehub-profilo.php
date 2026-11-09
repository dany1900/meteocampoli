
<?php
// Meteo Campoli - Profilo completo radiosonda SondeHub

error_reporting(E_ALL);
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');

function outputJson($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

$seriale = isset($_GET['seriale'])
    ? trim($_GET['seriale'])
    : '';

if (!preg_match('/^[A-Za-z0-9_.-]{3,64}$/', $seriale)) {
    outputJson(array('errore' => 'Seriale non valido'), 400);
}

if (!function_exists('curl_init')) {
    outputJson(array('errore' => 'cURL non disponibile'), 503);
}

$url = 'https://api.v2.sondehub.org/sonde/'
    . rawurlencode($seriale);

$ch = curl_init($url);

curl_setopt_array($ch, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 8,
    CURLOPT_TIMEOUT => 25,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_USERAGENT => 'MeteoCampoli/1.0'
));

$body = curl_exec($ch);
$http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);

if ($body === false || $http != 200) {
    outputJson(array(
        'errore' => 'SondeHub non raggiungibile',
        'http' => $http,
        'dettaglio' => $err
    ), 502);
}

$dati = json_decode($body, true);

if (!is_array($dati)) {
    outputJson(array('errore' => 'JSON non valido'), 502);
}

$profilo = array();

foreach ($dati as $punto) {

    if (!is_array($punto) || !isset($punto['alt']) ||
        !is_numeric($punto['alt'])) {
        continue;
    }

    $quota = (float)$punto['alt'];

    if ($quota < -500 || $quota > 50000) {
        continue;
    }

    $profilo[] = array(
        'quota' => round($quota, 1),

        'temperatura' =>
            isset($punto['temp']) && is_numeric($punto['temp'])
            ? round((float)$punto['temp'], 1)
            : null,

        'umidita' =>
            isset($punto['humidity']) && is_numeric($punto['humidity'])
            ? round((float)$punto['humidity'], 1)
            : null,

        'pressione' =>
            isset($punto['pressure']) && is_numeric($punto['pressure'])
            ? round((float)$punto['pressure'], 1)
            : null,

        'latitudine' =>
            isset($punto['lat']) && is_numeric($punto['lat'])
            ? (float)$punto['lat']
            : null,

        'longitudine' =>
            isset($punto['lon']) && is_numeric($punto['lon'])
            ? (float)$punto['lon']
            : null,

        'dataUtc' => isset($punto['datetime'])
            ? $punto['datetime']
            : null
    );
}

// Ordina le misurazioni per altitudine
usort($profilo, function($a, $b) {
    if ($a['quota'] == $b['quota']) return 0;
    return ($a['quota'] < $b['quota']) ? -1 : 1;
});

$quotaMassima = null;

foreach ($profilo as $punto) {
    if ($quotaMassima === null ||
        $punto['quota'] > $quotaMassima) {
        $quotaMassima = $punto['quota'];
    }
}

outputJson(array(
    'fonte' => 'SondeHub v2 - Telemetria osservata',
    'seriale' => $seriale,
    'numeroMisurazioni' => count($profilo),
    'quotaMassima' => $quotaMassima,
    'profilo' => $profilo,
    'errore' => null
));
