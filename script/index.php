<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <title>Ferramenta</title>
</head>
<body>
    <div class="container" style="margin-top: 100px">
        <div class="card">
            <div class="card-header">
                <h2>Buscar Dados</h2>
            </div>
            <div class="card-body">
                <form id="frmDados" action="action.php" method="POST">
                <div class="form-group">
                    <input type="hidden" id="path" name="data[acao]" value="buscar-dados">
                    <select  class="form-control" name="data[query]" required>
                        <option value=""> -- SELECIONE -- </option>
                        <option value="1">Query 1</option>
                        <option value="2">Query 2</option>
                        <option value="3">Query 3</option>
                        <option value="4">Query 4</option>
                        <option value="5">Query 5</option>
                        <option value="6">Query 6</option>
                    </select>
                </div>
                    <button class="btn btn-primary" id="frm-enviar">Pesquisar</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>