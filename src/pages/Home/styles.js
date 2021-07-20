import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    filters: {
        marginBottom: 32,
        alignItems: 'center',
        display: 'flex',
        padding: 16,
    },
    filtersItem: {
        marginRight: 16,
        background: '#f5f5f5',
        borderRadius: theme.shape.borderRadius,
        '&:last-child': {
            marginRight: 0,
        },
    },
    filtersButtonContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    filtersButton: {
        background: '#f5f5f5',
    },
}));

export { useStyles };
