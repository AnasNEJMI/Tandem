import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import AccountSetupLayout from '@/layouts/acount-setup-layout';
import { placesPerCategory, specialCategories } from '@/lib/data';
import { Category,SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react'
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

const SetupPlaces = ({categories} : {categories : Category[]}) => {
  const [selectedCategory, setSelectedCategory] = useState(specialCategories[0]);

  const initialCategories = categories.map((category) => ({
    ...category,
    places: [{name : ''}],
  }));
  const {data, setData, processing, post, errors} = useForm({
    'categories' : initialCategories,
  });
  const {delete : destroy} = useForm();

  const handleSubmit =(e : React.FormEvent) => {
    e.preventDefault();
    destroy('/logout', {
      preserveScroll : false,
    });
  }
  
  const handleSubmitPlaces =(e : React.FormEvent) => {
    e.preventDefault();

    post('/setup/places', {
      preserveScroll : false,
    });
  }

  useEffect(() => {
    console.log(categories);
    let initializeCategoriesWithPlaces = categories.map((category) => {
      var specialCat = placesPerCategory.find((cat) => cat.category_name === category.name);
      return {
        id : category.id,
        name : category.name,
        places : specialCat!.places.map((place) => {return {name : place}}),
        color : category.color,
      };
    })

    setData('categories', initializeCategoriesWithPlaces);
  }, [])

  useEffect(() => {
    console.log("data : ",data);
  }, [data])

  const updateSelectedPlaces = (category : string, selectedPlace : string) =>{
    var selectedCategory = data.categories.find((cat) => cat.name === category);

    if(selectedCategory?.places.some((place) => place.name === selectedPlace)){
      var updatedPlaces = selectedCategory?.places.filter((place) => place.name != selectedPlace);
      var updatedCategories = data.categories.map((cat) => {
        if(cat.name !== category){
          return cat;
        }else{
          cat.places = updatedPlaces;
          return cat;
        }
      })
      setData('categories', updatedCategories);
    }else{
      var updatedCategories = data.categories.map((cat) => {
        if(cat.name !== category){
          return cat;
        }else{
          cat.places = [...cat.places, {name : selectedPlace}];
          return cat;
        }
      })
      setData('categories', updatedCategories);
    }
  }

  const updateSelectedCategory = (category : string) => {
    if(selectedCategory === category) return;
    setSelectedCategory(category);
  }

  return (
    <AccountSetupLayout>
      <p className='flex flex-col items-start gap-2 mt-2 bg-white border border-card-border shadow-md rounded-md p-2'>
        <span className='text-muted-foreground font-bold underline underline-offset-4 decoration-card-border'>Étape 3</span>
        <span className='text-sm text-typography text-pretty'>Affinez vos choix pour ces catégories en particulier.</span>
      </p>
      
      <div className='h-px w-full bg-card-border mt-2'></div> 
      <form onSubmit={handleSubmitPlaces} className='grow flex flex-col mt-10'>
        <div className='grow'>
          <Carousel
            opts={{align : "start", loop : true}}
            className='w-full max-w-full mt-4'
          >
            <CarouselContent className="font-medium overflow-visible">
              {
                data.categories.map((selectedCat, index)=>{
                  if(!specialCategories.includes(selectedCat.name)) return;
                  return (
                    <CarouselItem key={`selected-category-${selectedCat.name}`} className="basis-1/3 rounded-md">
                      <div className='w-full rounded-md h-full flex items-center justify-center'>
                        <input disabled = {processing} type="radio" id={`selected-category-${selectedCat.name}`} name="categories" value={selectedCat.name} className="w-0 h-0 appearance-none" checked = {selectedCategory === selectedCat.name} onChange={(e) => updateSelectedCategory(e.target.value)}/>
                        <label htmlFor={`selected-category-${selectedCat.name}`} className={`cursor-pointer rounded-md ${selectedCategory === selectedCat.name? "bg-primary text-primary-foreground" : "bg-transparent border border-card-border text-typography"} text-xs w-full h-full py-2 flex items-center justify-center select-none`}>{selectedCat.name}</label>
                      </div>
                    </CarouselItem>
                  )
                })
              }
            </CarouselContent>
          </Carousel>

          <div className="h-px w-full bg-popover-border mt-4 mb-4"></div>
          <p className='flex items-start flex-col '>
            <span className="text-start text-muted-foreground text-sm">Les lieux les plus fréquentés</span>
            <span className='text-xs text-muted-foreground text-pretty'>{`(toutes les lieux sont sélectionnées par défaut)`}</span>
          </p>
          <AnimatePresence>
              {
                <motion.div
                    className="mt-4"
                    key={`category-${selectedCategory}-places`}
                    initial = {{opacity:0, y:20}}
                    animate = {{opacity:1, y:0, transition :{delay : 0.15}}}
                    exit={{opacity:0, y:20}}
                    transition={{duration:0.15, ease:"easeOut"}}
                  >
                    <ul className="relative flex items-center justify-start gap-2 flex-wrap mt-2">
                      {
                        placesPerCategory.find((category) => category.category_name === selectedCategory)?.places.map((coursesPlace, index) => {

                          return (
                          <li 
                            key={`${selectedCategory}-${index}`} 
                            className={`cursor-pointer rounded-md ${processing? "pointer-events-none" : ""} ${data.categories.find((category) => category.name === selectedCategory)?.places.some((place) => place.name === coursesPlace)? "bg-primary text-primary-foreground border-transparent" : "bg-transparent border-card-border text-typography"} border text-xs py-1 px-2 flex items-center justify-center select-none`} 
                            onClick={() => updateSelectedPlaces(selectedCategory, coursesPlace)}>
                            {coursesPlace}
                          </li>
                          )
                        })
                      }
                    </ul>
                </motion.div>
              }
          </AnimatePresence>
        </div>

        <Button type='submit' className='w-full'>
          Confirmer
        </Button>
      </form>

    </AccountSetupLayout>
  )
}

export default SetupPlaces