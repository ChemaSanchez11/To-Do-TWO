<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Repository\TareaRepository;
use App\Entity\Tarea;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api')]
class TareaController extends AbstractController
{
    #[Route('/tareas', name: 'app_tarea')]

    public function Tareas(Request $Request , TareaRepository $repository) {

        $row = $repository->findAll();
        return $this->json($row);
    }

    #[Route('/tareas/nueva', name: 'app_tarea_nueva', methods:['POST'])]

    public function NuevaTarea(Request $request , TareaRepository $repository, ManagerRegistry $doctrine) {

        $entityManager = $doctrine->getManager();


        $tarea = new Tarea();
        $data = json_decode($request->getContent(), true);

        var_dump($data);
        $tarea->setTexto($data["texto"]);
        $datetime = new \DateTime();
        $tarea->setFecha($datetime);
        $tarea->setFinalizada(0);
        $tarea->setVisible(0);

        $entityManager->persist($tarea);
        $entityManager->flush();
        
        $response = new Response();
        $response->setStatusCode(Response::HTTP_OK);
        return $response;

    }
}
