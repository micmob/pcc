import { Button, Paper, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import Table from '../../components/Table';

const Home = ({ fetchEntity, reducer, filterList }) => {
    useEffect(() => {
        fetchEntity(1);
    }, [fetchEntity]);

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
        const updatedEntity = entityData.filter(data => {
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
        setFilteredData(updatedEntity);
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
                        filterList={filterList}
                    />
                </>
            )}
        </div>
    );
};

export default Home;
