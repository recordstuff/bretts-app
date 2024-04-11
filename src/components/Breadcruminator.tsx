import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { BreadcrumbState, VisitedPage } from "../reducers/BreadcrumbsSlice"

export const Breadcrumbinator: FC = () => {
    const breadcrumbs: BreadcrumbState = useSelector((state: RootState) => state.breadcrumbs)

    return (
        <></>
    )
}
