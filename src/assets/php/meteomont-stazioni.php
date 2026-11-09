<?php
/**
 * Proxy semplice per le stazioni manuali Meteomont dei Carabinieri.
 * URL pubblico: /assets/php/meteomont-stazioni.php
 * Su Altervista richiede PHP con accesso HTTP verso il dominio Meteomont.
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');

$origine = 'https://servizimeteomont.csifa.carabinieri.it/api/meteomontweb/stazioni/getstazionimanuali';
$cache = sys_get_temp_dir() . '/meteocampoli_meteomont_stazioni_' . md5(__FILE__) . '.json';
$ttl = 1800; // 30 minuti: misure manuali, non in tempo reale

if (is_file($cache) && (time() - filemtime($cache)) < $ttl) {
    readfile($cache);
    exit;
}

$body = false;
$http = 0;
if (function_exists('curl_init')) {
    $ch = curl_init($origine);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_USERAGENT => 'MeteoCampoli/1.0 (+https://meteocampoli.altervista.org/)',
        CURLOPT_HTTPHEADER => ['Accept: application/json']
    ]);
    $body = curl_exec($ch);
    $http = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
} else {
    $ctx = stream_context_create(['http' => ['timeout' => 20, 'header' => "Accept: application/json\r\n"]]);
    $body = @file_get_contents($origine, false, $ctx);
    if ($body !== false) { $http = 200; }
}

$lista = $body !== false ? json_decode($body, true) : null;
if ($http >= 200 && $http < 300 && is_array($lista) && count($lista) > 0 && isset($lista[0]['id_staz'])) {
    $risposta = json_encode([
        'fonte' => 'METEOMONT CARABINIERI - stazioni manuali',
        'aggiornamentoServer' => gmdate('c'),
        'stazioni' => $lista
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($risposta !== false) {
        @file_put_contents($cache, $risposta, LOCK_EX);
        echo $risposta;
        exit;
    }
}

// Non fornire una risposta vuota 200: Angular passa al JSON di riserva con avviso esplicito.
http_response_code(502);
echo json_encode([
    'errore' => 'Impossibile recuperare i dati Meteomont',
    'httpOrigine' => $http
], JSON_UNESCAPED_UNICODE);
