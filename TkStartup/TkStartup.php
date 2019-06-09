<?php

namespace TkStartup;

use Shopware\Components\Plugin;
use Shopware\Components\Plugin\Context\InstallContext;
use Shopware\Components\Plugin\Context\UninstallContext;


class TkStartup extends Plugin
{
    public function install(InstallContext $context){
        $attributeService = $this->container->get('shopware_attribute.crud_service');
        $attributeService->update('s_article_attributes','alt_image','single_selection',[
            'displayInBackend'=> true,
            'entity' => Media::class,
            'label' => 'Alternative image'
        ]);

        $this->container->get('models')->generateAttributeModels(['s_article_attributes']);
        $context->scheduleClearCache(InstallContext::CACHE_LIST_ALL);
    }

    public function uninstall(UninstallContext $context){
        parent::uninstall($context);
    }
}
