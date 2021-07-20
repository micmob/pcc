import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import Table from '../../components/Table';
import { useStyles } from './styles';

const Home = ({ fetchEntity, reducer, filterList }) => {
    const styles = useStyles();

    // ***** FETCHING *****

    useEffect(() => {
        fetchEntity(1);
    }, [fetchEntity]);

    // ***** SET DATA & LOADING & ERRORS *****
    const entity = useSelector(reducer);
    const [entityData, setEntityData] = useState(null);
    const [filteredData, setFilteredData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [keys, setKeys] = useState([]);

    useEffect(() => {
        if (!entity.loading && !entity.error) {
            setEntityData(entity.data);
            setFilteredData(entity.data);
            setLoading(false);

            // getting a list of all existent keys
            const updatedKeys = [];
            entity.data.map(data =>
                Object.keys(data).map(
                    key =>
                        !updatedKeys.includes(key.toString()) &&
                        key !== 'hasMorePages' &&
                        updatedKeys.push(key.toString())
                )
            );
            setKeys(updatedKeys);
        } else {
            if (entity.loading) {
                setLoading(entity.loading);
            }
            if (entity.error) {
                setError(entity.error);
            }
        }
    }, [entity]);

    const [orderBy, setOrderBy] = useState();
    const [order, setOrder] = useState('asc'); // 'desc' or 'asc'

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

        setEntityData([...entityData].sort(sortData));
        setFilteredData([...filteredData].sort(sortData));
    };

    const [filters, setFilters] = useState({});

    const handleFilterChange = (e, property) => {
        const updatedFilter = Object.assign({}, filters);
        updatedFilter[property] = e.target.value;
        setFilters(updatedFilter);
    };

    const handleFilterClick = e => {
        e.preventDefault();
        const updatedEntity = entityData.filter(data =>
            Object.keys(filters).reduce(
                (acc, key) =>
                    acc &&
                    (filters[key] === '' || // current filter isn't applied
                        data[key]
                            .toString()
                            .toLowerCase()
                            .includes(filters[key].toString().toLowerCase())),
                true
            )
        );
        setFilteredData(updatedEntity);
    };

    return (
        <div>
            {loading || keys.length === 0 ? (
                <div>
                    <Typography variant="body2">Loading...</Typography>
                </div>
            ) : error ? (
                <div>
                    <Typography variant="body2">{error}</Typography>
                </div>
            ) : (
                <>
                    {/* ***** FILTERS SECTION ***** */}
                    <Paper className={styles.filters}>
                        {filterList.map(f => (
                            <TextField
                                label={f}
                                variant="outlined"
                                value={filters[f]}
                                onChange={e => handleFilterChange(e, f)}
                                className={styles.filtersItem}
                            />
                        ))}
                        <div className={styles.filtersButtonContainer}>
                            <Button
                                variant="outlined"
                                onClick={e => handleFilterClick(e)}
                                className={styles.filtersButton}
                            >
                                <Typography variant="body2">Filter</Typography>
                            </Button>
                        </div>
                    </Paper>
                    {/* ***** TABLE ***** */}
                    <Table
                        keys={keys}
                        orderBy={orderBy}
                        order={order}
                        sort={sort}
                        filteredData={filteredData}
                        filterList={filterList}
                    />
                </>
            )}
        </div>
    );
};

export default Home;
