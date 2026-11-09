
<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

date_default_timezone_set('Europe/Rome');

$base = 'https://raw.githubusercontent.com/' .
    'opendatasicilia/' .
    'DPC-bollettini-criticita-idrogeologica-idraulica/' .
    'main/data/';

$risultato = [
    'zona' => 'Lazi-G',
    'nomeZona' => 'Bacino del Liri',
    'fonte' => 'Open Data Sicilia / DPC nazionale',
    'verificato' => false,
    'ultimoControllo' => date('c'),
    'oggi' => null,
    'domani' => null,
    'errore' => null
];

function recuperaCsv(string $url): ?string
{
    if (!function_exists('curl_init')) {
        return null;
    }

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_USERAGENT => 'MeteoCampoli/1.0',
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2
    ]);

    $contenuto = curl_exec($ch);
    $http = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if (
        !is_string($contenuto) ||
        $http !== 200 ||
        strlen($contenuto) > 2000000
    ) {
        return null;
    }

    return $contenuto;
}

function coloreDaTesto(string $testo): ?string
{
    $testo = mb_strtoupper(trim($testo), 'UTF-8');

    if (
        strpos($testo, 'ALLERTA ROSSA') !== false
    ) {
        return 'rosso';
    }

    if (
        strpos($testo, 'ALLERTA ARANCIONE') !== false
    ) {
        return 'arancione';
    }

    if (
        strpos($testo, 'ALLERTA GIALLA') !== false
    ) {
        return 'giallo';
    }

    if (
        strpos($testo, 'NESSUNA ALLERTA') !== false ||
        strpos($testo, 'ASSENZA DI FENOMENI') !== false
    ) {
        return 'verde';
    }

    return null;
}

function analizzaCsv(
    string $contenuto,
    string $dataAttesa
): ?array {
    $righe = preg_split('/\r\n|\n|\r/', trim($contenuto));

    if (!$righe || count($righe) < 2) {
        return null;
    }

    $intestazioni = str_getcsv(
        preg_replace('/^\xEF\xBB\xBF/', '', $righe[0])
    );

    $intestazioni = array_map(
        'trim',
        $intestazioni
    );

    $campi = [
        'data_pubblicazione',
        'data_validita_inizio',
        'data_validita_fine',
        'zona_codice',
        'avviso_idrogeologico',
        'avviso_temporali',
        'avviso_idraulico'
    ];

    foreach ($campi as $campo) {
        if (!in_array($campo, $intestazioni, true)) {
            return null;
        }
    }

    $recordValido = null;

    foreach (array_slice($righe, 1) as $riga) {
        if (trim($riga) === '') {
            continue;
        }

        $valori = str_getcsv($riga);

        if (count($valori) !== count($intestazioni)) {
            continue;
        }

        $record = array_combine($intestazioni, $valori);

        if (
            !$record ||
            trim($record['zona_codice']) !== 'Lazi-G'
        ) {
            continue;
        }

        try {
            $inizio = new DateTimeImmutable(
                $record['data_validita_inizio']
            );
            $fine = new DateTimeImmutable(
                $record['data_validita_fine']
            );
            $pubblicazione = new DateTimeImmutable(
                $record['data_pubblicazione']
            );
        } catch (Exception $e) {
            continue;
        }

        $fuso = new DateTimeZone('Europe/Rome');

        if (
            $inizio->setTimezone($fuso)->format('Y-m-d')
                !== $dataAttesa
        ) {
            continue;
        }

        $adesso = new DateTimeImmutable('now', $fuso);

        // Non usare bollettini pubblicati nel futuro.
        if ($pubblicazione > $adesso) {
            continue;
        }

        // Rifiuta periodi di validità incoerenti.
        if ($fine <= $inizio) {
            continue;
        }

        $idro = coloreDaTesto(
            $record['avviso_idrogeologico']
        );

        $temporali = coloreDaTesto(
            $record['avviso_temporali']
        );

        $idraulico = coloreDaTesto(
            $record['avviso_idraulico']
        );

        if (!$idro && !$temporali && !$idraulico) {
            continue;
        }

        $candidato = [
            'data' => $dataAttesa,
            'inizioValidita' => $inizio->format('c'),
            'fineValidita' => $fine->format('c'),
            'pubblicatoIl' => $pubblicazione->format('c'),
            'livelli' => [
                'idrogeologico' => $idro,
                'temporali' => $temporali,
                'idraulico' => $idraulico
            ]
        ];

        // Mantiene la pubblicazione più recente.
        if (
            $recordValido === null ||
            strtotime($candidato['pubblicatoIl']) >
            strtotime($recordValido['pubblicatoIl'])
        ) {
            $recordValido = $candidato;
        }
    }

    return $recordValido;
}

$oggi = new DateTimeImmutable('today');
$domani = $oggi->modify('+1 day');

$giorni = [
    'oggi' => $oggi->format('Y-m-d'),
    'domani' => $domani->format('Y-m-d')
];

foreach ($giorni as $chiave => $data) {
    $nomeFile = 'bollettino-' .
        $chiave . '-zone-latest.csv';

    $contenuto = recuperaCsv($base . $nomeFile);

    if ($contenuto === null) {
        continue;
    }

    $risultato[$chiave] = analizzaCsv(
        $contenuto,
        $data
    );
}

$risultato['verificato'] =
    $risultato['oggi'] !== null ||
    $risultato['domani'] !== null;

if (!$risultato['verificato']) {
    $risultato['errore'] =
        'Dati della Zona G non verificabili. ' .
        'Consultare il bollettino ufficiale.';
}

echo json_encode(
    $risultato,
    JSON_UNESCAPED_UNICODE |
    JSON_UNESCAPED_SLASHES
);
