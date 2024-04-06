import { JwtRole } from "../models/Jwt";
import { PaginationResult } from "../models/PaginationResult";
import { User } from "../models/User";
import { UserCredentials } from "../models/UserCredentials";
import { HttpClient } from "./HttpClient";

class UserClient extends HttpClient {
    constructor() {
        super('user')
    }

    public login(userCredentials: UserCredentials): Promise<string> {
        return this.post<UserCredentials, string>('login', userCredentials)
    }

    public getUsers(
        page: number,
        pageSize: number,
        searchText: string | null = null,
        roleFilter: JwtRole = JwtRole.Any
    ): Promise<PaginationResult<User[]>> {
        return this.get<PaginationResult<User[]>>('users', {page, pageSize, searchText, roleFilter})
    }
}

export const userClient = new UserClient()