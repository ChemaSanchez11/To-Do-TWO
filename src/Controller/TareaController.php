<?php

namespace App\Controller;

use App\Entity\Tarea;
use App\Form\TareaType;
use App\Repository\TareaRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\Common\Persistence\ManagerRegistry;
/**
 * @Route("/api")
 */
class TareaController extends AbstractController
{
    /**
     * @Route("/tarea", name="app_tarea", methods={"GET"})
     */
    public function index(TareaRepository $tareaRepository): Response
    {
        // return $this->render('tarea/index.html.twig', [
        //     'tareas' => $tareaRepository->findAll(),
            
            
        // ]);
        $tareas = [];
        foreach ($tareaRepository->findAll() as $tarea){
            $t1 = [];
            $t1['texto'] = $tarea->getTexto();
            $t1['fecha'] = $tarea->getFecha();
            $t1['finalizada'] = $tarea->isFinalizada();
            $t1['visible'] = $tarea->isVisible();

            $tareas[]=$t1;
        }
        
        // for($i=0;$i<$tareaRepository->findAll().count();$i++){
        //     $t1[$i]= $tareaRepsository->findAll()[$i];


        // }

        return new JsonResponse($tareas);
        
    }
    /**
     * @Route("/tarea/borrar/{$id}", name="app_tarea", methods={"DELETE"})
     */
    public function borrar(ManagerRegistry $doctrine ,$id): Response
    {
        $entityManager = $doctrine->getManager();
        $tarea = $entityManager->getRepository(Tarea::class)->find($id);

        if (!$tarea) {
            throw $this->createNotFoundException(
                'No existe esa tarea con id: '.$id
            );
        }else{
            $entityManager->remove($tarea);
            $entityManager->flush();
        }
        $response = new Response;
        $response->setStatusCode(Response::HTTP_OK);

        return $response->send();
    }
}