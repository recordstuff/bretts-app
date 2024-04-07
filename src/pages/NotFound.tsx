import { Grid, Typography } from "@mui/material"
import { FC } from "react"

const NotFound: FC = () => {
  return (
    <Grid item margin={4}>
      <Typography variant="h5">404 Error</Typography>
      <p>The page was not found.</p>
    </Grid>
  )
}

export default NotFound