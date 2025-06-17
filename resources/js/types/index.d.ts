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
    color : string,
}

export interface Category{
    id : number,
    name : string,
    color : string,
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
    color : string,
    places : Place[],
}

interface MonthlyStats{
    categories : MonthlyCategoryStats,
    spenders : MonthlySpenderStats
}

interface MonthlyCategoryStats{
    data : {
        name : string,
        amount : string,
        fill : string
    }[],
    config : {[k as string] : string}
}

interface MonthlySpenderStats{
    spenders : {
        name : string,
        amount : string,
        fill : string
    }[],
    data : {[k as string] : number},
    config : {[k as string] : string}
}

interface SpendingEvolutionPerCategoryStats{
    data : {
        month : string,
        amount : number,
    }[],
    config : {[k as string] : string}
}

interface ChartStats{
    data : {
        month : string,
        [k as string] : number,
    }[],
    config : {[k === 'Global' || k as string] : configData}
}

interface configData{
    label : string,
    color : string
}

interface MonthStats{
    month : string,
    month_index : number,
    year:number,
    amount : number,
    transactions : number,
    categories : {
        name : string,
        amount:number,
        transactions : number,
        color: string,
        spenders : {
            name : string,
            amount:number,
            transactions : number,
        }[]
    }[],
    spenders : {
        name : string,
        amount:number,
        transactions : number,
        color: string,
        categories : {
            name : string,
            amount:number,
            transactions : number,
        }[]
    }[],
}

interface GoalStats extends Goal{
    stats : {startDate : string, endDate : string, amount : number}[],
}

interface Goal{
    id : number,
    period : 'w'|'m'|'y',
    goal : number,
    category_id : number,
    spender_id : number,
    created_at : string
    category : {id : number, name: string, color : string},
    spender : {id : number, name: string, color : string},
}