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

    public function tareas(Request $Request , TareaRepository $repository) {

        $row = $repository->findAll();
        return $this->json($row);
    }

    #[Route('/tareas/nueva', name: 'app_tarea_nueva', methods:['POST'])]

    public function nueva(Request $request , TareaRepository $repository, ManagerRegistry $doctrine) {

        $entityManager = $doctrine->getManager();


        $tarea = new Tarea();
        $data = json_decode($request->getContent(), true);
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
    #[Route('/tareas/editar/{id}', name: 'app_tarea_editar', methods:['POST'])]

    public function editar( $id, Request $request , TareaRepository $repository, ManagerRegistry $doctrine) {

        $entityManager = $doctrine->getManager();
        $tarea = $repository->find($id);

        if (!$tarea) {
            throw $this->createNotFoundException(
                'No tarea found for id '.$id
            );
        }

        $data = json_decode($request->getContent(), true);
        $tarea->setTexto($data["texto"]);
        
        $entityManager->flush();
        $response = new Response();
        $response->setStatusCode(Response::HTTP_OK);
        return $response;

    }
}
