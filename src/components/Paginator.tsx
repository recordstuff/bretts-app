import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid, Pagination, Typography } from '@mui/material';
import { PaginationResult } from '../models/PaginationResult';

export interface Props {
    paginationResult: PaginationResult<Object>
    setPage: Dispatch<SetStateAction<number>>
}

const Paginator: FC<Props> = ({paginationResult, setPage}) => {

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
      }

    return (
        <Grid container marginTop={1} marginBottom={1} spacing={2} direction='column' alignItems='center'>
            <Grid item>
                <Typography>Page {paginationResult.Page} of {paginationResult.PageCount}</Typography>
            </Grid>
            <Grid item>
                <Pagination
                    count={paginationResult.PageCount}
                    showFirstButton 
                    showLastButton
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    )
}

export default Paginator