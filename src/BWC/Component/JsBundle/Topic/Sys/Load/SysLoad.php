<?php

namespace BWC\Component\JsBundle\Topic\Sys\Load;

class SysLoad implements \JsonSerializable
{
    /** @var  SysLoadTarget[] */
    private $targets;

    /**
     * @param SysLoadTarget|SysLoadTarget[] $targets
     * @throws \InvalidArgumentException
     */
    public function __construct($targets)
    {
        if ($targets instanceof SysLoadTarget) {
            $this->targets = array($targets);
        } else if (is_array($targets)) {
            $this->targets = array();
            foreach ($targets as $t) {
                if (! $t instanceof SysLoadTarget) {
                    throw new \InvalidArgumentException('Expected SysLoadTarget');
                }
                $this->targets[] = $t;
            }
        } else {
            throw new \InvalidArgumentException('Expected SysLoadTarget or array of SysLoadTarget');
        }
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
        return $this->targets;
    }


}
