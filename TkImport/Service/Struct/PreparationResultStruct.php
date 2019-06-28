<?php

namespace TkImport\Service\Struct;

class PreparationResultStruct {
    /** @var int */
    private $position;

    /** @var int */
    private $totalResultCount;

    /**
     * @param int $position
     * @param int $totalResultCount
     */
    public function __construct($position, $totalResultCount)
    {
        $this->position = $position;
        $this->totalResultCount = $totalResultCount;
    }

    /**
     * @return int
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * @return int
     */
    public function getTotalResultCount()
    {
        return $this->totalResultCount;
    }
}