<?php

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $street = $_POST['street'];
    $house = $_POST['house'];
    $building = $_POST['building'];
    $flat = $_POST['flat'];
    $floor = $_POST['floor'];
    $comments = $_POST['comments'];
    $pay = $_POST['pay-option'];

    $disturb = $_POST['do-not-disturb'];
    $disturb = isset($disturb) ? 'NO' : 'YES';

    $mail_message = '
    <html>
        <head>
            <title>Order</title>
        </head>
        <body>
            <h2>Order</h2>
            <ul>
                <li>Name:' . $name . '</li>
                <li>Tel:' . $phone . '</li>
                <li>Street:' . $street . '</li>
                <li>House:' . $house . '</li>
                <li>Building:' . $building . '</li>
                <li>Flat:' . $flat . '</li>
                <li>Floor:' . $floor . '</li>
                <li>Comments:' . $comments . '</li>
                <li>Payment:' . $pay . '</li>
                <li>Disturb:' . $disturb . '</li>
            </ul>
        </body>
    </html>';

    //echo $mail_message;

    $headers = "From: Burgershop loftschool.com <burgershop332@gmail.com>\r\n".
    "MIMI-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail('fedka.t.a@gmail.com', 'Order', $mail_message, $headers);

    $data = [];

    if ($mail) {
        $data['status'] = "Yes";
        $data['mes'] = "Order accept";
    }else{
        $data['status'] = "No";
        $data['mes'] = "Service dont work right now, please try again later";
    }

    echo json_encode($data);

    /*if ($mail) {
        echo 'Order accept';
    } else {
        echo 'Service dont work right now, try again later';
    }*/

?>