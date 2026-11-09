
<?php
error_reporting(E_ALL);
ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$risultato = array(
    'php' => PHP_VERSION,
    'curl' => function_exists('curl_init'),
    'test' => 'SondeHub profilo',
    'http_remoto' => null,
    'tempo_secondi' => null,
    'byte_ricevuti' => 0,
    'errore' => null
);

if (!$risultato['curl']) {
    $risultato['errore'] = 'cURL non disponibile';
    echo json_encode($risultato);
    exit;
}

$url = 'https://api.v2.sondehub.org/sonde/W2010703';

$ch = curl_init($url);

curl_setopt_array($ch, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 3,
    CURLOPT_TIMEOUT => 8,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_USERAGENT => 'MeteoCampoli/1.0'
));

$inizio = microtime(true);

$body = curl_exec($ch);

$risultato['tempo_secondi'] =
    round(microtime(true) - $inizio, 2);

$risultato['http_remoto'] =
    curl_getinfo($ch, CURLINFO_HTTP_CODE);

$risultato['byte_ricevuti'] =
    is_string($body) ? strlen($body) : 0;

if ($body === false) {
    $risultato['errore'] = curl_error($ch);
} else {
    $dati = json_decode($body, true);

    $risultato['json_valido'] =
        json_last_error() === JSON_ERROR_NONE;

    $risultato['numero_record'] =
        is_array($dati) ? count($dati) : null;
}

curl_close($ch);

echo json_encode($risultato, JSON_PRETTY_PRINT);
