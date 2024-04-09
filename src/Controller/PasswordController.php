<?php

namespace App\Controller;

use Doctrine\ORM\EntityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Password;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class PasswordController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private EntityRepository $repository;
    public $serializer;
    private $encoders;
    private $normalizers;
    //add DI for serializer in Controller
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->repository = $this->entityManager->getRepository(Password::class);
        $this->encoders = [new JsonEncoder()];
        $this->normalizers = [new ObjectNormalizer()];

        $this->serializer = new Serializer($this->normalizers, $this->encoders);
    }
    //http:localhost:8000/password GET
    #[Route('/password', name: 'app_password', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $list = $this->entityManager->getRepository(Password::class)->findAll();
        if (empty($list)) {
            return $this->json(['message' => 'No passwords found']);
        }
        return $this->json(
            json_decode($this->serializer->serialize($list, 'json'))
        );
    }
    //http:localhost:8000/password POST
    #[Route('/password', name: 'app_create_password', methods: ['POST'])]
    public function createPassword(Request $request)
    {
        $userPassword = json_decode($request->getContent());
        $password = new Password();
        if ($userPassword != null) {
            $password->setPassword($userPassword->password);
            $this->entityManager->persist($password);
            $this->entityManager->flush();
            return $this->json(json_decode($this->serializer->serialize($password, 'json')));
        } else {
            return $this->json(['Message' => 'Invalid request'], status: 400);
        }
    }
    //http:localhost:8000/password/1 DELETE
    #[Route('/password/{id}', name: 'app_delete_password', methods: ['DELETE'])]
    public function deletePassword(int $id)
    {
        $password = $this->repository->find($id);
        if ($password != null) {
            $this->entityManager->remove($password);
            $this->entityManager->flush();
            return $this->json(['Message' => 'Password removed']);
        } else {
            return $this->json(['Message' => 'Password does not exist'], status: 400);
        }
    }
    //http:localhost:8000/password/1 GET
    #[Route('/password/{id}', name: 'app_get_password', methods: ['GET'])]
    public function getPassword(int $id)
    {
        $password = $this->repository->find($id);
        if ($password != null) {
            return $this->json($password);
        } else {
            return $this->json(['Message' => 'Password does not exist'], status: 400);
        }
    }
}
