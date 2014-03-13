<?php

namespace BWC\Component\JsBundle\Ajax;


class Result implements \JsonSerializable
{
    /** @var  mixed */
    protected $body;

    /** @var  bool */
    protected $success;

    /** @var  string */
    protected $message;

    /** @var string */
    protected $class = '';


    /**
     * @param mixed $body
     * @param bool $success
     * @param string $message
     * @param string $class
     */
    public function __construct($body, $success = true, $message = '', $class = '') {
        $this->body = $body;
        $this->success = (bool)$success;
        $this->message = (string)$message;
        $this->class = (string)$class;
    }

    /**
     * @return mixed
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * @return string
     */
    public function getClass()
    {
        return $this->class;
    }

    /**
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @return boolean
     */
    public function getSuccess()
    {
        return $this->success;
    }





    /**
     * (PHP 5 &gt;= 5.4.0)<br/>
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     */
    public function jsonSerialize()
    {
        return array(
            '_class' => $this->class,
            'success' => $this->success,
            'message' => $this->message,
            'body' => $this->body
        );
    }


} 