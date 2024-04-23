import { FC, useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListSubheader, Stack } from '@mui/material';
import TextFilter from './TextFilter';
import { NameGuidPair } from '../models/NameGuidPair';

export interface Props {
    label: string
    items: NameGuidPair[]
}

const FilteredList: FC<Props> = ({ label, items }) => {
    const [searchText, setSearchText] = useState('')

    return (
        <Box>
            <TextFilter
                label={`Filter ${label}`} searchText={searchText} setSearchText={setSearchText} />
            <List
            
            >
                {items.map((item) => (
                    <ListItemButton
                        key={item.Guid}>
                        {item.Name}
                    </ListItemButton>))}
            </List>
        </Box>
    )
}

export default FilteredList