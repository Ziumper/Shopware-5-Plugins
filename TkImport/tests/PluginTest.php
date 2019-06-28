<?php

namespace TkImport\Tests;

use TkImport\TkImport as Plugin;
use Shopware\Components\Test\Plugin\TestCase;

class PluginTest extends TestCase
{
    protected static $ensureLoadedPlugins = [
        'TkImport' => []
    ];

    public function testCanCreateInstance()
    {
        /** @var Plugin $plugin */
        $plugin = Shopware()->Container()->get('kernel')->getPlugins()['TkImport'];

        $this->assertInstanceOf(Plugin::class, $plugin);
    }
}
