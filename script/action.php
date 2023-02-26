<?php
try {
    
    switch($_POST['data']['acao']) {

        case 'buscar-dados':
            $handle = curl_init('http://localhost:8080/query');
            $data = ['query' => $_POST['data']['query']];
            $corpo = json_encode($data);
            curl_setopt($handle, CURLOPT_POSTFIELDS,$corpo);
            curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec($handle);
            curl_close($handle);
            echo json_decode($response, true);
            break;
        default:
            echo 'Erro';
        break;
    }

} catch (Exception $e) {
    echo '<pre>';
    print_r($e);
    die;
}
?>