import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useStyles } from './styles';

const Home = () => {
    const styles = useStyles();

    const { fetchCouncillors } = useActions();

    useEffect(() => {
        fetchCouncillors(1);
    }, [fetchCouncillors]);

    const councillors = useSelector(state => state.councillors);
    const [councillorsData, setCouncillorsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [keys, setKeys] = useState([]);

    useEffect(() => {
        if (!councillors.loading && !councillors.error) {
            setCouncillorsData(councillors.data);
            setLoading(false);

            const updatedKeys = [];
            councillors.data.map(data =>
                Object.keys(data).map(
                    key =>
                        !updatedKeys.includes(key.toString()) &&
                        key !== 'hasMorePages' &&
                        updatedKeys.push(key.toString())
                )
            );
            setKeys(updatedKeys);
        } else {
            if (councillors.loading) {
                setLoading(councillors.loading);
            }
            if (councillors.error) {
                setError(councillors.error);
            }
        }
    }, [councillors]);

    const [orderBy, setOrderBy] = useState();
    const [order, setOrder] = useState('asc');

    const sort = property => event => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        console.log(councillorsData);
        setCouncillorsData(
            [...councillorsData].sort((a, b) =>
                isAsc
                    ? a[property] < b[property]
                        ? -1
                        : a[property] > b[property]
                        ? 1
                        : 0
                    : a[property] < b[property]
                    ? 1
                    : a[property] > b[property]
                    ? -1
                    : 0
            )
        );
    };

    return (
        <div>
            {loading || keys.length === 0 ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <TableContainer component={Paper}>
                    <Table className={styles.table}>
                        <TableHead>
                            <TableRow key={councillorsData[0].id + 'head'}>
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
                                            {[
                                                'id',
                                                'firstName',
                                                'lastName',
                                            ].includes(key.toString()) ? (
                                                <TableSortLabel
                                                    active={
                                                        orderBy ===
                                                        key.toString()
                                                    }
                                                    direction={
                                                        orderBy ===
                                                        key.toString()
                                                            ? order
                                                            : 'asc'
                                                    }
                                                    onClick={sort(
                                                        key.toString()
                                                    )}
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
                            {councillorsData.map(data => (
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
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default Home;
