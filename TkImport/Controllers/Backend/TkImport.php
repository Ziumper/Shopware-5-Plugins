<?php


use TkImport\Models\ImportedData;
/**
 * Backend controllers extending from Shopware_Controllers_Backend_Application do support the new backend components
 */
class Shopware_Controllers_Backend_TkImport extends Shopware_Controllers_Backend_Application
{
    protected $model = ImportedData::class;

    protected $alias = 'imported_data';


}
