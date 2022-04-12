<?php
include "./dbconfig.php";
include "./myfunctions.php";
$get_contents = file_get_contents('php://input');/*read raw data from the request body*/

$phpjson = json_decode($get_contents, true); //reads & converts gotten JSON file into a string
$weekday = date("l");
$daynumber = date("dS");
$monthyear = date("F Y");
$today = "$weekday $daynumber, $monthyear";
$time_now = date('h:i:sa');
//echo $today;

if ($phpjson['forbackend'] == 'register_staff') {
	$insert = mysqli_query($connection, "INSERT INTO staff SET
                firstname   	= '$phpjson[firstname]',
				surname   		= '$phpjson[surname]',
				middlename   	= '$phpjson[middlename]',
				dob   			= '$phpjson[dob]',
				address   		= '$phpjson[address]',	
                email      		= '$phpjson[email]',
                phone   	    = '$phpjson[phone]',
                gender 			= '$phpjson[gender]',
                account_type 	= '$phpjson[account_type]',
                staff_key 		= '$staffkey',
                username 		= '$phpjson[username]',
                password 		= '$phpjson[password]',
                status 			= '$phpjson[status]',
                added_by 		= '$phpjson[added_by]',
                date_joined     = '$today'
				");

	if ($insert) {
		$result = json_encode(array(
			'success' => true,
			'message' => $phpjson['username'] . ' has been registered successfully',
			'payload' => null
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'User Registration Failed',
			'payload' => null
		));
	}
	echo $result;
} elseif ($phpjson['forbackend'] == 'login_owner') {
	$login = mysqli_fetch_array(mysqli_query($connection, "SELECT * FROM owner_db WHERE
			username='$phpjson[username]' AND password = '$phpjson[password]'"));
	$session_data = array(
		'id'        	 => $login['id'],
		'firstname'      => $login['firstname'],
		'middlename'     => $login['middlename'],
		'surname'        => $login['surname'],
		'dob'       	 => $login['dob'],
		'address'		 => $login['address'],
		'phone'			 => $login['phone'],
		'email'	 		 => $login['email'],
		'gender'	 	 => $login['gender'],
		'date_joined'	 => $login['date_joined'],
		'account_type'	 => $login['account_type'],
		'staff_key'	 	 => $login['staff_key'],
		'status'	 	 => $login['status'],
		'username'	 	 => $login['username'],
		'password'		 => $login['password']
	);
	//for login table
	
	if ($login) {
		$login_name = $session_data['firstname'].' '.$session_data['surname'];
		$login_track = mysqli_query($connection, "INSERT INTO login_table SET
		staff_key   	= '$session_data[staff_key]',
		date_logged_in  = '$today',
		time 			= '$time_now',
		account_type    = '$session_data[account_type]',
		name 			= '$login_name'
		");

		$result = json_encode(array(
			'success' => true,
			'message' => 'Login Successful',
			'payload' => $session_data,
			'login'	  => $login['staff_key']
		));
		
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'Incorrect Username or Password',
			'payload' => null
		));
	}
	echo $result;
} elseif ($phpjson['forbackend'] == 'login_staff') {
	$login = mysqli_fetch_array(mysqli_query($connection, "SELECT * FROM staff WHERE
			username='$phpjson[username]' AND password = '$phpjson[password]'"));

	$session_data = array(
		'id'        	 => $login['id'],
		'firstname'      => $login['firstname'],
		'middlename'     => $login['middlename'],
		'surname'        => $login['surname'],
		'dob'       	 => $login['dob'],
		'address'		 => $login['address'],
		'phone'			 => $login['phone'],
		'email'	 		 => $login['email'],
		'gender'	 	 => $login['gender'],
		'date_joined'	 => $login['date_joined'],
		'account_type'	 => $login['account_type'],
		'staff_key'	 	 => $login['staff_key'],
		'status'	 	 => $login['status'],
		'username'	 	 => $login['username'],
		'added_by'	 	 => $login['added_by'],
		'password'		 => $login['password']
	);

	if ($login) {
		$login_name = $session_data['firstname'].' '.$session_data['surname'];
		$login_track = mysqli_query($connection, "INSERT INTO login_table SET
		staff_key   	= '$session_data[staff_key]',
		date_logged_in  = '$today',
		time 			= '$time_now',
		account_type    = '$session_data[account_type]',
		name 			= '$login_name'
		");

		$result = json_encode(array(
			'success' => true,
			'message' => 'Login Successful',
			'payload' => $session_data
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'Incorrect Username or Password',
			'payload' => null
		));
	}
	echo $result;
} elseif ($phpjson['forbackend'] == 'validate_username') {
	$email = mysqli_fetch_array(mysqli_query($connection, "SELECT username FROM user WHERE
			username='$phpjson[username]'"));

	if ($email) {
		$result = json_encode(array(
			'success' => true,
			'message' => 'Username Exists',
			'payload' => null
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'Username Available',
			'payload' => null
		));
	}
	echo $result;
} elseif ($phpjson['forbackend'] == 'upload_image') {
	$insert = mysqli_query($connection, "INSERT INTO user SET
                image_url     	= '$phpjson[image_url]',
				
				WHERE username='$phpjson[username]'
				");
	if ($insert) {
		$result = json_encode(array(
			'success' => true,
			'message' => 'User Registered Successfully',
			'payload' => null
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'User Registration Failed',
			'payload' => null
		));
	}
	echo $result;
} elseif ($phpjson['forbackend'] == 'getAllStaff') {
	$my_staff = array();

	$fetch = mysqli_query($connection, "SELECT * FROM staff");

	while ($rows = mysqli_fetch_array($fetch)) {
		$my_staff[] = array(
			'id'			=> $rows['id'],
			'firstname'		=> $rows['firstname'],
			'surname'		=> $rows['surname'],
			'middlename'	=> $rows['middlename'],
			'dob'			=> $rows['dob'],
			'address'		=> $rows['address'],
			'phone'			=> $rows['phone'],
			'email'			=> $rows['email'],
			'gender'		=> $rows['gender'],
			'date_joined'	=> $rows['date_joined'],
			'account_type'	=> $rows['account_type'],
			'staff_key'		=> $rows['staff_key'],
			'username'		=> $rows['username'],
			'password'		=> $rows['password'],
			'status'		=> $rows['status'],
			'added_by'		=> $rows['added_by']
		);
	}


	if ($fetch) {
		$lenght = sizeof($my_staff);

		$result = json_encode(array(
			'success' => true,
			'message' => 'Employees Loaded Successfully',
			'payload' => $my_staff
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'Error Loading Employees',
			'payload' => null
		));
	}
	echo $result;
} elseif ($phpjson['forbackend'] == 'getStaffById') {
	$my_staff = array();

	$fetch = mysqli_query($connection, "SELECT * FROM staff WHERE
	id='$phpjson[id]'");

	while ($rows = mysqli_fetch_array($fetch)) {
		$my_staff = array(
			'id'			=> $rows['id'],
			'firstname'		=> $rows['firstname'],
			'surname'		=> $rows['surname'],
			'middlename'	=> $rows['middlename'],
			'dob'			=> $rows['dob'],
			'address'		=> $rows['address'],
			'phone'			=> $rows['phone'],
			'email'			=> $rows['email'],
			'gender'		=> $rows['gender'],
			'date_joined'	=> $rows['date_joined'],
			'account_type'	=> $rows['account_type'],
			'staff_key'		=> $rows['staff_key'],
			'username'		=> $rows['username'],
			'password'		=> $rows['password'],
			'status'		=> $rows['status'],
			'added_by'		=> $rows['added_by']
		);
	}


	if ($fetch) {
		$result = json_encode(array(
			'success' => true,
			'message' => 'Employee Loaded Successfully',
			'payload' => $my_staff
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'Error Loading Employees',
			'payload' => null
		));
	}
	echo $result;
} elseif ($phpjson['forbackend'] == 'updateStaffPassword') {

	$update = mysqli_query($connection, "UPDATE staff SET
			password = '$phpjson[password]',
			id = '$phpjson[id]' WHERE id = '$phpjson[id]'");
	if ($update) {
		$result = json_encode(array(
			'success' => true,
			'message' => 'Password Updated Successfully',
			'payload' => null
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'Error Updating Password',
			'payload' => null
		));
	}
	echo $result;
} elseif ($phpjson['forbackend'] == 'updateStaffProfile') {

	$update = mysqli_query($connection, "UPDATE staff SET
			address = '$phpjson[address]',
			dob = '$phpjson[dob]',
			email = '$phpjson[email]',
			firstname = '$phpjson[firstname]',
			gender = '$phpjson[gender]',
			middlename = '$phpjson[middlename]',
			phone = '$phpjson[phone]',
			surname = '$phpjson[surname]',
			username = '$phpjson[username]',
			id = '$phpjson[id]' WHERE id = '$phpjson[id]'");
	if ($update) {
		$result = json_encode(array(
			'success' => true,
			'message' => 'Profile Updated Successfully',
			'payload' => null
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'Error Updating Profile',
			'payload' => null
		));
	}
	echo $result;
} elseif ($phpjson['forbackend'] == 'registerCustomer') {
	$insert = mysqli_query($connection, "INSERT INTO customer SET
                firstname   	= '$phpjson[firstname]',
				surname   		= '$phpjson[surname]',
				middlename   	= '$phpjson[middlename]',
				dob   			= '$phpjson[dob]',
				address   		= '$phpjson[address]',	
                email      		= '$phpjson[email]',
                phone   	    = '$phpjson[phone]',
                gender 			= '$phpjson[gender]',
                account_type 	= '$phpjson[account_type]',
                customer_key 	= '$customer',
                status 			= '$phpjson[status]',
                added_by 		= '$phpjson[added_by]',
                bank_name 		= '$phpjson[bank_name]',
                bank_account_number 	= '$phpjson[bank_account_number]',
                bank_account_type 		= '$phpjson[bank_account_type]',
                credit_status 		= '$phpjson[credit_status]',
                date_joined     = '$today'
				");

	if ($insert) {
		$result = json_encode(array(
			'success' => true,
			'message' => $phpjson['firstname'] ." ". $phpjson['surname'] . ' has been registered successfully',
			'payload' => null
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'User Registration Failed',
			'payload' => null
		));
	}
	echo $result;

} elseif ($phpjson['forbackend'] == 'getLogDetails') {
	$my_staff = array();
	$fetch = mysqli_query($connection, "SELECT * FROM login_table WHERE staff_key='$phpjson[staffkey]'");

	while ($rows = mysqli_fetch_array($fetch)) {
		$my_staff[] = array(
			'date'			=> $rows['date_logged_in'],
			'account_type'	=> $rows['account_type'],
			'staff_key'		=> $rows['staff_key'],
			'name'			=> $rows['name'],
			'time'			=> $rows['time']
		);
	}

	if ($fetch) {
		$result = json_encode(array(
			'success' => true,
			'message' => 'Login Details Loaded Successfully',
			'payload' => $my_staff
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'Error Loading Login Details',
			'payload' => null
		));
	}
	echo $result;
} elseif ($phpjson['forbackend'] == 'getAllCustomers') {
	$my_customers = array();
	$all_customers = mysqli_query($connection,  "SELECT * FROM customer");

	while ($rows = mysqli_fetch_array($all_customers)) {
		$my_customers[] = array(
			'id'					=> $rows['id'],
			'firstname'				=> $rows['firstname'],
			'surname'				=> $rows['surname'],
			'middlename'			=> $rows['middlename'],
			'address'				=> $rows['address'],
			'phone'					=> $rows['phone'],
			'gender'				=> $rows['gender'],
			'account_type'			=> $rows['account_type'],
			'status'				=> $rows['status'],
			'added_by'				=> $rows['added_by'],
			'dob'					=> $rows['dob'],
			'email'					=> $rows['email'],
			'customer_key'			=> $rows['customer_key'],
			'date_joined'			=> $rows['date_joined'],
			'bank_name'				=> $rows['bank_name'],
			'bank_account_number'	=> $rows['bank_account_number'],
			'bank_account_type'		=> $rows['bank_account_type'],
			'credit_status'			=> $rows['credit_status']
		);
	}
	if ($all_customers) {
		$result = json_encode(array(
			'success' => true,
			'message' => 'Customers Loaded Successfully',
			'payload' => $my_customers
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'Error Disabling User',
			'payload' => null
		));
	}
	echo $result;
} elseif ($phpjson['forbackend'] == 'updateStaff') {
	$update = mysqli_query($connection, "UPDATE staff SET
			address = '$phpjson[address]',
			dob = '$phpjson[dob]',
			email = '$phpjson[email]',
			firstname = '$phpjson[firstname]',
			gender = '$phpjson[gender]',
			middlename = '$phpjson[middlename]',
			phone = '$phpjson[phone]',
			surname = '$phpjson[surname]',
			username = '$phpjson[username]'
			WHERE id = '$phpjson[id]'");

	if ($update) {
		$result = json_encode(array(
			'success' => true,
			'message' => 'Profile Updated Successfully',
			'payload' => null
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'Error Updating Profile',
			'payload' => null
		));
	}
	echo $result;
}  elseif ($phpjson['forbackend'] == 'disableStaffLogin') {

	$update = mysqli_query($connection, "UPDATE staff SET
			status = '$phpjson[status]' 
			WHERE id = '$phpjson[id]'
			");

	if ($update) {
		$result = json_encode(array(
			'success' => true,
			'message' => 'User Disabled Successfully',
			'payload' => null
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'Error Disabling User',
			'payload' => null
		));
	}
	echo $result;
} elseif ($phpjson['forbackend'] == 'deleteStaff') {
	$delete = mysqli_query($connection, "DELETE FROM staff WHERE
			id = '$phpjson[id]'
			");
	if ($delete) {
		$result = json_encode(array(
			'success' => true,
			'message' => 'User Deleted Successfully',
			'payload' => null
		));
	} else {
		$result = json_encode(array(
			'success' => false,
			'message' => 'Error Disabling User',
			'payload' => null
		));
	}
	echo $result;
}
