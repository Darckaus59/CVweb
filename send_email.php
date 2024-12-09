<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Adresse email où le message sera envoyé
    $to = "arthur.goddefroy.etu@univ-lille.fr";

    // Sujet de l'email
    $subject = "Nouveau message de $name";

    // Contenu de l'email
    $body = "Vous avez reçu un nouveau message :\n\n";
    $body .= "Nom : $name\n";
    $body .= "Email : $email\n\n";
    $body .= "Message :\n$message\n";

    // En-têtes pour l'email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Envoi de l'email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message envoyé avec succès.";
    } else {
        echo "Une erreur s'est produite. Veuillez réessayer.";
    }
} else {
    echo "Méthode non autorisée.";
}
?>
