import { Backdrop, CircularProgress } from "@mui/material"
import { FC, createContext, useState } from "react"

export const PleaseWait: FC = () => {
    const [pleaseWait, setPleaseWait] = useState(true)
    
    return (
        <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={pleaseWait}
        >
            <CircularProgress />
        </Backdrop>
    )
}
