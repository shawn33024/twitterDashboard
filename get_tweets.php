<?php
//ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
$url = 'https://api.twitter.com/oauth2/token';

$ch = curl_init();

curl_setopt($ch,CURLOPT_URL, $url);
curl_setopt($ch,CURLOPT_POST, 1);
curl_setopt($ch,CURLOPT_POSTFIELDS, http_build_query(array(
    'grant_type' => 'client_credentials'
)));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/x-www-form-urlencoded;charset=UTF-8',
    'Authorization: Basic TndWbkdKcTJvR0tzdmJZdTlVdUtwZWtNZjpGT0pva0NFcEJMejdpRkx4a1VyWURWc24ySENmaDdZUkJwalRzcllrMVA0WVdoV3piMw==',
    'Host: api.twitter.com'
    ));
curl_setopt($ch,CURLOPT_RETURNTRANSFER, TRUE);


$result = json_decode(curl_exec($ch));
curl_close($ch);

$ch = curl_init();

$url = 'https://api.twitter.com/1.1/search/tweets.json?q=' . $_POST['data'] . '&count=50&lang=en';

curl_setopt($ch,CURLOPT_URL, $url);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: Bearer ' . $result->access_token,
    'Host: api.twitter.com'
    ));
curl_setopt($ch,CURLOPT_RETURNTRANSFER, TRUE);

$result = json_decode(curl_exec($ch));
curl_close($ch);

echo (json_encode($result));

}


