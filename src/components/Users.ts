import { IUser } from "../models/Product.Model";

export const getUsers = (): IUser[] => {
    return [
        {
            "email": "abc@gmail.com",
            "password": "test123"
        },
        {
            "email": "pqr@gmail.com",
            "password": "test123"
        },
        {
            "email": "xyz@gmail.com",
            "password": "test123"
        }
    ];
}
