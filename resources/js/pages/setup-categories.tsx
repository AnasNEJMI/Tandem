import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AccountSetupLayout from '@/layouts/acount-setup-layout';
import { categories } from '@/lib/utils';
import { SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react'
import { useEffect } from 'react';
import {motion} from 'motion/react';

type categoryType = {
  name : string;
}



const SetupCategories = () => {
  const {delete : destroy} = useForm();
  const {data, setData, post, processing, errors} = useForm({
    'categories' : [] as categoryType[],
  })
  const { auth } = usePage<SharedData>().props;

  const handleSubmit =(e : React.FormEvent) => {
    e.preventDefault();
    destroy('/logout', {
      preserveScroll : false,
    });
  }

  const initializeData = () => {
    return categories.map((category) => {return {'name' : category}});
  }
  useEffect(() => {
    setData('categories', initializeData());
  }, [])

  useEffect(() => {
    console.log("data : ",data);
  }, [data])

  const indexToPo1istion = (index : number) =>{
    if(index === 0) return '1ère';
    
    return `${index+1}ème`;
  }

  const addcategories = () => {
    setData('categories', [...data.categories, {'name' : ''}]);
  }

  const updateCategories = (category : string) => {
    if(data.categories.some(cat => cat.name === category)){
      setData('categories', data.categories.filter((cat) => {return cat.name !== category;}));
    }else{
      setData('categories', [...data.categories, {'name' : category}]);
    }

    console.log('category ', category, ' in ? ', data.categories.some(cat => cat.name === category));
  }
  
  const deletecategoriesAtIndex = (index : number) => {
    setData('categories', [...data.categories.slice(0,index), ...data.categories.slice(index+1)]);
  }
  
  return (
    <AccountSetupLayout>
      <p className='flex flex-col items-start gap-2 mt-2 bg-white border border-card-border shadow-md rounded-md p-2'>
        <span className='text-muted-foreground font-bold underline underline-offset-4 decoration-card-border'>Étape 2</span>
        <span className='text-sm text-typography text-pretty'>Choisisser vos catégories de dépenses les plus fréquentes.</span>
      </p>
      
      <div className='h-px w-full bg-card-border mt-2'></div>
      <span className='text-xs text-muted-foreground text-pretty'>{`(toutes les catégories sont sélectionnées par défaut)`}</span>

      <div className='grow mt-10'>
        <motion.form 
          className='flex gap-2 flex-wrap'
          initial = {{opacity:0, y:20}}
          animate = {{opacity:1, y:0, transition :{delay : 0.15}}}
          exit={{opacity:0, y:20}}
          transition={{duration:0.15, ease:"easeOut"}}
        >
          {
            categories.map((category, index) => (
              <div key={`category-${category}`} className='rounded-md h-full flex items-center justify-center'>
                <input disabled = {processing} type="radio" id={`category-${category}`} name="categories" value={category} className="w-0 h-0 appearance-none" checked = {data.categories.includes({'name' : category})} onChange={(e) => updateCategories(e.target.value)}/>
                <label htmlFor={`category-${category}`} className={`cursor-pointer rounded-md ${data.categories.some(cat => cat.name === category)? "bg-primary border border-primary text-primary-foreground" : "bg-transparent border border-card-border text-typography"} text-xs w-full h-full px-4 py-2 flex items-center justify-center`}>{category}</label>
              </div>
            ))
          }
        </motion.form>
      </div>
      
      <form onSubmit={handleSubmit} method="POST">
        <Button type='submit' className='w-full'>
          Confirmer
        </Button>
      </form>
    </AccountSetupLayout>
  )
}

export default SetupCategories