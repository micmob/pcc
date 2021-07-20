import {
    Paper,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core';

/**
 *
 * @param keys all existent keys for filteredData
 * @param orderBy property of an entity
 * @param order 'asc' | 'desc'
 * @param sort function
 * @param filteredData
 * @param filterList list of properties used to filter
 */
const Table = ({ keys, orderBy, order, sort, filteredData, filterList }) => {
    return (
        <TableContainer component={Paper}>
            <MuiTable>
                <TableHead>
                    <TableRow key="head">
                        {keys.map(key => {
                            return (
                                <TableCell
                                    align="left"
                                    sortDirection={
                                        orderBy === key.toString()
                                            ? order
                                            : false
                                    }
                                >
                                    {filterList.includes(key.toString()) ? (
                                        <TableSortLabel
                                            active={orderBy === key.toString()}
                                            direction={
                                                orderBy === key.toString()
                                                    ? order
                                                    : 'asc'
                                            }
                                            onClick={sort(key.toString())}
                                        >
                                            {key}
                                        </TableSortLabel>
                                    ) : (
                                        key
                                    )}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map(data => (
                        <TableRow key={data.id}>
                            {keys.map(
                                key =>
                                    keys.includes(key) && (
                                        <TableCell align="left">
                                            {data[key]
                                                ? data[key].toString()
                                                : data[key]}
                                        </TableCell>
                                    )
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
