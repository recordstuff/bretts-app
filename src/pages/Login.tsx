import { Box, Button, Grid, TextField } from "@mui/material"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { httpClient } from "../services/HttpClient"
import { jwtUtil } from "../services/JwtUtil"
import { DefaultUserCredentials, UserCredentials } from "../models/UserCredentials"
import { useNavigate } from 'react-router-dom';

const Layout: FC = () => {

    const [userCredentials, setUserCredentials] = useState<UserCredentials>(DefaultUserCredentials);
    const navigate = useNavigate();

    const login = async (): Promise<void> => {
        try {
            jwtUtil.token = await httpClient.post<UserCredentials, string>('user/login', userCredentials)

            if (!jwtUtil.isExpired) {
                navigate('/')
            }
        }
        catch (ex: unknown) {
            // TODO: handle unauthorized and badrequest
            throw ex;
        }
    }

    const credentialsChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        let newCreds = { ...userCredentials }
        newCreds[event.target.name as keyof UserCredentials] = event.target.value
        setUserCredentials(newCreds)
    }

    useEffect(() => {
        jwtUtil.clear();
      }, []);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <Grid item lg={4} container direction="column" margin={2} spacing={2}>
                <Grid item>
                    <TextField
                        fullWidth
                        name="Email"
                        label="Email"
                        type="email"
                        onChange={credentialsChanged}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        name="Password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={credentialsChanged}
                    />
                </Grid>
                <Grid item>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={login}>
                        Login
                    </Button>
                </Grid>
                <Grid item>
                    <p>
                        Don't have an account?  <Link to="/sign-up">Sign Up</Link>
                    </p>
                </Grid>
            </Grid>
        </Box>

    )
}

export default Layout