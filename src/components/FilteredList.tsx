import { FC, useState } from 'react';
import { List, ListItem, Stack } from '@mui/material';
import TextFilter from './TextFilter';
import { NameGuidPair } from '../models/NameGuidPair';

export interface Props {
    label: string
    items: NameGuidPair[]
}

const FilteredList: FC<Props> = ({ label, items }) => {
    const [searchText, setSearchText] = useState('')

    return (
        <Stack>
            <TextFilter
                label={`${label} Filter`} searchText={searchText} setSearchText={setSearchText} />
            <List>
                {items.map((item) => (
                    <ListItem
                        key={item.Guid}>
                        {item.Name}
                    </ListItem>))}
            </List>
        </Stack>
    )
}

export default FilteredList