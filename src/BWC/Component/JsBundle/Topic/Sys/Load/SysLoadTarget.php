<?php

namespace BWC\Component\JsBundle\Topic\Sys\Load;

use BWC\Component\JsBundle\Topic\AbstractOptions;
use MyProject\Proxies\__CG__\OtherProject\Proxies\__CG__\stdClass;
use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;


class SysLoadTarget extends AbstractOptions implements \JsonSerializable
{
    /** @var string */
    protected $target;

    /** @var string  */
    protected $url;

    /** @var array  */
    protected $options;


    /**
     * @param string $target jQuery selector for the element to load
     * @param string $url
     * @param array $options
     */
    public function __construct($target, $url, array $options = array())
    {
        $this->target = $target;
        $this->url = $url;
        $this->options = $this->validateOptions($options);
    }

    /**
     * @param ArrayNodeDefinition $rootNode
     * @return void
     */
    function getConfiguration(ArrayNodeDefinition $rootNode)
    {
        $rootNode->children()
            ->arrayNode('onSuccess')->addDefaultsIfNotSet()->end()
            ->arrayNode('onFail')->addDefaultsIfNotSet()->end()
            ->arrayNode('ajax')->addDefaultsIfNotSet()
                ->children()
                    ->integerNode('timeout')->min(0)->end()
                    ->arrayNode('data')->end()
                    ->arrayNode('headers')->end()
                    ->enumNode('type')->values(array('GET', 'POST'))->end()
                ->end()
            ->end()
        ->end();
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
        $result = array(
            'target' => $this->target,
            'url' => $this->url,
            'ajax' => (object)$this->options['ajax'],
            'onSuccess' => $this->options['onSuccess'],
            'onFail' => $this->options['onFail']
        );

        return $result;
    }


} 