<?php
    $inData = getRequestInfo();

    $searchResults = "";
	$searchCount = 0;

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
    else
    {
        $search = "%" . $inData["search"] . "%";
        $user = $inData["userID"];
        $stmt = $conn->prepare("SELECT * FROM Contacts where userID=:user AND (firstName like :search OR lastName like :search OR email like :search OR phone like :search"); //TODO make sure the field names are right
        //TODO bind parameters?

        $stmt->execute();

        $result = $stmt->get_result();

        while($row = $result->fetch_assoc())
        {
            //don't put comma before first one
            if( $searchCount > 0 )
            {
                $searchResults .= ",";
            }
            $searchCount++;
            //TODO add the result as a JSON object?
            $searchResults .= '{"firstName":"' . $row["firstName"] . '",'
                            . '"lastName":"' . $row["lastName"] . '",'
                            . '"phone":"' . $row["phone"] . '",'
                            . '"email":"' . $row["email"] . '"}';
        }

        if($searchCount == 0) //there were no results
        {
            returnWithError( "No Results" );
        }
        else
        {
            returnWithInfo($searchResults);
        }

        $stmt->close();
        $conn->close();

    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        $retValue = '{"results":[],"error":"' . $err .  '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($searchResults)
    {
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson($retValue);
    }
?>