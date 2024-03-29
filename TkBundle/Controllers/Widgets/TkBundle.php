<?php

use TkBundle\Bundle\StoreFrontBundle\BundleService;
use TkBundle\Bundle\StoreFrontBundle\Struct\Bundle;

class Shopware_Controllers_Widgets_TkBundle extends Enlight_Controller_Action
{
    public function addBundleAction()
    {
        $bundleId = $this->Request()->getParam('bundleId', null);
        if (empty($bundleId)) {
            throw new \Exception('No bundle id passed!');
        }

        $bundle = new Bundle();
        $bundle->setId($bundleId);

        /** @var BundleService $bundleService */
        $bundleService = $this->get('tk_bundle.bundle_service');
        $productNumbersByBundle = $bundleService->getProductNumbersByBundle($bundle);

        /** @var Shopware_Components_Modules $moduleManager */
        $moduleManager = $this->container->get('modules');
        $sBasket = $moduleManager->getModule('basket');

        foreach ($productNumbersByBundle as $orderNumber) {
            $sBasket->sAddArticle($orderNumber, 1);
        }

        $this->redirect([
            'controller' => 'checkout',
            'action' => 'cart',
        ]);
    }
}
