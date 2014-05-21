<?php

namespace BWC\Component\JsBundle\Ajax;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class AjaxJsonResponse extends JsonResponse
{
    public function __construct(Response $response)
    {
        $result = new Result($response->getContent());
        parent::__construct($result, $response->getStatusCode(), $response->headers->all());
    }
} 