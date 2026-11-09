<?php
// Meteo Campoli - Test stazioni di lancio SondeHub
// PHP 8.0. Non modifica le API esistenti.
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function outputJson($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}

function getJson($url) {
    if (!function_exists('curl_init')) return array('errore' => 'Estensione cURL assente');
    $ch = curl_init($url);
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 3,
        CURLOPT_REDIR_PROTOCOLS => CURLPROTO_HTTPS,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 18,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
        CURLOPT_ENCODING => '',
        CURLOPT_USERAGENT => 'MeteoCampoli/1.0 (site launch lookup)'
    ));
    $body = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    if (!is_string($body) || $status !== 200) {
        return array('errore' => 'HTTP remoto ' . $status . ($err ? ': ' . $err : ''));
    }
    if (strlen($body) > 12000000) return array('errore' => 'Risposta troppo grande');
    $json = json_decode($body, true);
    if (!is_array($json)) return array('errore' => 'JSON remoto non valido');
    return array('dati' => $json);
}

function italia($stazione) {
    $nome = (string)($stazione['station_name'] ?? '');
    // Priorità alla nazione esplicitamente dichiarata nel nome.
    if (preg_match('/\((?:Italy|Italia|IT)\)/i', $nome)) return true;
    if (preg_match('/\((?:France|Austria|Slovenia|Switzerland|Croatia|Malta|San Marino|Vatican)\)/i', $nome)) return false;
    // Candidati geografici: da verificare, NON classificazione ufficiale.
    $pos = $stazione['position'] ?? null; // SondeHub: [longitudine, latitudine]
    return is_array($pos) && count($pos) >= 2 && is_numeric($pos[0]) && is_numeric($pos[1])
        && $pos[0] >= 6.5 && $pos[0] <= 18.6 && $pos[1] >= 35.4 && $pos[1] <= 47.2;
}

$sites = getJson('https://api.v2.sondehub.org/sites');
if (isset($sites['errore'])) outputJson(array('errore' => 'Lettura /sites: ' . $sites['errore']), 502);

$italiane = array();
foreach ($sites['dati'] as $id => $s) {
    if (!is_array($s) || !italia($s)) continue;
    $pos = $s['position'] ?? array(null, null);
    $italiane[(string)$id] = array(
        'id' => (string)$id,
        'nome' => (string)($s['station_name'] ?? $id),
        'latitudine' => $pos[1] ?? null,
        'longitudine' => $pos[0] ?? null,
        'classificazione' => preg_match('/\((?:Italy|Italia|IT)\)/i', (string)($s['station_name'] ?? ''))
            ? 'Paese indicato nella scheda' : 'Candidato geografico da verificare'
    );
}

uasort($italiane, function($a, $b) { return strcasecmp($a['nome'], $b['nome']); });
$site = isset($_GET['site']) ? trim((string)$_GET['site']) : '';
if ($site === '') {
    outputJson(array(
        'fonte' => 'SondeHub /sites',
        'numeroStazioniCandidate' => count($italiane),
        'nota' => 'Le stazioni selezionate solo per coordinate devono essere verificate.',
        'stazioni' => array_values($italiane),
        'istruzioni' => 'Richiamare ?site=ID usando un id restituito qui.'
    ));
}
if (!isset($italiane[$site])) outputJson(array('errore' => 'ID non presente tra le stazioni italiane candidate'), 400);

$last = isset($_GET['last']) ? (int)$_GET['last'] : 172800;
$last = max(3600, min(604800, $last));
$remote = getJson('https://api.v2.sondehub.org/sondes/site/' . rawurlencode($site) . '?last=' . $last);
if (isset($remote['errore'])) outputJson(array('errore' => 'Lettura /sondes/site: ' . $remote['errore'], 'stazione' => $italiane[$site]), 502);

$lanci = array();
foreach ($remote['dati'] as $seriale => $record) {
    if (!is_array($record)) continue;
    $candidati = array();
    if (isset($record['datetime'])) $candidati[] = $record;
    else foreach ($record as $r) if (is_array($r) && isset($r['datetime'])) $candidati[] = $r;
    $ultimo = null;
    $maxTime = 0;
    foreach ($candidati as $r) {
        $ts = strtotime((string)$r['datetime']);
        if ($ts === false || $ts < $maxTime) continue;
        $maxTime = $ts;
        $ultimo = $r;
    }
    if ($ultimo === null) continue;
    $lanci[] = array(
        'seriale' => (string)$seriale,
        'ultimaOsservazioneUtc' => gmdate('Y-m-d\TH:i:s\Z', $maxTime),
        'quotaUltimaOsservazione' => isset($ultimo['alt']) && is_numeric($ultimo['alt']) ? round((float)$ultimo['alt'], 1) : null,
        'tipo' => $ultimo['type'] ?? null,
        'urlProfilo' => '/assets/php/sondehub-profilo.php?seriale=' . rawurlencode((string)$seriale)
    );
}
usort($lanci, function($a, $b) { return strcmp($b['ultimaOsservazioneUtc'], $a['ultimaOsservazioneUtc']); });
outputJson(array(
    'fonte' => 'SondeHub /sondes/site',
    'stazione' => $italiane[$site],
    'finestraOre' => $last / 3600,
    'numeroLanciRilevati' => count($lanci),
    'lanci' => array_slice($lanci, 0, 15),
    'nota' => 'Data dell ultima osservazione disponibile, non necessariamente ora di lancio. Nessuna disponibilità non implica assenza di lanci.'
));
