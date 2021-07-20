import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';

const Home = () => {
    const { fetchCouncillors } = useActions();

    useEffect(() => {
        fetchCouncillors(1);
    }, [fetchCouncillors]);

    const councillors = useSelector(state => state.councillors);
    const [councillorsData, setCouncillorsData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(councillors);
        if (!councillors.loading && !councillors.error) {
            setCouncillorsData(councillors.data);
        } else {
            if (councillors.loading) {
                setLoading(councillors.loading);
            }
            if (councillors.error) {
                setError(councillors.error);
            }
        }
    }, [councillors]);

    return <div>home</div>;
};

export default Home;
