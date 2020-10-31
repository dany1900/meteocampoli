?php
// 1 - Add some custom headers to response.
header('X-My-Powered-By: Laravel');
header('Access-Control-Allow-Origin: *'); // bad idea
header('X-XSS-Protection: 1; mode=block'); // good idea

// 2 - Modify some headers that already exist
header('Access-Control-Allow-Origin: https://danieldusek.com');
header('Content-Type: application/json');

// 3 - Special usage of header() function to fake-remove header
header('X-My-Powered-By:');

// 4 - Truly remove X-My-Powered-By header
header_remove('X-My-Powered-By');

// 5 - Remove all the headers
header_remove();
?>
