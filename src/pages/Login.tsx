import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { FC } from "react"
import { Link } from "react-router-dom"

const Layout: FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
    <Grid item xl={3} container direction="column" margin={2} spacing={2}>
      <Grid item>
        <TextField
          id="email"
          label="Email"
          type="email"
        />
      </Grid>
      <Grid item>
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary">
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