<?php

/** @var \App\Model\Car $car */
/** @var \App\Service\CarRouter $carRouter */

$title = "{$car->getBrand()} ({$car->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $car->getBrand() ?></h1>
    <article>
        <?= $car->getDescription(); ?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $carRouter->generatePath('car-index') ?>">Back to list</a></li>
        <li><a href="<?= $carRouter->generatePath('car-edit', ['id'=> $car->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
