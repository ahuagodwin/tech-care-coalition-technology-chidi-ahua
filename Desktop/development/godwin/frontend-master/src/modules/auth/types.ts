export type LoginForm={
    email:string;
    password:string;
}

export type ResetPasswordForm={
    email:string;
    password:string;
    password_confirmation:string;
    token:string;
}

export type RegistrationForm={
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    agree?:boolean;
    usertype: string,
    invited_code?: string
}

export type CompanyDetailsForm={
    name?:string;
    phone_number?:string;
    description?:string;
    hear_about_us?:string;
    avatar?:File|string;
}