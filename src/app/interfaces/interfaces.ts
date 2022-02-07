export interface owner {
    id: number;
    firstname: string;
    middlename: string;
    surname: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    gender: string;
    date_joined: string;
    account_type: string;
    staff_key: string;
    status: string;
    username: string;
    password: string;
}

export interface newStaff {
    id?: number;
    firstname: string;
    surname: string;
    middlename: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    gender: string;
    date_joined?: string;
    account_type: string;
    staff_key?: string;
    username: string;
    password: string;
    status: string;
    added_by: string;
}

export interface login{
    username: string;
    password: string;
}

export interface Response{
    success: boolean;
    message: string;
    payload?: Payload;
}

export interface Payload{
    id: number;
    firstname: string;
    surname: string;
    middlename: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    gender: string;
    date_joined: string;
    account_type: string;
    staff_key: string;
    username: string;
    password: string;
    status: string;
}

