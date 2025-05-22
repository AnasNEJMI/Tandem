import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const categories: string[] = [
  "Courses",
  "Loyer",
  "Électricité",
  "Gaz",
  "Internet",
  "Téléphone",
  "Carburant",
  "Restaurants",
  "Transports en commun",
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
  "Entretien voiture",
  "Dons",
  "Animaux",
  "Maison",
  "Autre"
];