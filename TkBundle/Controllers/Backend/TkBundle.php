<?php

use TkBundle\Models\Bundle;

class Shopware_Controllers_Backend_TkBundle extends Shopware_Controllers_Backend_Application
{
    protected $model = Bundle::class;
    protected $alias = 'bundle';

    protected function getDetailQuery($id)
    {
        $builder = parent::getDetailQuery($id);
        $builder->leftJoin('bundle.products', 'products')
            ->addSelect('products');

        return $builder;
    }
}
