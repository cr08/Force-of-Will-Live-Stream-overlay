<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Accept, Content-Type, Authorization");

$json_cardid = $_GET['id'];
$time = time();
$json_timestamp = json_decode($time);

$json_array = Array (

	"card" => "$json_cardid",
	"timestamp" => "$json_timestamp",
	"jflip" => "$json_jflip"

);

if ($json_cardid == "XYZ-1234") {
	$json_array = Array (

		"",
		"$json_cardid",
		"",
		"",
		"",
		"$time"	
	);
	$newArray = json_encode($json_array);
} else {

	$request_body = file_get_contents('php://input');
	$data = json_decode($request_body);

	$remoteImageUrl = $data[3];
	$localFilePath = '../static/img/cards/'.$data[2]; // Specify the local path where you want to save the image

	$remoteMd5 = md5_file($remoteImageUrl);
	$localMd5 = md5_file($localFilePath);

	if ($remoteMd5 !== $localMd5) {
		if (copy($remoteImageUrl, $localFilePath)) {
			echo "Local file updated with the new image.";
		} else {
			echo "Error updating the local file.";
		}
	}

	$oldArray = json_decode($request_body, true);
	$oldArray[] = $time;

	$newArray = json_encode($oldArray);

}

$myFile = 'data.json';
file_put_contents($myFile, $newArray);

?>