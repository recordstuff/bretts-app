export interface DisplayedUser {
    UserGuid: string,
    Email: string,
    DisplayName: string,
}

export const emptyDisplayedUser = (): DisplayedUser => ({
    DisplayName: '',
    UserGuid: '',
    Email: ''
})
