import {
    useState,
    ReactElement,
    ChangeEvent,
    ReactComponentElement,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
    Container,
    Box,
    FormLabel,
    TextField,
    FormGroup,
    FormControl,
    FormControlLabel,
    OutlinedInput,
    Select,
    Checkbox,
    MenuItem,
    Button,
    Link,
    Typography,
    Alert,
    RadioGroup,
    Radio,
    FormHelperText,
    SelectClassKey,
    Stack,
} from '@mui/material';
import { Logo } from '../components';
import { signup } from '../context/authActions';
import useAuth from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';

const initialValues = {
    email: '',
    confirmEmail: '',
    password: '',
    username: '',
    birthDate: {
        day: '',
        month: '',
        year: '',
    },
    gender: '',
    newsletter: false,
    agreed: false,
};

const initialErrors = {
    email: {
        isInvalid: false,
        showMessage: false,
        message:
            '✕  Podany adres jest nieprawidłowy. Sprawdź, czy wpisujesz go zgodnie z formatem przyklad@email.com.',
    },
    confirmEmail: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Potwierdź swój adres e-mail.',
    },
    password: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Wprowadź hasło.',
    },
    username: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Wprowadź nazwę użytkownika dla swojego profilu.',
    },
    day: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Podaj prawidłowy dzień miesiąca.',
    },
    month: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Wybierz miesiąc z listy.',
    },
    year: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Podaj prawidłowy rok.',
    },
    gender: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Wybierz swoją płeć.',
    },
    agreed: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Zaakceptuj warunki, aby kontynuować.',
    },
    incorrectCredentials: {
        isInvalid: false,
        showMessage: false,
        message: '✕  Nieprawidłowa nazwa użytkownika lub błędne hasło.',
    },
};

const months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
];

type Gender = 'male' | 'female' | 'non-binary';

interface IUser {
    email: string;
    confirmEmail: string;
    password: string;
    username: string;
    gender: Gender;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    isSubscribedToNewsletter: boolean;
    hasAcceptedTos: boolean;
}

export default function SignUp(props: {}): ReactElement {
    const printUser = () => {
        console.log('hello');
    };
    const {
        data: user,
        errors,
        handleChange,
        handleClick,
        handleSubmit,
    } = useForm<IUser>({
        validations: {
            email: {
                pattern: {
                    value: `^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`,
                    message:
                        '✕  Podany adres jest nieprawidłowy. Sprawdź, czy wpisujesz go zgodnie z formatem przyklad@email.com.',
                },
                required: {
                    value: true,
                    message: '✕  Podaj swój adres e-mail.',
                },
            },
            confirmEmail: {
                required: {
                    value: true,
                    message: '✕  Potwierdź swój adres e-mail.',
                },
                custom: {
                    isValid: (value: string) => value === 'test@gmail.com',
                    message: '✕  Podane adresy e-mail są różne.',
                },
            },
            password: {
                required: {
                    value: true,
                    message: '✕  Wprowadź hasło.',
                },
                custom: {
                    isValid: (value: string) => value.length > 8,
                    message: '✕  Twoje hasło jest za krótkie.',
                },
            },
            username: {
                required: {
                    value: true,
                    message:
                        '✕  Wprowadź nazwę użytkownika dla swojego profilu.',
                },
            },
            birthDay: {
                pattern: {
                    value: '^([1-9]|1[0-9]|2[0-9]|3[0-1])$',
                    message: '✕  Podaj prawidłowy dzień miesiąca.',
                },
            },
            birthMonth: {
                required: {
                    value: true,
                    message: '✕  Wybierz miesiąc z listy.',
                },
                custom: {
                    isValid: (value: string) => months.includes(value),
                    message: '✕  Twoje hasło jest za krótkie.',
                },
            },
            birthYear: {
                pattern: {
                    value: `^(19[0-9][0-9]|(201[0-9]|202[0-2]))$`,
                    message: '✕  Podaj prawidłowy rok.',
                },
            },
            gender: {
                required: {
                    value: true,
                    message: '✕  Wybierz swoją płeć.',
                },
            },
            hasAcceptedTos: {
                required: {
                    value: true,
                    message: '✕  Zaakceptuj warunki, aby kontynuować.',
                },
            },
        },
        onSubmit: printUser,
    });

    return (
        <>
            <Box
                p={3}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Link href='/' sx={{ height: 40 }}>
                    <Logo height={40} />
                </Link>
            </Box>
            <Container maxWidth='xs' component='main' disableGutters>
                <Box
                    component='form'
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 1.5,
                    }}
                    onSubmit={handleSubmit}
                >
                    <Typography component='h1' variant='h6' textAlign='center'>
                        Zarejestruj się za pomocą adresu e-mail
                    </Typography>
                    <Box>
                        <FormLabel>Twój adres e-mail</FormLabel>
                        <TextField
                            fullWidth
                            size='small'
                            name='email'
                            type='text'
                            margin='dense'
                            autoComplete='email'
                            placeholder='Podaj adres e-mail'
                            value={user.email || ''}
                            error={errors.email ? true : false}
                            helperText={errors?.email}
                            onChange={handleChange('email')}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Potwierdź swój e-mail</FormLabel>
                        <TextField
                            fullWidth
                            size='small'
                            name='email'
                            type='text'
                            margin='dense'
                            autoComplete='email'
                            placeholder='Wpisz e-mail ponownie'
                            value={user.confirmEmail || ''}
                            error={errors.confirmEmail ? true : false}
                            helperText={errors?.confirmEmail}
                            onChange={handleChange('confirmEmail')}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Stwórz hasło</FormLabel>
                        <TextField
                            fullWidth
                            size='small'
                            name='password'
                            type='password'
                            margin='dense'
                            placeholder='Stwórz hasło'
                            value={user.password || ''}
                            error={errors.password ? true : false}
                            helperText={errors?.password}
                            onChange={handleChange('password')}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Jak mamy się do Ciebie zwracać?</FormLabel>
                        <TextField
                            fullWidth
                            size='small'
                            name='username'
                            type='text'
                            margin='dense'
                            placeholder='Wpisz nazwę użytkownika'
                            value={user.username || ''}
                            error={errors.username ? true : false}
                            helperText={errors?.username}
                            onChange={handleChange('username')}
                        />
                    </Box>
                    <FormLabel>Podaj swoją datę urodzenia</FormLabel>
                    <Stack
                        direction='row'
                        justifyContent='center'
                        alignItems='center'
                        spacing={2}
                    >
                        <FormControl sx={{ maxWidth: 60 }}>
                            <Typography variant='subtitle2'>Dzień</Typography>
                            <TextField
                                size='small'
                                type='text'
                                placeholder='DD'
                                margin='dense'
                                name='birthDay'
                                value={user.birthDay || ''}
                                error={errors.birthDay ? true : false}
                                onChange={handleChange('birthDay')}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <Typography variant='subtitle2'>Miesiąc</Typography>
                            <Select
                                displayEmpty
                                size='small'
                                input={<OutlinedInput />}
                                renderValue={(selected: any) => {
                                    if (selected.length === 0) {
                                        return (
                                            <Typography
                                                variant='subtitle1'
                                                color='text.disabled'
                                            >
                                                Miesiąc
                                            </Typography>
                                        );
                                    }
                                }}
                                value={user.birthMonth || ''}
                                error={errors.birthMonth ? true : false}
                                //onChange={handleSelect}
                            >
                                <MenuItem disabled>
                                    <div>Miesiąc</div>
                                </MenuItem>
                                {months.map((month) => (
                                    <MenuItem key={month} value={month}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ maxWidth: 120 }}>
                            <Typography variant='subtitle2'>Rok</Typography>
                            <TextField
                                fullWidth
                                size='small'
                                name='birthYear'
                                type='text'
                                margin='dense'
                                placeholder='RRRR'
                                value={user.birthYear || ''}
                                error={errors.birthYear ? true : false}
                                onChange={handleChange('birthYear')}
                            />
                        </FormControl>
                    </Stack>
                    <FormControl>
                        {errors.birthDay && (
                            <FormHelperText error>
                                {errors.birthDay}
                            </FormHelperText>
                        )}
                        {errors.birthMonth && (
                            <FormHelperText error>
                                {errors.birthMonth}
                            </FormHelperText>
                        )}
                        {errors.birthYear && (
                            <FormHelperText error>
                                {errors.birthYear}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormGroup>
                        <FormLabel>Podaj swoją płeć</FormLabel>
                        <RadioGroup
                            row
                            aria-label='gender'
                            name='gender'
                            value={user.gender || ''}
                            onChange={handleChange('gender')}
                        >
                            <FormControlLabel
                                label='Mężczyzna'
                                value='male'
                                control={
                                    <Radio
                                        inputProps={{ 'aria-label': 'male' }}
                                    />
                                }
                            />
                            <FormControlLabel
                                label='Kobieta'
                                value='female'
                                control={
                                    <Radio
                                        inputProps={{ 'aria-label': 'female' }}
                                    />
                                }
                            />
                            <FormControlLabel
                                label='Osoba niebinarna'
                                value='non-binary'
                                control={
                                    <Radio
                                        inputProps={{
                                            'aria-label': 'non-binary',
                                        }}
                                    />
                                }
                            />
                        </RadioGroup>
                        <FormControl>
                            <FormHelperText
                                error={errors.gender ? true : false}
                            >
                                {errors?.gender}
                            </FormHelperText>
                        </FormControl>
                    </FormGroup>
                    <FormControlLabel
                        label='Chcę otrzymywać wiadomości i oferty od Spotify'
                        control={
                            <Checkbox
                            // value={formValues.newsletter}
                            // onClick={() =>
                            //     setFormValues({
                            //         ...formValues,
                            //         remember: !formValues.remember,
                            //     })
                            // }
                            />
                        }
                    />
                    <FormGroup>
                        <FormControlLabel
                            label={
                                <div>
                                    <span>Akceptuję </span>
                                    <Link
                                        color='primary'
                                        target='_blank'
                                        href='https://www.spotify.com/pl/legal/end-user-agreement/'
                                    >
                                        Warunki korzystania z serwisu Spotify
                                    </Link>
                                    <span>.</span>
                                </div>
                            }
                            control={
                                <Checkbox
                                    value={user.hasAcceptedTos || false}
                                    onClick={handleClick('hasAcceptedTos')}
                                />
                            }
                        />
                        <FormControl>
                            <FormHelperText
                                error={errors.hasAcceptedTos ? true : false}
                            >
                                {errors?.hasAcceptedTos}
                            </FormHelperText>
                        </FormControl>
                    </FormGroup>
                    <Typography
                        gutterBottom
                        align='center'
                        component='h4'
                        variant='caption'
                    >
                        Aby dowiedzieć się więcej o tym, w jaki sposób Spotify
                        zbiera, wykorzystuje i udostępnia Twoje dane osobowe,
                        zapoznaj się z{' '}
                        <Link
                            color='primary'
                            target='_blank'
                            href='https://www.spotify.com/pl/legal/privacy-policy/'
                        >
                            Polityką prywatności Spotify
                        </Link>
                        .
                    </Typography>
                    <Button
                        variant='contained'
                        type='submit'
                        fullWidth
                        size='large'
                        sx={{ textTransform: 'none' }}
                    >
                        Zarejestruj się
                    </Button>
                    <Typography
                        gutterBottom
                        align='center'
                        component='h2'
                        variant='body1'
                    >
                        Masz już konto?{' '}
                        <Link color='primary' href='/login'>
                            Zaloguj się
                        </Link>
                        .
                    </Typography>
                </Box>
            </Container>
        </>
    );
}
