export interface UserCredentials {
    Email: string
    Password: string
}

export const DefaultUserCredentials = () : UserCredentials =>
{
    return {
        Email: "",
        Password: ""
    }
}