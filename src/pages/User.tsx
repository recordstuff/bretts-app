import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { userClient } from "../services/UserClient"
import { DisplayedUser, emptyDisplayedUser } from "../models/DisplayedUser"
import { doneWaiting, pleaseWait } from "../reducers/WaitSpinnerSlice"
import { useDispatch } from "react-redux"
import { Button, Stack, TextField } from "@mui/material"
import { useParams } from "react-router-dom";
import { addBreadcrumb } from "../reducers/BreadcrumbsSlice"

const User: FC = () => {
    
    const dispatch = useDispatch()
    const setPageTitle: Dispatch<SetStateAction<string>> = useOutletContext()
    const [user, setUser] = useState<DisplayedUser>(emptyDisplayedUser())
    const { id } = useParams();

    const getUser = useCallback(async (): Promise<void> => {
        if (id === undefined) return

        dispatch(pleaseWait())

        setUser(await userClient.getUser(id))

        dispatch(doneWaiting())
    }, [dispatch, id])

    useEffect(() => {
        let pageTitle
        let url = '/user'
        
        if (id === undefined) {
            pageTitle = 'Add User'
        }
        else {
            pageTitle = 'Edit User'
            url = `${url}/${id}`
        }

        setPageTitle(pageTitle)
        dispatch(addBreadcrumb({title: pageTitle, url}))
        getUser()
    }, [id, setPageTitle, getUser])

    return (<>
        <Stack margin={2} spacing={4}>
            <TextField fullWidth label="Id" value={user.UserGuid} disabled />
            <TextField fullWidth label="Display Name" value={user.DisplayName}  />
            <TextField fullWidth label="Email" value={user.Email} />
            <Stack direction='row' spacing={2}>
                <Button color='primary' variant="contained">{id === undefined ? 'Add' : 'Save'}</Button>
                <Button>Cancel</Button>
            </Stack>
        </Stack>
    </>
    )
}

export default User
