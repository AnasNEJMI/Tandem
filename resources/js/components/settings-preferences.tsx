import React, { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button'
import { ArrowLeft, Banknote, Calendar, Languages, Moon } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import ModifyCurrency from './modify-currency'
import ModifySettings from './modify-settings'
import { Preferences } from '@/types'
import { currencies, getCurrencyLabel, getDateFormatLabel, getLanguageLabel, getNumberFormatLabel, getThemeLabel } from '@/lib/data'

interface SettingsPreferencesProps{
    setOpenTab : React.Dispatch<React.SetStateAction<"profile" | "categories" | "spenders" | "visualisation" | "none">>
    preferences : Preferences,
}
const SettingsPreferences = ({setOpenTab, preferences} : SettingsPreferencesProps) => {

  return (
    <>
        <div className='fixed z-50 top-0 left-0 w-full py-4 bg-background h-24 px-6'>
            <Button onClick={() => setOpenTab('none')} variant={'ghost'} className='w-16 h-16 rounded-full'>
                <ArrowLeft/>
            </Button>
            <span className='absolute font-bold text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Préférences</span>
        </div>
        <div className='h-px w-full bg-accent mt-24'></div>

        <h2 className='text-muted-foreground text-sm font-bold mt-8'>Personnalisation</h2>
        <Card className='shadow-none border-none bg-white mt-1 py-4'>
          <CardContent className='flex items-center justify-between px-4'>
              <div className='flex items-center gap-2'>
                <Languages />
                <span className='flex-1 text-lg font-bold'>Langue</span>
              </div>
              <ModifySettings
                disabled = {true}
                initialOption={{value : preferences.language, label : getLanguageLabel(preferences.language)}}
                options={[
                  {value : 'fr', label : 'Français'},
                  {value : 'en', label : 'English'},
                ]}
                postRoute={'/settings/language'}
                reloadOnlyArray={['preferences']}
                title='Modifier la langue'
                description='Choisissez votre langue préférée'
              />
          </CardContent>
        </Card>
        <Card className='shadow-none border-none bg-white mt-2 py-4'>
          <CardContent className='flex items-center justify-between px-4'>
              <div className='flex items-center gap-2'>
                <Moon />
                <span className='flex-1 text-lg font-bold'>Thème</span>
              </div>
              <ModifySettings
                disabled = {true}
                initialOption={{value : preferences.theme, label : getThemeLabel(preferences.theme)}}
                options={[
                  {value : 'light', label : 'Light'},
                  {value : 'dark', label : 'Dark'},
                ]}
                postRoute={'/settings/theme'}
                reloadOnlyArray={['preferences']}
                title='Modifier le thème'
                description='Choisissez votre thème préférée'
              />
          </CardContent>
        </Card>

        <h2 className='text-muted-foreground text-sm font-bold mt-8'>Formats</h2>
        <Card className='shadow-none border-none bg-white mt-2 py-4'>
          <CardContent className='flex items-center justify-between px-4'>
              <div className='flex items-center gap-2'>
                <Banknote />
                <span className='flex-1 text-lg font-bold'>Devise</span>
              </div>
              <ModifySettings
                initialOption={{value : preferences.currency, label :getCurrencyLabel(preferences.currency)}}
                options={currencies.map((currency) => {return {value : currency.code, label: currency.name}})}
                postRoute={'/settings/currency'}
                reloadOnlyArray={['preferences']}
                title='Modifier la devise'
                description='Choisissez votre devise préférée'
              />
          </CardContent>
        </Card>
        <Card className='shadow-none border-none bg-white mt-2 py-4'>
          <CardContent className='flex items-center justify-between px-4'>
              <div className='flex items-center gap-2'>
                <Banknote />
                <span className='flex-1 text-lg font-bold'>Chiffres</span>
              </div>
              <ModifySettings
                initialOption={{value : preferences.number_format, label :getNumberFormatLabel(preferences.number_format)}}
                options={[
                  {value : 'dc', label : '1.000,00'},
                  {value : 'cd', label : '1,000.00'},
                ]}
                postRoute={'/settings/number-format'}
                reloadOnlyArray={['preferences']}
                title='Modifier le format de chiffres'
                description='Choisissez votre format de chiffres préféré'
              />
          </CardContent>
        </Card>
        <Card className='shadow-none border-none bg-white mt-2 py-4'>
          <CardContent className='flex items-center justify-between px-4'>
              <div className='flex items-center gap-2'>
                <Calendar />
                <span className='flex-1 text-lg font-bold'>Dates</span>
              </div>
              <ModifySettings
                initialOption={{value : preferences.date_format, label :getDateFormatLabel(preferences.date_format)}}
                options={[
                  {value : 'dmy', label : 'J/M/A'},
                  {value : 'mdy', label : 'M/J/A'},
                ]}
                postRoute={'/settings/date-format'}
                reloadOnlyArray={['preferences']}
                title='Modifier le format de dates'
                description='Choisissez votre format de dates préféré'
              />
              {/* <ModifyCurrency currency='EUR'/> */}
          </CardContent>
        </Card>
    </>
  )
}

export default SettingsPreferences