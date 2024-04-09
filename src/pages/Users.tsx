import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { userClient } from "../services/UserClient"
import { PaginationResult, emptyPaginationResult } from "../models/PaginationResult"
import { User } from "../models/User"
import { doneWaiting, pleaseWait } from "../reducers/WaitSpinnerSlice"
import { useDispatch } from "react-redux"
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import OptionFilter from "../components/OptionFilter"
import { JwtRole } from "../models/Jwt"
import Paginator from "../components/Paginator"

const PAGE_SIZE = 5

const Users: FC = () => {
    const dispatch = useDispatch()
    const setPageTitle: Dispatch<SetStateAction<string>> = useOutletContext()
    const [paginationResult, setPaginationResult] = useState<PaginationResult<User>>(emptyPaginationResult())
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState('')
    const [roleFilter, setRoleFilter] = useState<JwtRole>(JwtRole.Any)

    const getUsers = useCallback(async (): Promise<void> => {
        dispatch(pleaseWait())

        const response = await userClient.getUsers(page, PAGE_SIZE, searchText, roleFilter)

        setPaginationResult(response)

        dispatch(doneWaiting())
    }, [dispatch, page, searchText, roleFilter])

    useEffect(() => {
        setPageTitle('Users')
        getUsers()
    }, [setPageTitle, getUsers])

    return (
        <>
            <OptionFilter
                label="Has Role"
                options={[
                    { Name: 'Any', Value: JwtRole.Any },
                    { Name: 'User', Value: JwtRole.User },
                    { Name: 'Admin', Value: JwtRole.Admin },
                ]}
                filterOption={roleFilter}
                setFilterOption={setRoleFilter}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Guid
                            </TableCell>
                            <TableCell>
                                Display Name
                            </TableCell>
                            <TableCell>
                                Email
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginationResult.Items.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {row.UserGuid}
                                </TableCell>
                                <TableCell>
                                    {row.DisplayName}
                                </TableCell>
                                <TableCell>
                                    {row.Email}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Paginator
                paginationResult={paginationResult}
                setPage={setPage}
            />
        </>
    )
}

export default Users
