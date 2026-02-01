<?php
	$inData = getRequestInfo();

	$ID = $inData["ID"];
    $UserID = $inData["userID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError( "Failed DB connection: " . $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE ID = ? and UserID = ?");
		if (!$stmt) {
			returnWithError("Prepare failed: " . $conn->error);
		}

		$stmt->bind_param("ii", $ID, $UserID);
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