<?php

/** @var \App\Model\Car[] $cars */
/** @var \App\Service\CarRouter $carRouter */

$title = 'Car List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Cars List</h1>

    <a href="<?= $carRouter->generatePath('car-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($cars as $car): ?>
            <li><h3><?= $car->getBrand() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $carRouter->generatePath('car-show', ['id' => $car->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $carRouter->generatePath('car-edit', ['id' => $car->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
