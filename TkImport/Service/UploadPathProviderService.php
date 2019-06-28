<?php

namespace TkImport\Service;

class UploadPathProviderService {

    const DIR = 'files/import';
    const CRON_DIR = 'files/import_cron';

    /**
     * @var string
     */
    private $rootPath;

    public function __construct() {
        $this->rootPath = Shopware()->DocPath();
    }

    /**
     * Returns the absolute file path with file name.
     *
     * @param string $fileName
     * @param string $directory
     *
     * @return string
     */
    public function getRealPath($fileName, $directory = self::DIR)
    {
        return $this->getPath($directory) . '/' . $fileName;
    }

    /**
     * @param string $path
     *
     * @return string
     */
    public function getFileNameFromPath($path)
    {
        return pathinfo($path, PATHINFO_BASENAME);
    }

    /**
     * @param string $path
     *
     * @return string
     */
    public function getFileExtension($path)
    {
        return pathinfo($path, PATHINFO_EXTENSION);
    }

    /**
     * Return the path to the upload directory.
     *
     * @param string $directory
     *
     * @return string
     */
    public function getPath($directory = self::DIR)
    {
        if ($directory === self::CRON_DIR) {
            return $this->rootPath . self::CRON_DIR;
        }

        return $this->rootPath . self::DIR;
    }
}