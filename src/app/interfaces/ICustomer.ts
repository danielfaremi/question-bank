export interface ICustomerFull { 
    id?: number;
    firstname: string;
    surname: string;
    middlename: string;
    address: string;
    phone: string;
    gender: string;
    account_type: string;
    status: string;
    added_by: string;

    dob?: string;
    email?: string;
    customer_key?: string;
    date_joined?: string;
    bankName?: string;
    accountNumber?: string;
    bankAccountType?: string;
    creditStatus?: string;
}


export interface ICustomerQuick { 
    id?: number;
    firstname: string;
    surname: string;
    middlename: string;
    phone: string;
    gender: string;


}
