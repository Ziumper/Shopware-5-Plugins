<?php

namespace TkStartup\Subscribers;

use Enlight\Event\SubscriberInterface;


class FrontendRoutingSubscriber implements SubscriberInterface {
    
    public static function getSubscribedEvents()
    {
        return ['Enlight_Controller_Action_PreDispatch_Frontend' => 'onPreDispatchTemplateRegistration'];
    }

    public function onPreDispatchTemplateRegistration(\Enlight_Event_EventArgs $args)
    {
        $controller = $args->getSubject();
        $templateDir = __DIR__ . '/../Resources/views';

        $controller->View()->addTemplateDir($templateDir);
    }
}