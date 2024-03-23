import { Box, Button, Grid, TextField } from "@mui/material"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { httpClient } from "../services/HttpClient"
import { jwtUtil } from "../services/JwtUtil"
import { defaultUserCredentials, UserCredentials } from "../models/UserCredentials"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { doneWaiting, pleaseWait } from "../reducers/WaitSpinnerSlice"

const Layout: FC = () => {

    const [userCredentials, setUserCredentials] = useState<UserCredentials>(defaultUserCredentials());
    const [useErrorCondition, setUseErrorCondition] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const login = async (): Promise<void> => {
        try {
            setUseErrorCondition(true)

            if (userCredentials.Email.length === 0 || userCredentials.Password.length === 0) return

            dispatch(pleaseWait())

            jwtUtil.token = await httpClient.post<UserCredentials, string>('user/login', userCredentials)

            dispatch(doneWaiting())

            if (!jwtUtil.isExpired) {
                navigate('/')
            }
        }
        catch (ex: unknown) {
            // TODO: handle badrequest
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
                        required
                        error={useErrorCondition && userCredentials.Email.length === 0}
                        helperText={useErrorCondition && userCredentials.Email.length === 0 && "Email cannot be blank."}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        fullWidth
                        name="Password"
                        label="Password"
                        type="password"
                        onChange={credentialsChanged}
                        required
                        error={useErrorCondition && userCredentials.Password.length === 0}
                        helperText={useErrorCondition && userCredentials.Password.length === 0 && "Password cannot be blank."}
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
                {/*<Grid item>
                    <p>
                        Don't have an account?  <Link to="/sign-up">Sign Up</Link>
                    </p>
                </Grid> */}
                <Grid item>
                    <p>
                        This is the React frontend.  Go to the <a href="http://brettdrake.org:8008/">Angular frontend</a>.
                    </p>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Layout