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