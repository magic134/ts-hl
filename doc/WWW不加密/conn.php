<?php	
	$dbh = new PDO("mysql:host=$servername;dbname=hlyx", $username, $password);
	$dbh->exec('set names utf8');
?>