<?php

class Shopware_Controllers_Frontend_RoutingDemonstration extends Enlight_Controller_Action
{

    public function preDispatch()
    {
        $currentAction = $this->Request()->getActionName();
        $isNotUserLoggedIn = $this->get('session')->get('sUserId') === null && $currentAction ==='index';
        if($isNotUserLoggedIn) {
            $this->redirect([
                'module' => 'frontend',
                'controller' => 'account',
                'action' => 'login',
                'sTarget' => 'routing_demonstration',
                'sTargetAction' => 'index'
            ]);
        }

        $this->view->assign('currentAction',$currentAction);
    }

    public function indexAction()
    {
        $this->view->assign('nextPage','foo');
    }

    public function fooAction(){
        $this->view->assign('nextPage','index');
    }
}
