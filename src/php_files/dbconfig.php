<?php
    define ('DB_NAME', 'danielfa_kay_enterprise');
    define ('DB_USER', 'danielfa_vots');
    define ('DB_PASSWORD', 'Gambitwap@6');
    define ('DB_HOST', 'localhost');
    
    $connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    date_default_timezone_set("Africa/Lagos");

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, Authorization, Accept, X-Requested-With, x-xsrf-token");
    header("Content-Type: application/json; charset=UTF-8");
    ?>

    <?

    /*
    /// Uncomment this for localhost(offline) test ///



    define ('DB_NAME', 'kay_enterprise');
    define ('DB_USER', 'root');
    define ('DB_PASSWORD', '');
    define ('DB_HOST', 'localhost');
    
    $connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    date_default_timezone_set("Africa/Lagos");

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, Authorization, Accept, X-Requested-With, x-xsrf-token");
    header("Content-Type: application/json; charset=UTF-8");
    */

    ?>