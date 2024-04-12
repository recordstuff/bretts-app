import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { Breadcrumbs, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export const Breadcrumbinator: FC = () => {
    const breadcrumbs = useSelector((state: RootState) => state.breadcrumbs.visitedPages)

    return (
        <Breadcrumbs>
            <Link to='/'>
                Home
            </Link>
            {breadcrumbs.map((page, index) => {
                if (index === breadcrumbs.length - 1) {
                    return (
                        <Typography>
                            {page.title}
                        </Typography>
                    )
                }
                else {
                    return (
                        <Link to={page.url}>
                            {page.title}
                        </Link>
                    )
                }
            })}
        </Breadcrumbs>
    )
}
