import { ReactElement, ReactNode } from 'react';
import { Grid, Box, Theme } from '@mui/material';

const drawerWidth: number = 200;
const mediaPlayerHeight: number = 94;
const topBarHeight: number = 64;

const styles = {
    root: {
        m: 2,
        minHeight: '100%',
        backgroundColor: 'background.default',
        marginLeft: (theme: Theme) =>
            `calc(${drawerWidth}px + ${theme.spacing(4)})`,
        '&::before, &::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            zIndex: 99,
            height: '40px',
            width: '100%',
        },
        '&::before': {
            background: (theme: Theme) =>
                `linear-gradient(0deg, rgba(255,255,255,0) 0%, ${theme.palette.background.paper} 100%)`,
        },
        '&::after': {
            transform: 'translateY(-100%)',
            background: (theme: Theme) =>
                `linear-gradient(0deg, ${theme.palette.background.paper} 0%, rgba(255,255,255,0) 100%)`,
        },
    },
    topbar: {
        width: (theme: Theme) => `calc(100% - ${theme.spacing(4)})`,
    },
    container: {
        bgcolor: (theme: Theme) => theme.palette.background.paper,
        height: (theme: Theme) =>
            `calc(100vh - ${theme.spacing(
                8
            )} - ${mediaPlayerHeight}px - ${topBarHeight}px)`,
        p: 4,
        overflow: 'auto',
        alignContent: 'flex-start',
    },
};

interface IProps {
    children: ReactNode;
}

export default function ContentPane({
    children,
    ...props
}: IProps): ReactElement {
    return (
        <>
            <Box sx={styles.root} position='relative' {...props}>
                <Grid
                    container
                    sx={styles.container}
                    columns={8}
                    position='relative'
                >
                    {children}
                </Grid>
            </Box>
        </>
    );
}
