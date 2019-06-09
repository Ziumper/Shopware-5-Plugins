<?php

class Shopware_Controllers_Frontend_SessionInfo extends Enlight_Controller_Action
{
    public function preDispatch() {
        $isNotUserLoggedIn = $this->get('session')->get('sUserId') === null;
        if($isNotUserLoggedIn) {
            $this->redirect([
                'module' => 'frontend',
                'controller' => 'account',
                'action' => 'login',
                'sTarget' => 'session_info',
                'sTargetAction' => 'user'
            ]);
        }
    }

    public function userAction() {
        $userId = $this->get('session')->get('sUserId');
        $this->view->assign('userId', $userId);
    }
}