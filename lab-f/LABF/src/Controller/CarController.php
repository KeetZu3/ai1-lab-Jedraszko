<?php
namespace App\Controller;

//use App\Exception\NotFoundException;
//use App\Model\Post;
//use App\Service\Router;
//use App\Service\Templating;

use App\Exception\NotFoundException;
use App\Model\Car;
use App\Service\CarRouter;
use App\Service\Templating;

class CarController
{
    public function indexAction(Templating $templating, CarRouter $carRouter): ?string
    {
        $cars = Car::findAll();
        $html = $templating->render('post/index.html.php', [
            'cars' => $cars,
            'carRouter' => $carRouter,
        ]);
        return $html;
    }

    public function createAction(?array $requestPost, Templating $templating, CarRouter $carRouter): ?string
    {
        if ($requestPost) {
            $car = Car::fromArray($requestPost);
            // @todo missing validation
            $car->save();

            $path = $carRouter->generatePath('car-index');
            $carRouter->redirect($path);
            return null;
        } else {
            $car = new Car();
        }

        $html = $templating->render('post/create.html.php', [
            'car' => $car,
            'carRouter' => $carRouter,
        ]);
        return $html;
    }

    public function editAction(int $carId, ?array $requestPost, Templating $templating, CarRouter $carRouter): ?string
    {
        $car = Car::find($carId);
        if (!$car) {
            throw new NotFoundException("Missing car with id $carId");
        }

        if ($requestPost) {
            $car->fill($requestPost);
            // @todo missing validation
            $car->save();

            $path = $carRouter->generatePath('car-index');
            $carRouter->redirect($path);
            return null;
        }

        $html = $templating->render('post/edit.html.php', [
            'car' => $car,
            'carRouter' => $carRouter,
        ]);
        return $html;
    }

    public function showAction(int $carId, Templating $templating, CarRouter $carRouter): ?string
    {
        $car = Car::find($carId);
        if (!$car) {
            throw new NotFoundException("Missing car with id $carId");
        }

        $html = $templating->render('post/show.html.php', [
            'car' => $car,
            'carRouter' => $carRouter,
        ]);
        return $html;
    }

    public function deleteAction(int $carId, CarRouter $carRouter): ?string
    {
        $car = Car::find($carId);
        if (!$car) {
            throw new NotFoundException("Missing car with id $carId");
        }

        $car->delete();
        $path = $carRouter->generatePath('car-index');
        $carRouter->redirect($path);
        return null;
    }
}
