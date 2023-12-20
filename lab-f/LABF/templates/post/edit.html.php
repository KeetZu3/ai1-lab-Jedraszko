<?php

/** @var \App\Model\Car $car */
/** @var \App\Service\CarRouter $carRouter */

$title = "Edit Car {$car->getBrand()} ({$car->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $carRouter->generatePath('car-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="car-edit">
        <input type="hidden" name="id" value="<?= $car->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $carRouter->generatePath('car-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $carRouter->generatePath('car-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="car-delete">
                <input type="hidden" name="id" value="<?= $car->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
