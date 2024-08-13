export type WorkFormType = {
    category:number;
    videos:{link:string, thumbnail:File|null}[];
    attachments:File[];
}

export type PromoCodeFormType = {
    name:string;
    code:string;
    type:string | string[];
    amount:string;
    start:string | Date;
    ends:string | Date;
    subscriptions: number[];
    recurring: number;
    no_of_usage: number;
    billing_type: string[]
    
    amount_symbol:string;
}

export type AddonFormType = {
    // Add Addon and edit addon/plan
    title:string;
    description?: string;
    
    // Adding addon
    price_naira_monthly:string;
    price_dollar_monthly:string;

    // Edit addon/plan
    price:string;
    group_identifier: string;
    
    // Editing plan
    features:{title:string, info:string}[];
    slash: string;
    discount: string;
}

interface PlanFee {
    price: string;
    slash_price?: string;
    save: string;
}
interface BillingType {
    naira: PlanFee;
    dollar: PlanFee;
}
export type PlanFormType = {
    title:string;
    description:string;
    features:{title:string, info:string}[];
    billing: {
        monthly: BillingType
        quarterly: BillingType
        bi_annually: BillingType
        annually: BillingType
    };
}
export type InviteUserForm = {
    email:string;
    role:string;
}