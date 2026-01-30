<?php
	$inData = getRequestInfo();

	$FirstName = $inData["firstName"];
	$LastName = $inData["lastName"];
	$Phone = $inData["phone"];
	$Email = $inData["email"];
    $UserID = $inData["userID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError( "Failed DB connection: " . $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (FirstName, LastName, Phone, Email, UserID) VALUES(?,?,?,?,?)");
		if (!$stmt) {
			returnWithError("Prepare failed: " . $conn->error);
		}

		$stmt->bind_param("ssssi", $FirstName, $LastName, $Phone, $Email, $UserID);
		if (!$stmt->execute()) {
			returnWithError("Execute failed: " . $stmt->error);
		}

		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>