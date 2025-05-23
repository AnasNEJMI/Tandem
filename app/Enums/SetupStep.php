<?php

namespace App\Enums;

enum SetupStep : string
{
    case Spenders = 'spenders';
    case Categories = 'categories';
    case places = 'places';

    public static function values():array{
        return array_column(self::cases(), 'value');  
    }
}
