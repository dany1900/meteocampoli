
<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=900');

date_default_timezone_set('Europe/Rome');

function verificaPdf($url) {
    if (!function_exists('curl_init')) {
        return false;
    }

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_NOBODY => true,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 8,
        CURLOPT_USERAGENT => 'MeteoCampoli/1.0'
    ]);

    curl_exec($ch);

    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

    curl_close($ch);

    return $status === 200 &&
        (
            !$type ||
            stripos($type, 'pdf') !== false ||
            stripos($type, 'octet-stream') !== false
        );
}

$risultato = [
    'disponibile' => false,
    'zona' => 'G',
    'nomeZona' => 'Bacino del Liri',
    'dataBollettino' => null,
    'urlPdf' => null,
    'livelliVerificati' => false,
    'messaggio' => 'Bollettino non disponibile'
];

$oggi = new DateTimeImmutable('today');

// Cerca il documento odierno e, in alternativa,
// quelli dei tre giorni precedenti.
for ($i = 0; $i <= 3; $i++) {

    $giorno = $oggi->modify("-{$i} days");

    $anno = $giorno->format('Y');
    $nome = 'bollettino_' . $giorno->format('d_m_Y') . '.pdf';

    $url =
        'https://www.regione.lazio.it/sites/default/files/' .
        'criticita-idrogeologica/' .
        $anno . '/' . $nome;

    if (verificaPdf($url)) {
        $risultato['disponibile'] = true;
        $risultato['dataBollettino'] =
            $giorno->format('Y-m-d');
        $risultato['urlPdf'] = $url;

        $risultato['messaggio'] =
            $i === 0
            ? 'Documento odierno disponibile'
            : 'Documento precedente: verificare la validità';

        break;
    }
}

echo json_encode(
    $risultato,
    JSON_UNESCAPED_UNICODE |
    JSON_UNESCAPED_SLASHES
);
