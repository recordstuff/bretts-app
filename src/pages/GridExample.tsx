import { Grid, TextField, Typography } from "@mui/material"
import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { useOutletContext } from "react-router-dom"

const GridExample: FC = () => {
    const setPageTitle: Dispatch<SetStateAction<string>> = useOutletContext()

    useEffect(() => {
        setPageTitle('Grid Example')
    }, [setPageTitle])

    // no need to use <></> as it is only one parent component to return.

    return (
            <Grid container>
                <Grid item sm={12} lg={6} xl={5} container direction='column' padding={2} spacing={2}>
                    <Grid item>
                        <Typography variant="h6">Contact</Typography>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Name" />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Email" />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Phone" />
                    </Grid>
                </Grid>
                <Grid item sm={12} lg={6} xl={5} container direction='column' padding={2} spacing={2}>
                    <Grid item>
                        <Typography variant="h6">Address</Typography>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Street" />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="City" />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="State" />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="Zip Code" />
                    </Grid>
                </Grid>
            </Grid>
    )
}

export default GridExample