import { NameGuidPair } from "./NameGuidPair";
import { UserSummary } from "./UserSummary";

export interface UserDetail extends UserSummary {
    Phone: string,
    Roles: NameGuidPair[]
}

export const emptyUserDetail = (): UserDetail => ({
    DisplayName: '',
    Guid: '',
    Email: '',
    Phone: '',
    Roles: []
})
