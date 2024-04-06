import { ENCODED_TOKEN_NAME, Jwt, JwtField, JwtRole } from "../models/Jwt"

class JwtUtil {
    public get isExpired() : boolean {
        const expirationSecondsStr = localStorage.getItem(JwtField.ExpirationSeconds)

        if (expirationSecondsStr === null) return true

        const expirationSeconds = parseInt(expirationSecondsStr)

        return expirationSeconds <= Date.now() / 1000
    }

    public hasRole(role: JwtRole) : boolean {
        if (this.isExpired) return false
        
        if (role === JwtRole.Any) return true

        const rolesStr = localStorage.getItem(JwtField.Roles)

        if (rolesStr === null) return false

        const roles: string[] = JSON.parse(rolesStr)

        return roles.indexOf(role) >= 0
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

                const jwt: Jwt = new Map()
                const fields = Object.entries(JSON.parse(atob(body)))

                for (const [key, value] of fields) {
                    jwt.set(key as JwtField, value as string | number | string[])
                }

                const expriationSeconds = jwt.get(JwtField.ExpirationSeconds)
                let roles = jwt.get(JwtField.Roles)

                if (typeof roles === 'string')
                {
                    roles = [roles]                    
                }

                if (expriationSeconds !== undefined 
                 && roles !== undefined) {
                    localStorage.setItem(ENCODED_TOKEN_NAME, encodedToken)
                    localStorage.setItem(JwtField.ExpirationSeconds, expriationSeconds as string)
                    localStorage.setItem(JwtField.Roles, JSON.stringify(roles))         
                    return
                }
            }

            this.clear()
        }
        catch (_: unknown) {
            this.clear()
        }
    }

    public clear(): void {
        localStorage.removeItem(ENCODED_TOKEN_NAME)
        localStorage.removeItem(JwtField.ExpirationSeconds)
        localStorage.removeItem(JwtField.Roles)
    }
}

export const jwtUtil = new JwtUtil()