<?php
header('Content-type: application/json');

//NOTE: this has to be run on atomicbee.com to work with this client id

$client = "";
$query = $_POST['q'];


function get_curl($url) {
    if(function_exists('curl_init')) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); 
        $output = curl_exec($ch);
        echo curl_error($ch);
        curl_close($ch);
        return $output;
    } else{
        return file_get_contents($url);
    }
}

$response = get_curl("https://api.instagram.com/v1/tags/".$query."/media/recent?client_id=".$client);
$images = array();


if($response){
	foreach(json_decode($response)->data as $item){		
        $image = $item->images->standard_resolution->url;
		$url = $item->link;
		
        $images[] = array(
        "image" => htmlspecialchars($image),
        "url" => htmlspecialchars($url)
        );

    }
   
}

print_r(str_replace('\\/', '/', json_encode($images)));
die();
?>
