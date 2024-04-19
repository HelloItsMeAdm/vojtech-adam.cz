<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get database
    require_once 'database.php';
    $db = new Database();

    // Sanitize and escape user inputs
    $fields = ['name', 'surname', 'email', 'phone', 'date', 'time', 'style', 'note'];
    $data = [];
    foreach ($fields as $field) {
        $data[$field] = htmlspecialchars(mysqli_real_escape_string($db->getConnection(), $_POST[$field]));
    }

    // Validate email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        header("Location: ../poptavka.php?error=email");
        exit();
    }

    // Validate input data
    $validationRules = [
        'phone' => '/^[0-9]{9}$/',
        'date' => '/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/',
        'time' => '/^[0-9]{2}:[0-9]{2}$/'
    ];

    foreach ($validationRules as $field => $rule) {
        if (!filter_var($data[$field], FILTER_VALIDATE_REGEXP, ['options' => ['regexp' => $rule]])) {
            header("Location: ../poptavka.php?error=$field");
            exit();
        }
    }

    // Check date and time validity
    try {
        $reservationDateTime = strtotime($data['date'] . ' ' . $data['time']);
        if ($reservationDateTime < strtotime('now')) {
            header("Location: ../poptavka.php?error=dateBeforeNow");
            exit();
        }
    } catch (Exception $e) {
        header("Location: ../error.php?error=invalidDateTime");
        exit();
    }

    // Check if style is selected
    if ($data['style'] === 'none') {
        header("Location: ../poptavka.php?error=style");
        exit();
    }

    // Upload data to database
    $upload = "INSERT INTO reservations (name, surname, email, phone, date, time, style, note) VALUES ('$data[name]', '$data[surname]', '$data[email]', '$data[phone]', '$data[date]', '$data[time]', '$data[style]', '$data[note]')";
    $retrieve = "SELECT r.*, DATE_FORMAT(r.date, '%d.%m.%Y') AS f_date, TIME_FORMAT(r.time, '%H:%i') AS f_time, DATE_FORMAT(r.sent, '%d.%m.%Y') AS f_sent_date, DATE_FORMAT(r.sent, '%H:%i') AS f_sent_time, s.name AS style_name FROM reservations AS r JOIN styles AS s ON s.id = r.style WHERE r.id = LAST_INSERT_ID()";
    $result = $db->insertAndSelect($upload, $retrieve);

    // Check if data was uploaded successfully
    if (!$result) {
        header("Location: ../error.php?error=databaseUpload");
        exit();
    }

    // Set session data
    session_start();
    $_SESSION['result'] = $result;
    unset($_POST);

    // Send confirmation email
    try {
        require_once 'mailer.php';
        $mailer = new EmailHandler();
        $mailer->sendConfirmEmail($result, true);
    } catch (Exception $e) {
        error_log('Error sending confirmation email: ' . $e->getMessage());
    }

    // Return back to the form
    header("Location: ../poptavka.php");
    exit();
} else {
    // Access forbidden
    header("Location: ../poptavka.php");
    exit();
}
?>