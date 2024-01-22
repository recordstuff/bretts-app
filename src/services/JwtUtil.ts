import { Jwt } from "../models/Jwt"

export const encodedTokenName: string = "accessToken"

class JwtUtil {
    private readonly expirationName: string = "accessTokenExpiration"

    public get isExpired() : boolean {
        const expireSecondsStr = localStorage.getItem(this.expirationName)

        if (expireSecondsStr === null) return true

        const expireSeconds = parseInt(expireSecondsStr)

        return expireSeconds <= Date.now() / 1000
    }

    public set token(encodedToken: string) {
        try {
            if (encodedToken.length > 0) {
                const parts = encodedToken.split('.')
                let body = parts[1].replace('-', '+').replace('_', '/')
                const padding = 4 - (body.length % 4)
    
                if (padding > 0) {
                    body = body.padEnd(padding)
                }

                const jwt: Jwt = JSON.parse(atob(body))

                localStorage.setItem(encodedTokenName, encodedToken)
                localStorage.setItem(this.expirationName, jwt.exp.toString())                

                return
            }

            this.clear()
        }
        catch (_: unknown) {
            this.clear()
        }
    }

    public clear(): void {
        localStorage.removeItem(encodedTokenName)
        localStorage.removeItem(this.expirationName)
    }
}

export const jwtUtil = new JwtUtil()