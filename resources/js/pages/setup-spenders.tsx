import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AccountSetupLayout from '@/layouts/acount-setup-layout';
import { getSpenderColor } from '@/lib/data';
import { SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react'
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';

const SetupSpenders = () => {
  const {delete : destroy} = useForm();
  const {data, setData, post, processing, errors} = useForm({
    'spenders' : [
      {
        'name' : '',
        'color' : '',
      }
    ],
  })
  const { auth } = usePage<SharedData>().props;

  const handleSubmit =(e : React.FormEvent) => {
    e.preventDefault();
    destroy('/logout', {
      preserveScroll : false,
    });
  }
  
  const handlePostSpendersSubmit =(e : React.FormEvent) => {
    e.preventDefault();
    post('/setup/spenders', {
      preserveScroll : false,
    });
  }

  useEffect(() => {
    console.log("data : ",data);
  }, [data])

  const indexToPosition = (index : number) =>{
    if(index === 0) return '1ère';
    
    return `${index+1}ème`;
  }

  const addSpender = () => {
    const index = data.spenders.length;
    setData('spenders', [...data.spenders, {'name' : '', 'color' : getSpenderColor(index)}]);
  }
  
  const deleteSpenderAtIndex = (index : number) => {
    setData('spenders', [...data.spenders.slice(0,index), ...data.spenders.slice(index+1)]);
  }
  
  return (
    <AccountSetupLayout>
      <p className='flex flex-col items-start gap-2 mt-2 bg-white border border-card-border shadow-md rounded-md p-2'>
        <span className='text-muted-foreground font-bold underline underline-offset-4 decoration-card-border'>Étape 1</span>
        <span className='text-sm text-typography text-pretty'>Nommez les personnes qui participeront à vos dépenses.</span>
      </p>
      
      <div className='h-px w-full bg-card-border mt-2'></div>

        <form onSubmit={handlePostSpendersSubmit} className='grow flex flex-col mt-10'>
          <div className='grow'>
          {
          data.spenders.map((spender, index) => (
            <div key={index} className='flex flex-col gap-2 mt-4'>
              <Label className='text-sm'>Nom de la {indexToPosition(index)} personne</Label>
              <div className='flex items-center gap-2'>
                <Input 
                  type='text'
                  disabled = {processing}
                  value={spender.name}
                  onChange={e => setData('spenders', data.spenders.map((s, i) => {return i === index? {'name' : e.target.value, 'color': getSpenderColor(i)} : {'name' : s.name, 'color': s.color}}))}
                  placeholder='Saisissez le nom'
                  required
                  minLength={2}
                  />
                  {
                    index !== 0 &&
                    <Button variant={'outline'} size={'icon'} className='w-8 h-8 p-4 text-muted-foreground'  onClick={() => deleteSpenderAtIndex(index)}>
                      <Trash2Icon />
                    </Button>
                  }
                </div>
                {
                  errors.spenders && errors.spenders === spender.name && <Label className ='text-red-500'>an error!</Label>
                }
                </div>
              ))
            }

            <Button variant={'outline'} onClick={() => addSpender()} className='flex items-center justify-center w-full mt-6' disabled = {data.spenders.length >=6}>
              <PlusIcon />
              <span>Ajouter une personne</span>
            </Button>
          </div>
        <Button disabled = {processing} type='submit' className='w-full'>
          Confirmer
        </Button>
      </form>
    </AccountSetupLayout>
  )
}

export default SetupSpenders