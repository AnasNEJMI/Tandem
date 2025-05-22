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

