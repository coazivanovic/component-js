<?php

namespace BWC\Component\JsBundle\Topic;

use Symfony\Component\Config\Definition\Builder\ArrayNodeDefinition;
use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;
use Symfony\Component\Config\Definition\Processor;


abstract class AbstractOptions implements ConfigurationInterface
{

    /**
     * @param ArrayNodeDefinition $rootNode
     * @return void
     */
    abstract function getConfiguration(ArrayNodeDefinition $rootNode);

    /**
     * @return TreeBuilder
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('options');

        $this->getConfiguration($rootNode);

        return $treeBuilder;
    }


    /**
     * @param array $options
     * @return array
     */
    protected function validateOptions(array $options)
    {
        $processor = new Processor();

        return $processor->processConfiguration($this, array($options));
    }

} 