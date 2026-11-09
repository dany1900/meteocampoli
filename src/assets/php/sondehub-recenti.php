
<?php
declare(strict_types=1);

// Meteo Campoli - telemetria SondeHub nell'area di Pratica di Mare.
// NON certifica la stazione di lancio e NON sostituisce NOAA IGRA.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=600');
date_default_timezone_set('Europe/Rome');

$out = [
    'fonte' => 'SondeHub v2 - telemetria ricevuta da stazioni di ascolto',
    'aggiornatoIl' => gmdate('Y-m-d\TH:i:s\Z'),
    'raggioKm' => 180,
    'durataOre' => 24,
    'sonde' => [],
    'errore' => null
];

function numero($v, float $min, float $max): ?float {
    if (!is_numeric($v)) return null;
    $n = (float)$v;
    return is_finite($n) && $n >= $min && $n <= $max ? $n : null;
}
function tempoUtc($v): ?string {
    if (!is_string($v) || strlen($v) > 60) return null;
    $t = strtotime($v);
    if ($t === false || $t > time() + 300 || $t < time() - 86400 - 600) return null;
    return gmdate('Y-m-d\TH:i:s\Z', $t);
}

// Endpoint SondeHub: sonde ricevute entro 180 km da un punto,
// negli ultimi 86400 secondi. NON equivale a un elenco di lanci da quel punto.
$url = 'https://api.v2.sondehub.org/sondes?lat=41.65&lon=12.45&distance=180000&last=86400';
if (!function_exists('curl_init')) {
    http_response_code(503);
    $out['errore'] = 'Estensione cURL non disponibile.';
    echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 6,
    CURLOPT_TIMEOUT => 16,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_ENCODING => '',
    CURLOPT_USERAGENT => 'MeteoCampoli/1.0 (radiosonde monitoring)',
]);
$body = curl_exec($ch);
$http = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);
if (!is_string($body) || strlen($body) > 4000000 || $http !== 200) {
    http_response_code(502);
    $out['errore'] = 'SondeHub non raggiungibile (HTTP ' . $http . '). ' . ($error ? 'Connessione non riuscita.' : '');
    echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
$dataset = json_decode($body, true);
if (!is_array($dataset)) {
    http_response_code(502);
    $out['errore'] = 'SondeHub ha restituito dati non interpretabili.';
    echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$lista = [];
foreach ($dataset as $serial => $valori) {
    if (!is_string($serial) || !preg_match('/^[A-Za-z0-9_.-]{3,64}$/', $serial)) continue;
    if (!is_array($valori)) continue;

    // La risposta /sondes di norma contiene un oggetto telemetrico per ogni
    // seriale; alcune implementazioni inviano invece { timestamp: oggetto }.
    $candidati = [];
    if (isset($valori['lat'], $valori['lon'])) {
        $candidati[] = $valori;
    } else {
        foreach ($valori as $entry) {
            if (is_array($entry) && isset($entry['lat'], $entry['lon'])) $candidati[] = $entry;
        }
    }
    $migliore = null;
    $tsMigliore = 0;
    foreach ($candidati as $v) {
        $lat = numero($v['lat'] ?? null, -90, 90);
        $lon = numero($v['lon'] ?? null, -180, 180);
        $time = tempoUtc($v['datetime'] ?? null);
        if ($lat === null || $lon === null || $time === null) continue;
        $ts = strtotime($time);
        if ($ts === false || $ts < $tsMigliore) continue;
        $tsMigliore = $ts;
        $migliore = [
            'seriale' => $serial,
            'dataUtc' => $time,
            'latitudine' => $lat,
            'longitudine' => $lon,
            'quota' => numero($v['alt'] ?? null, -500, 50000),
            'temperatura' => numero($v['temp'] ?? null, -120, 70),
            'umidita' => numero($v['humidity'] ?? null, 0, 100),
            'pressione' => numero($v['pressure'] ?? null, 0, 1100),
            'url' => 'https://sondehub.org/' . rawurlencode($serial),
        ];
    }
    if ($migliore !== null) $lista[] = $migliore;
}
usort($lista, static function ($a, $b): int { return strcmp($b['dataUtc'], $a['dataUtc']); });
$out['sonde'] = array_slice($lista, 0, 12);
echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
