import { Category, Spender } from "@/types";

const popularCoursesPlacesInFrance: string[] = [
  // Grandes surfaces et hypermarchés
  "Leclerc",
  "Carrefour",
  "Intermarché",
  "Auchan",
  "Super U",
  "Hyper U",
  "Casino",
  "Monoprix",

  // Supérettes et magasins de proximité urbains
  "Franprix",
  "Marché",
  "Cora",
  "Match",

  // Magasins discount
  "Lidl",
  "Aldi",
  "Leader Price",
  "Netto",
  "Action",
  "Marka Market",

  // Magasins bio et spécialisés
  "Grand Frais",
  "Picard",
  "Biocoop",
  "Naturalia",
  "La Vie Claire",

  // Épiceries de quartier
  "Proxi",
  "Vival",
  "Épicerie de quartier",
  "Autres",
];

const popularRestaurantChainsInFrance: string[] = [
  // Fast Food populaires
  "McDonald's",
  "Burger King",
  "Quick",
  "KFC",
  "Five Guys",
  "Subway",

  // Grill / Brasserie
  "Buffalo Grill",
  "Courtepaille",
  "Hippopotamus",
  "La Pataterie",
  "Flunch",

  // Boulangerie / Sandwicherie
  "Paul",
  "Brioche Dorée",
  "La Mie Câline",

  // Pizza
  "Domino\'s Pizza",
  "Pizza Hut",
  "Del Arte",

  // Sushi
  "Sushi Shop",
  "Planet Sushi",
  "Matsuri",

  // Tacos & Kebab
  "O\'Tacos",
  "Nabab Kebab",

  // Cuisine asiatique (hors sushi)
  "Woko",
  "Pitaya",

  // Cuisine italienne (hors pizza)
  "IT Trattoria",

  // Cuisine traditionnelle française
  "Bistro Régent",

  // Divers
  "Autres"
];

const popularClothingStoresInFrance: string[] = [
  // Mode générale (femme, homme, enfant)
  "Zara",
  "H&M",
  "C&A",
  "Kiabi",
  "Primark",
  "Pimkie",
  "Jennyfer",
  "Cache Cache",

  // Mode femme
  "Mango",
  "Etam",
  "Promod",
  "Grain de Malice",

  // Mode homme
  "Celio",
  "Jules",
  "Brice",

  // Mode enfant
  "Okaïdi",
  "Orchestra",
  "Sergent Major",
  "Petit Bateau",

  // Mode sport & streetwear
  "Decathlon",
  "JD Sports",
  "Foot Locker",
  "Courir",
  "Go Sport",

  // Lingerie & nuit
  "Etam Lingerie",
  "Undiz",
  "Yves Rocher Lingerie",

  // Luxe accessible / prêt-à-porter premium
  "Sandro",
  "Maje",
  "The Kooples",
  "Comptoir des Cotonniers",

  // Autres chaînes
  "Autres chaînes"
];

const popularShoeStoresInFrance: string[] = [
  // Chaussures sport & streetwear
  "Foot Locker",
  "Courir",
  "JD Sports",
  "Go Sport",
  "Decathlon",

  // Chaussures grand public
  "Besson Chaussures",
  "André",
  "San Marina",
  "La Halle",
  "Gémo",
  "Chaussea",

  // Luxe accessible / mode urbaine
  "Minelli",
  "Eram",
  "Bocage",
  "Jonak",

  // Autres chaînes
  "Autres"
];

export const specialCategories = ["Courses","Restaurants","Vêtements","Chaussures"]


export const  placesPerCategory = [
    {
        category_name : specialCategories[0],
        places : popularCoursesPlacesInFrance,
    },
    {
        category_name : specialCategories[1],
        places : popularRestaurantChainsInFrance,
    },
    {
        category_name : specialCategories[2],
        places : popularClothingStoresInFrance,
    },
    {
        category_name : specialCategories[3],
        places : popularShoeStoresInFrance,
    }
]

export const categories: string[] = [
  "Courses",
  "Loyer",
  "Électricité",
  "Gaz",
  "Internet",
  "Téléphone",
  "Carburant",
  "Restaurants",
  "Transports",
  "Assurances",
  "Crèche",
  "École",
  "Cantine",
  "Vêtements",
  "Chaussures",
  "Abonnements",
  "Loisirs",
  "Vacances",
  "Cadeaux",
  "Santé",
  "Véhicule",
  "Dons",
  "Animaux",
  "Maison",
  "Autre"
];

export function getColor(category : string){
  switch(category){
    case categories[0] :
        return "hsl(183, 81%, 19%)";
    case categories[1] :
        return "hsl(177, 61%, 29%)";
    case categories[2] :
        return "hsl(100, 64%, 85%)";
    case categories[3] :
        return "hsl(35, 69%, 67%)";
    case categories[4] :
        return "hsl(24, 96%, 55%)";
    case categories[5] :
        return "hsl(359, 85%, 56%)";
    case categories[6] :
        return "hsl(154, 30%, 59%)";
    case categories[7] :
        return "hsl(197, 93%, 29%)";
    case categories[8] :
        return "hsl(28, 85%, 61%)";
    case categories[9] :
        return "hsl(13, 90%, 56%)";
    case categories[10] :
        return "hsl(128, 20%, 70%)";
    case categories[11] :
        return "hsl(35, 100%, 55%)";
    case categories[12] :
        return "hsl(45, 100%, 50%)";
    case categories[13] :
        return "hsl(114, 35%, 51%)";
    case categories[14] :
        return "hsl(7, 76%, 42%)";
    case categories[15] :
        return "hsl(55, 10%, 75%)";
    case categories[16] :
        return "hsl(176, 15%, 81%)";
    case categories[17] :
        return "hsl(195, 50%, 95%)";
    case categories[18] :
        return "hsl(174, 36%, 64%)";
    case categories[19] :
        return "hsl(49, 100%, 65%)";
    case categories[20] :
        return "hsl(68, 100%, 92%)";
    case categories[21] :
        return "hsl(74, 100%, 85%)";
    case categories[22] :
        return "hsl(87, 23%, 75%)";
    case categories[23] :
        return "hsl(56, 100%, 87%)";
    case categories[24] :
        return "hsl(101, 31%, 55%)";
    default : 
      return "hsl(189, 66%, 8%)";
  }
}

export const getSpenderColor = (index : number) => {
    switch(index){
        case 0 : 
        return "hsl(184, 29%, 27%)";
        case 1 : 
        return "hsl(60, 31%, 77%)";
        case 2 : 
        return "hsl(18, 100%, 66%)";
        case 3 : 
        return "hsl(23, 100%, 63%)";
        case 4 : 
        return "hsl(123, 8%, 55%)";
        case 5 : 
        return "hsl(185, 14%, 17%)";
        default :
        return "hsl(17, 76%, 49%)";
    }
}


export const colors = [
    [
        '0 0% 45.1%','0 0% 32.2%','0 0% 25.1%','0 0% 14.9%','0 0% 9%','0 0% 3.9%'
    ],
    [
        '215.4 16.3% 46.9%','215.3 19.3% 34.5%','215.3 25% 26.7%','217.2 32.6% 17.5%','222.2 47.4% 11.2%','222.2 84% 4.9%'
    ],
    [
        '0 84.2% 60.2%','0 72.2% 50.6%','0 73.7% 41.8%','0 70% 35.3%','0 62.8% 30.6%','0 74.7% 15.5%'
    ],
    [
        '24.6 95% 53.1%','20.5 90.2% 48.2%','17.5 88.3% 40.4%','15 79.1% 33.7%','15.3 74.6% 27.8%','13 81.1% 14.5%'
    ],
    [
        '45.4 93.4% 47.5%','40.6 96.1% 40.4%','35.5 91.7% 32.9%','31.8 81% 28.8%','28.4 72.5% 25.7%','26 83.3% 14.1%'
    ],
    [
        '83.7 80.5% 44.3%','84.8 85.2% 34.5%','85.9 78.4% 27.3%','86.3 69% 22.7%','87.6 61.2% 20.2%','89.3 80.4% 10%'
    ],
    [
        '142.1 70.6% 45.3%','142.1 76.2% 36.3%','142.4 71.8% 29.2%','142.8 64.2% 24.1%','143.8 61.2% 20.2%','144.9 80.4% 10%'
    ],
    [
        '173.4 80.4% 40%','174.7 83.9% 31.6%','175.3 77.4% 26.1%','176.1 69.4% 21.8%','175.9 60.8% 19%','178.6 84.3% 10%'
    ],
    [
        '198.6 88.7% 48.4%','200.4 98% 39.4%','201.3 96.3% 32.2%','201 90% 27.5%','202 80.3% 23.9%','204 80.2% 15.9%'
    ],
    [
        '238.7 83.5% 66.7%','243.4 75.4% 58.6%','244.5 57.9% 50.6%','243.7 54.5% 41.4%','242.2 47.4% 34.3%','243.8 47.1% 20%'
    ],
    [
        '270.7 91% 65.1%','271.5 81.3% 55.9%','272.1 71.7% 47.1%','272.9 67.2% 39.4%','273.6 65.6% 32%','273.5 86.9% 21%'
    ],
    [
        '349.7 89.2% 60.2%','346.8 77.2% 49.8%','345.3 82.7% 40.8%','343.4 79.7% 34.7%','341.5 75.5% 30.4%','343.1 87.7% 15.9%'
    ]
]


export const currencies = [
    {
        code : 'D',
        name : 'Dollar ($)'
    },
    {
        code : 'EUR',
        name : 'Euro (€)'
    },
    {
        code : 'P',
        name : 'Pound (£)'
    },
    {
        code : 'Y',
        name : 'Yen/Yuan (¥)'
    },
    {
        code : 'CHF',
        name : 'Franc (CHF)'
    },
]

export function getLanguageLabel(value : string){
    switch(value){
        case 'fr' : return 'Français';
        case 'en' : return 'English';
        default : return 'Français';
    }
}
export function getThemeLabel(value : string){
    switch(value){
        case 'light' : return 'Light';
        case 'dark' : return 'Dark';
        default : return 'Light';
    }
}
export function getCurrencyLabel(value : string){
    switch(value){
        case 'EUR' : return 'Euro (€)';
        case 'D' : return 'Dollar ($)';
        case 'Y' : return 'Yen/Yuan (¥)';
        case 'P' : return 'Pound (£)';
        case 'CHF' : return 'Franc (CHF)';
        default : return 'Euro (€)';
    }
}
export function getNumberFormatLabel(value : string){
    switch(value){
        case 'dc' : return '1.000,00';
        case 'cd' : return '1,000.00';
        default : return '1.000,00';
    }
}
export function getDateFormatLabel(value : string){
    switch(value){
        case 'dmy' : return 'J/M/A';
        case 'mdy' : return 'M/J/A';
        default : return 'J/M/A';
    }
}

export const numberFormats : Record<string, {thousands : string, decimal:string}> = {
    cd: { thousands: ",", decimal: "." },
    dc: { thousands: ".", decimal: "," },
    sd: { thousands: " ", decimal: "." },
    sc: { thousands: " ", decimal: "," },
}

export const currencySymbols : Record<string, string> = {
    EUR: '€', 
    D: '$', 
    Y: '¥',
    P: '£',
    CHF : 'CHF'
}

export const formatAmount = (amount : number, format : string) => {
    const config = numberFormats[format];

    if(!config){
        console.error('unknow number format', format);
        return amount.toString();
    }

    const [integer, decimal] = Number(amount).toFixed(2).split('.');

    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousands);
    return `${formattedInteger}${config.decimal}${decimal}`;
}

export const formatDate = (date : string, format : string, separator = '-') => {
    const [year, month, day] = date.split(separator);
    switch(format){
        case 'mdy' : 
            return `${month}/${day}/${year}`
        case 'dmy' : 
            return `${day}/${month}/${year}`
            default : 
            console.error('unknown date format ', format);
            return `${day}/${month}/${year}`
    }
}

export const areSpenderArraysEqual = (a: Spender[], b: Spender[]): boolean => {
  if (a.length !== b.length) return false;

  const sortById = (arr: Spender[]) => [...arr].sort((x, y) => x.id - y.id);

  const aSorted = sortById(a);
  const bSorted = sortById(b);

  return aSorted.every((sp, i) => {
    const other = bSorted[i];
    return (
      sp.id === other.id
    );
  });
};
export const areCategoryArraysEqual = (a: Category[], b: Category[]): boolean => {
  if (a.length !== b.length) return false;

  const sortById = (arr: Category[]) => [...arr].sort((x, y) => x.id - y.id);

  const aSorted = sortById(a);
  const bSorted = sortById(b);

  return aSorted.every((sp, i) => {
    const other = bSorted[i];
    return (
      sp.id === other.id
    );
  });
};