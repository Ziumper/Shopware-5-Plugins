<?php

namespace TkImport\Service;

use Exception;
use TkImport\Models\ImportedData;
use TkImport\Service\Struct\PreparationResultStruct;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Doctrine\DBAL\Connection;

class ImportService {

      /**
     * @var UploadPathProviderService $uploadPathProviderService
     */
    private $uploadPathProviderService;
    /**
     * @var Connection $connection
     */
    private $connection;


    /**
     * ImportService constructor.
     * @param UploadPathProviderService $uploadPathProviderService
     * @param Connection $connection
     */
    public function __construct(UploadPathProviderService $uploadPathProviderService,Connection $connection)
    {
        $this->uploadPathProviderService = $uploadPathProviderService;
        $this->connection = $connection;
    }

    /**
     * @param UploadedFile $file
     */
    public function importDataFromCsvFile($file) {
        $f_pointer = fopen($file,"r"); // file pointer
        $results = [];
        while(! feof($f_pointer)){
            $resultArrayFromFile = fgetcsv($f_pointer);
            $results[] = $resultArrayFromFile;
        }

        $this->saveDataFromImport($results);
    }

    /**
     * @param $resultsFromArray
     * @throws \Doctrine\DBAL\ConnectionException
     */
    private function saveDataFromImport($resultsFromArray) {
        $this->connection->beginTransaction();

        try{
            foreach($resultsFromArray as $result){
                $queryBuilder = $this->connection->createQueryBuilder();

                $name = $result[0];

                $queryBuilder->insert('s_plugin_imported_data')
                    ->setValue('name',"'".$name."'");
                $query = $queryBuilder->getSQL();
                $this->connection->executeUpdate($query);
            }
            $this->connection->commit();
        }catch (Exception $e) {
            $this->connection->rollBack();
            throw $e;
        }

    }

    /**
     * @param $postData
     * @param $inputFileName
     * @return PreparationResultStruct
     */
    public function prepareImport($postData,$inputFileName) {
        $pathToCsvFile = $postData['file'];
        $totalResultCount = $this->getTotalResultCount($pathToCsvFile);
        $startPosition = 0;
        return new PreparationResultStruct($startPosition,$totalResultCount);
    }


    public function import($postData) {
        $position = (int) $postData['position'];
        $totalCount = (int) $postData['totalCount'];

        $isTotalCountIsZero = $totalCount == 0;
        if($isTotalCountIsZero) {
           throw new Exception('Zero rows in total count!');
        }

        if($totalCount > $position) {
            $position = $position + 1;
            $postData['position'] = $position;
        } else {
            throw new Exception('Position is at total count, impossible to import more');
        }


        return $postData;
    }

    /**
     * @param string $pathToFile
     * @return int $length
     */
    private function getTotalResultCount($pathToFile) {
        $file = file($pathToFile,FILE_SKIP_EMPTY_LINES);
        $length = count($file);
        return $length;
    }
}