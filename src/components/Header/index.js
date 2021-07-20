import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';

const Header = () => {
    const styles = useStyles();
    return (
        <div className={styles.navContainer}>
            <div className={styles.nav}>
                <Paper className={styles.navItem} elevation={0}>
                    <Link to="/councillors">
                        <Typography variant="body1">Councillors</Typography>
                    </Link>
                </Paper>
                <Paper className={styles.navItem} elevation={0}>
                    <Link to="/councils">
                        <Typography variant="body1">Councils</Typography>
                    </Link>
                </Paper>
                <Paper className={styles.navItem} elevation={0}>
                    <Link to="/affairs">
                        <Typography variant="body1">Affairs</Typography>
                    </Link>
                </Paper>
            </div>
        </div>
    );
};
export default Header;
