<?php
/** @var \App\Service\CarRouter|null $carRouter */

?>
<ul>
    <li><a href="<?= $carRouter ? $carRouter->generatePath('') : ''; ?>">Home</a></li>
    <li><a href="<?= $carRouter ? $carRouter->generatePath('car-index') : ''; ?>">Cars</a></li>
</ul>
