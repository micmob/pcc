import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    navContainer: {
        background: '#212021',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    nav: {
        maxWidth: 1400,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
    navItem: {
        padding: 16,
        marginRight: 32,
        '&:last-child': {
            marginRight: 0,
        },
        background: 'transparent',

        '& a': {
            textDecoration: 'none',
            color: 'white',
        },
    },
}));

export { useStyles };
