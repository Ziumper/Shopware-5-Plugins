<?php


use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\FileBag;
use TkImport\Service\ImportService;


class Shopware_Controllers_Backend_TkImportFile extends Shopware_Controllers_Backend_ExtJs {

    public function initAcl()
    {
        $this->addAclPermission('prepareImport', 'import', 'Insuficient Permissions (prepareImport)');
        $this->addAclPermission('import', 'import', 'Insuficient Permissions (import)');
        $this->addAclPermission('importOnly', 'import', 'Insuficient Permissions (importOnly)');
    }

    public function uploadFileAction()
    {
        $response = $this->uploadFile();
        $this->view->assign($response);
    }

    private function uploadFile() {
        /** @var \TkImport\Services\UploadPathProviderService $uploadPathProvider */
        $uploadPathProvider = $this->get('tk_import.service.upload_path_provider_service');
        /** @var UploadedFile $file */
        $fileBag = new FileBag($_FILES);

        $clientOriginalName = $this->moveFilesToPreparedFolder($fileBag,$uploadPathProvider);

        $response = [
            'success' => true,
            'data' => [
                'path' => $uploadPathProvider->getRealPath($clientOriginalName),
                'fileName' => $clientOriginalName,
            ]
        ];

        return $response;
    }

    public function importOnlyAction() {
        /**
         *  @var ImportService $importService
         */
        $importService = $this->get('tk_import.service.import_service');
        $fileBag = new FileBag($_FILES);

        /**
         * @param UploadedFile  $file
         */
        foreach($fileBag->getIterator() as $file) {
            $originalName = $file->getClientOriginalName();
            $extension = $this->getFileExtension($originalName);

            if(!$this->isFormatValid($extension)){
                return $this->View()->assign(['success' => false,'msg'=> 'Format of  file '.$originalName.' is not valid']);
            }

            try {
                $importService->importDataFromCsvFile($file);
            }catch (Exception $e) {
                return $this->View()->assign(['success' => false, 'msg'=>$e->getMessage()]);
            }
        }

        $response = ['success'=> true,'msg'=>'Data imported successfully'];

        return $this->view()->assign($response);
    }

    private function getFileExtension($fileName) {
        $extension = pathinfo($fileName,PATHINFO_EXTENSION);
        return $extension;
    }



    /**
     * @param FileBag $fileBag
     * @param \TkImport\Service\UploadPathProviderService $uploadPathProvider
     * @return string
     */
    private function moveFilesToPreparedFolder($fileBag,$uploadPathProvider) {
        $clientOriginalName = '';

        foreach ($fileBag->getIterator() as $file) {
            $clientOriginalName = $file->getClientOriginalName();
            $file->move($uploadPathProvider->getPath(), $clientOriginalName);
        }

        return $clientOriginalName;
    }

    public function prepareImportAction()
    {
        /** @var \TkImport\Service\UploadPathProviderService $uploadPathProvider */
        $uploadPathProvider = $this->get('tk_import.service.upload_path_provider_service');
        $request = $this->Request();

        $postData = [
            'sessionId' => $request->getParam('sessionId'),
            'profileId' => (int) $request->getParam('profileId'),
            'type' => 'import',
            'file' => $uploadPathProvider->getRealPath($request->getParam('importFile')),
        ];

        if (empty($postData['file'])) {
            return $this->View()->assign(['success' => false, 'msg' => 'No valid file']);
        }


        $extension = $uploadPathProvider->getFileExtension($postData['file']);

        if (!$this->isFormatValid($extension)) {
            return $this->View()->assign(['success' => false, 'msg' => 'No valid file format']);
        }

        $postData['format'] = $extension;

        $importService = $this->get('tk_import.service.import_service');

        try {
            //$resultStructure = new PreparationResultStruct(1,10);
            $resultStructure = $importService->prepareImport($postData);
        } catch (\Exception $e) {
            return $this->View()->assign(['success' => false, 'msg' => $e->getMessage()]);
        }

        return $this->View()->assign([
            'success' => true,
            'position' => $resultStructure->getPosition(),
            'count' => $resultStructure->getTotalResultCount(),
        ]);
    }

    public function importAction()
    {
        /** @var \TkImport\Service\UploadPathProviderService $uploadPathProvider */
        $uploadPathProvider = $this->get('tk_import.service.upload_path_provider_service');
        $request = $this->Request();
        $inputFile = $uploadPathProvider->getRealPath($request->getParam('importFile'));

        $unprocessedFiles = [];
        $postData = [
            'type' => 'import',
            'profileId' => (int) $request->getParam('profileId'),
            'importFile' => $inputFile,
            'sessionId' => $request->getParam('sessionId'),
            'position' => $request->getParam('position'),
            'totalCount' => $request->getParam('totalCount'),
            'limit' => [],
        ];

//        if ($request->getParam('unprocessedFiles')) {
//            $unprocessedFiles = json_decode($request->getParam('unprocessedFiles'), true);
//        }

        if (!isset($postData['format'])) {
            // get file format
            $postData['format'] = pathinfo($inputFile, PATHINFO_EXTENSION);
        }

        /** @var \TkImport\Service\ImportService $importService */
        $importService = $this->get('tk_import.service.import_service');

        try {
            $resultData = $importService->import($postData);
            $this->View()->assign([
                'success' => true,
                'data' => $resultData,
            ]);
        } catch (\Exception $e) {
            $this->View()->assign([
                'success' => false,
                'msg' => $e->getMessage(),
            ]);
        }
    }



    /**
     * Check is file format valid
     *
     * @param string $extension
     *
     * @return bool
     */
    private function isFormatValid($extension)
    {
        switch ($extension) {
            case 'csv':
                return true;
            default:
                return false;
        }
    }
}