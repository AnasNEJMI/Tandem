import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Expense{
    id : number;
    amount : number;
    date: string;
    comment?: string|null;
    spender: Spender;
    category: Category;
    places: Place[];
    created_at?: string;
    updated_at?: string;
}

export interface Spender{
    id : number,
    name : string,
}

export interface Category{
    id : number,
    name : string,
}

export interface Place{
    id : number,
    name : string,
}

export interface MonthAndYear {
    month : number,
    year : number
}


export interface ExpenseForm{
    amount : number;
    spender: string;
    date: string;
    category: string;
    place: string;
    comment: string|null;
}

export interface Category{
    id : number,
    name : string,
}

export interface CategoryWithPlaces{
    id : number,
    name : string,
    places : Place[],
}
