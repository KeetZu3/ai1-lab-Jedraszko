<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'autoload.php';

$config = new \App\Service\Config();

$templating = new \App\Service\Templating();
$carRouter = new \App\Service\CarRouter();

try {
    $action = $_REQUEST['action'] ?? null;

    switch ($action) {
        case 'car-index':
        case null:
            $carController = new \App\Controller\CarController();
            $view = $carController->indexAction($templating, $carRouter);
            break;
        case 'car-create':
            $carController = new \App\Controller\CarController();
            $view = $carController->createAction($_REQUEST['car'] ?? null, $templating, $carRouter);
            break;
        case 'car-edit':
            if (! $_REQUEST['id']) {
                break;
            }
            $carController = new \App\Controller\CarController();
            $view = $carController->editAction($_REQUEST['id'], $_REQUEST['car'] ?? null, $templating, $carRouter);
            break;
        case 'car-show':
            if (! $_REQUEST['id']) {
                break;
            }
            $carController = new \App\Controller\CarController();
            $view = $carController->showAction($_REQUEST['id'], $templating, $carRouter);
            break;
        case 'car-delete':
            if (! $_REQUEST['id']) {
                break;
            }
            $carController = new \App\Controller\CarController();
            $view = $carController->deleteAction($_REQUEST['id'], $carRouter);
            break;
        case 'info':
            $infoController = new \App\Controller\InfoController();
            $view = $infoController->infoAction();
            break;
        default:
            $view = 'Not found';
            break;
    }

    if ($view) {
        echo $view;
    }
} catch (\Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
