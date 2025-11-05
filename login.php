<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'quiz');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['register'])) {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $query = "INSERT INTO users (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    echo "Registration successful! You can now login.";
}

if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $query = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user['username'];
            echo "<script>sessionStorage.setItem('loggedIn', 'true'); window.location.href='quiz.html';</script>";
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "User not found!";
    }
}

if (isset($_GET['logout'])) {
    session_destroy();
    echo "<script>sessionStorage.removeItem('loggedIn'); window.location.href='index.html';</script>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login & Register</title>
    <link rel="stylesheet" href="styles.css">
    <script>
        function showRegister() {
            document.getElementById('register-form').style.display = 'block';
            document.getElementById('login-form').style.display = 'none';
        }
        function showLogin() {
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
        }
    </script>
</head>
<body>
    <div class="container">
        <h2>Login</h2>
        <form id="login-form" method="post">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit" name="login">Login</button>
        </form>
        <button onclick="showRegister()">Register</button>
        
        <div id="register-form" style="display: none;">
            <h2>Register</h2>
            <form method="post">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" name="register">Register</button>
            </form>
            <button onclick="showLogin()">Back to Login</button>
        </div>
    </div>
    <footer>
        <p>&copy; 2025 Quiz Website. All rights reserved.</p>
    </footer>
</body>
<style>
    .container {
        width: 300px;
        margin: auto;
        padding: 20px;
        text-align: center;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #aaa;
    }
    input {
        width: 100%;
        margin: 10px 0;
        padding: 10px;
    }
    button {
        width: 100%;
        padding: 10px;
        background: #007BFF;
        color: white;
        border: none;
        cursor: pointer;
        margin-top: 10px;
    }
    button:hover {
        background: #0056b3;
    }
</style>
</html>
