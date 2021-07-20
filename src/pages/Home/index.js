import { Button, Paper, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useStyles } from './styles';
import Table from '../../components/Table';

const Home = () => {
    const styles = useStyles();

    const { fetchCouncillors } = useActions();

    useEffect(() => {
        fetchCouncillors(1);
    }, [fetchCouncillors]);

    const councillors = useSelector(state => state.councillors);
    const [councillorsData, setCouncillorsData] = useState(null);
    const [filteredData, setFilteredData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [keys, setKeys] = useState([]);

    useEffect(() => {
        if (!councillors.loading && !councillors.error) {
            setCouncillorsData(councillors.data);
            setFilteredData(councillors.data);
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

        const sortData = (a, b) =>
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
                : 0;
        setCouncillorsData([...councillorsData].sort(sortData));
        setFilteredData([...filteredData].sort(sortData));
    };

    const filterList = ['id', 'firstName', 'lastName'];
    const [filters, setFilters] = useState({});

    const handleFilterChange = (e, property) => {
        const updatedFilter = Object.assign({}, filters);
        updatedFilter[property] = e.target.value;
        setFilters(updatedFilter);
    };

    const handleFilterClick = e => {
        e.preventDefault();
        const updatedCouncillors = councillorsData.filter(data => {
            console.log(
                Object.keys(filters).reduce(
                    (acc, key) =>
                        acc &&
                        (filters[key] === '' ||
                            data[key]
                                .toString()
                                .toLowerCase()
                                .includes(
                                    filters[key].toString().toLowerCase()
                                )),
                    true
                )
            );
            return Object.keys(filters).reduce(
                (acc, key) =>
                    acc &&
                    (filters[key] === '' ||
                        data[key]
                            .toString()
                            .toLowerCase()
                            .includes(filters[key].toString().toLowerCase())),
                true
            );
        });
        setFilteredData(updatedCouncillors);
    };

    return (
        <div>
            {loading || keys.length === 0 ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <Paper>
                        {filterList.map(f => (
                            <TextField
                                label={f}
                                variant="outlined"
                                value={filters[f]}
                                onChange={e => handleFilterChange(e, f)}
                            />
                        ))}
                        <Button
                            variant="outlined"
                            onClick={e => handleFilterClick(e)}
                        >
                            Filter
                        </Button>
                    </Paper>
                    <Table
                        keys={keys}
                        orderBy={orderBy}
                        order={order}
                        sort={sort}
                        filteredData={filteredData}
                    />
                </>
            )}
        </div>
    );
};

export default Home;
