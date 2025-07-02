<?php

namespace App\Enums;
class PreferenceOptions{
    public const LANGUAGES = ['fr', 'en'];
    public const THEMES = ['light', 'dark'];
    public const CURRENCIES = ['EUR', 'D', 'P', 'Y', 'CHF'];
    public const DATE_FORMATS = ['dmy', 'mdy'];
    public const NUMBER_FORMATS = ['cd', 'dc'];
    public const CHARTS_STYLES = ['line', 'bar'];
}