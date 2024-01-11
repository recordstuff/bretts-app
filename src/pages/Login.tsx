import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { ChangeEvent, FC, useState } from "react"
import { Link } from "react-router-dom"
import { httpClient } from "../HttpClient"
import { DefaultUserCredentials, UserCredentials } from "../models/UserCredentials"

const Layout: FC = () => {

    const [userCredentials, setUserCredentials] = useState<UserCredentials>(DefaultUserCredentials);

    const login = async (): Promise<void> => {
        httpClient.token = await httpClient.post<UserCredentials, string>('login', userCredentials)
    }

    const credentialsChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        let newCreds = { ...userCredentials }
        newCreds[event.target.name as keyof UserCredentials] = event.target.value
        setUserCredentials(newCreds)
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Grid item xl={3} container direction="column" margin={2} spacing={2}>
                <Grid item>
                    <TextField
                        name="Email"
                        label="Email"
                        type="email"
                        onChange={credentialsChanged}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name="Password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={credentialsChanged}
                    />
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="primary" onClick={login}>
                        Login
                    </Button>
                </Grid>
                <Grid item>
                    <Typography>
                        Don't have an account?  <Link to="/sign-up">Sign Up</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>

    )
}

export default Layout