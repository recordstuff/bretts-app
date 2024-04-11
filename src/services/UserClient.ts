import { JwtRole } from "../models/Jwt";
import { PaginationResult } from "../models/PaginationResult";
import { DisplayedUser } from "../models/DisplayedUser";
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
    ): Promise<PaginationResult<DisplayedUser>> {
        return this.get<PaginationResult<DisplayedUser>>('users', {page, pageSize, searchText, roleFilter})
    }

    public getUser(id: string): Promise<DisplayedUser> {
        return this.get<DisplayedUser>(`user/${id}`)
    }
}

export const userClient = new UserClient()