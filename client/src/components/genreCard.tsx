import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import * as ROUTES from '../constants/routes';

interface IGenreCard {
    title: string;
    slug: string;
    image: string;
    color?: string;
}

export default function GenreCard({
    title,
    slug,
    image,
    color,
}: IGenreCard): ReactElement {
    return (
        <Grid
            item
            xs={8}
            sm={4}
            md={2}
            lg={2}
            xl={1}
            aria-label={slug}
            draggable={false}
            component={Link}
            to={`${ROUTES.GENRE}/${slug}`}
        >
            <Box
                bgcolor={color ? color : 'primary.main'}
                sx={{
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 2,
                    backgroundColor: color,
                    '&::after': {
                        content: '" "',
                        display: 'block',
                        paddingBottom: '100%',
                    },
                }}
            >
                <Typography
                    variant='h5'
                    component='h2'
                    fontWeight='700'
                    color='secondary'
                    sx={{
                        p: 2,
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: '1',
                        position: 'absolute',
                        overflowWrap: 'break-word',
                        textShadow: '0 0 4px rgba(0,0,0,0.3)',
                    }}
                >
                    {title}
                </Typography>
                <img
                    src={image}
                    alt={title}
                    loading='lazy'
                    style={{
                        right: 0,
                        bottom: 0,
                        width: '60%',
                        position: 'absolute',
                        transform: 'rotate(25deg) translate(18%,-2%)',
                        boxShadow: '-3px 5px 8px 0 rgb(0 0 0 / 50%)',
                    }}
                />
            </Box>
        </Grid>
    );
}
