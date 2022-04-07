<?php
	$permitted_chars = '123456789';
	 
	function generate_string($input, $strength = 33) {
		$input_length = strlen($input);
		$random_string = '';
		for($i = 0; $i < $strength; $i++) {
			$random_character = $input[mt_rand(0, $input_length - 1)];
			$random_string .= $random_character;
		}
	 
		return $random_string;
	}
	
	$staffkey = "staff".generate_string($permitted_chars, 4);
	//echo "parent key".$staffkey .'<br>';
	
	
	
	$forserial_chars= '123456789';
	function generate_serial($input, $strenght = 20) {
		$input_len = strlen($input);
		$random_string = '';
		for ($i=0; $i < $strenght; $i++) {
			$randomchar = $input[mt_rand(0, $input_len - 1)];
			$random_string .= $randomchar;
		}
		return $random_string;
	}
	$customer = "cust".generate_serial($forserial_chars, 4);
	$supplier = "suppl".generate_serial($forserial_chars, 5)
	//echo "serial key".$serialkey.'<br>';
	
?>