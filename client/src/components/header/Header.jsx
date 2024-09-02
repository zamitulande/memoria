
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';
import chiva from '../../assets/header/Chiva.png'
import {
    BottomNavigation,
    BottomNavigationAction,
    Tooltip,
    Button,
    ButtonGroup,
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    useMediaQuery,
    Grid,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import Login from '../../auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../redux/features/userSlice';
import ResetPassword from '../../auth/ResetPassword';
import { clearTestimonies } from '../../redux/features/TestimonySlice';

const Header = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();

    const pages = [
        { item: 'Inicio', id: 1, path: '/' },
        { item: 'Nosotros', id: 2, path: 'nosotros' },
        { item: 'Repositorio', id: 3, path: 'repositorio' },
        { item: 'Colaboraciones', id: 4, path: 'colaboraciones' },
        { item: 'Datos Abiertos', id: 5, path: 'datos-abiertos' },
        { item: 'Usuarios', id: 6, path: 'usuarios' },
    ];
    const about = [
        { item: 'Sena', id: 1, path: 'https://www.sena.edu.co/es-co/Paginas/default.aspx' },
        { item: 'Sennova', id: 2, path: 'https://www.sena.edu.co/es-co/formacion/paginas/tecnologia-innovacion.aspx' },
        { item: 'Tecnoparque', id: 3, path: 'https://sena.edu.co/es-co/formacion/Paginas/tecnoparques.aspx' },
    ]

    const buttonsAuth = [
        { item: 'Ingresar', id: 1 },
        { item: 'Registrar', id: 2, path: 'usuarios/registrar' },
        { item: 'Cambiar contraseña', id: 3 },
        { item: 'Cerrar Sesion', id: 4 },
    ];

    const [open, setOpen] = useState(false);
    const [openResetPassword, setOpenResetPassword] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [valuePage, setValuePage] = useState(0)

    const login = useSelector((state) => state.user.login)
    const role = useSelector((state) => state.user.role)
    const userName = useSelector((state) => state.user.userName)

    const handleMenuOpen = (setter) => (event) => {
        setter(event.currentTarget);
    };

    const handleMenuClose = (setter) => () => {
        setter(null);
    };

    const handleLogout = () => {
        dispatch(setLogin(false))
        dispatch(clearTestimonies());
    }

    const filteredPages = pages.filter(page => {
        if (page.item === 'Usuarios' && (!login || role !== 'ADMIN')) {
            return false;
        }
        return true;
    });

    const filteredAuth = login
        ? buttonsAuth.filter(button => button.id === 3 || button.id === 4)
        : buttonsAuth.filter(button => button.id === 1 || button.id === 2);

    const renderButtonGroup = (items) => (
        <ButtonGroup disableElevation variant="contained" aria-label="button group">
            {items.map((item) => (
                <Link to={item.path} target="_blank" rel="noopener noreferrer" key={item.id}>
                    <Button size="small" color='secondary'>{item.item}</Button>
                </Link>
            ))}
        </ButtonGroup>
    );

    return (
        <>
            <AppBar position="fixed"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url(${chiva})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}>
                <Toolbar sx={{ justifyContent: 'space-around', display: { xs: 'none', md: 'flex' } }}>
                    <Box>{renderButtonGroup(about)}</Box>
                    {login ? <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>Bienvenido: {userName}</Typography> : null}
                </Toolbar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#fff' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#fff',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        {/* :::START MOVIL FIRST NAVBAR:: */}

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenuOpen(setAnchorElNav)}
                                color="inherit"
                                sx={{ color: '#fff' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleMenuClose(setAnchorElNav)}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <ButtonGroup
                                    orientation="vertical"
                                    variant="contained"
                                    aria-label="Vertical button group"
                                    sx={{ backgroundColor: '#fff', color: 'secondary' }}
                                >
                                    {filteredPages.map((page) => (
                                        <Link
                                            to={page.path}
                                            key={page.id}>
                                            <Button
                                                onClick={handleMenuClose(setAnchorElNav)}
                                                sx={{
                                                    color: 'secondary',
                                                    '&:hover': {
                                                        backgroundColor: '#d7eccf',
                                                        color: '#000',
                                                    }
                                                }}
                                            >
                                                {page.item}
                                            </Button>
                                        </Link>
                                    ))}
                                </ButtonGroup>
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#fff' }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#fff',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        {/* :::END MOVIL FIRST NAVBAR:: */}

                        <Box p={6} sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                            <Grid container direction="column" alignItems="center" spacing={2}>
                                <Grid item>
                                    <Typography variant='h2' color='secondary' fontWeight='bold'>Memoria Oral</Typography>
                                </Grid>
                                <Grid item sx={{ width: '100%' }}>
                                    <BottomNavigation
                                        style={{ backgroundColor: "transparent" }}
                                        showLabels
                                        value={valuePage}
                                        onChange={(event, newValue) => {
                                            setValuePage(newValue);
                                        }}>
                                        {filteredPages.map((page) => (
                                            <BottomNavigationAction

                                                sx={{
                                                    fontWeight: '600',
                                                    color: theme.palette.bottomNavigation.selected,
                                                    '&.Mui-selected': {
                                                        color: theme.palette.bottomNavigation.unselected,
                                                        fontWeight: '900',
                                                    },
                                                    '.MuiBottomNavigationAction-label': {
                                                        fontSize: '1rem',
                                                    },
                                                }}
                                                key={page.id}
                                                component={Link}
                                                to={page.path}
                                                label={page.item}
                                            >
                                            </BottomNavigationAction>
                                        ))}
                                    </BottomNavigation>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* :::START MOVIL FIRST LOGIN:: */}

                        <Box sx={{ display: { xs: 'flex', alignItems: 'center' } }}>
                            <Tooltip title="Abrir opciones.">
                                <div>
                                    {/* Renderizar el botón solo en pantallas medianas y superiores */}
                                    <Button
                                        color='secondary'
                                        variant="contained"
                                        sx={{ display: { xs: 'none', md: 'flex' } }}
                                        onClick={handleMenuOpen(setAnchorElUser)}
                                    >
                                        {login ? 'Opciones' : 'Acceder'}
                                    </Button>

                                    {/* Renderizar el ícono en pantallas pequeñas */}
                                    <IconButton
                                        onClick={handleMenuOpen(setAnchorElUser)}
                                        sx={{ display: { xs: 'flex', md: 'none' }, p: 0 }}
                                    >
                                        <LoginIcon sx={{ color: '#fff' }} />
                                    </IconButton>
                                </div>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleMenuClose(setAnchorElUser)}
                            >
                                <ButtonGroup orientation="vertical" variant="contained" aria-label="Vertical button group">
                                    {filteredAuth.map((button) => (
                                        <Fragment key={button.id}>
                                            {button.id === 1 ? (
                                                <>
                                                    <Button
                                                        onClick={(e) => {
                                                            setOpen(true)
                                                            handleMenuClose(setAnchorElUser)();
                                                        }}
                                                        size="small"
                                                        sx={{ color: '#333', '&:hover': { backgroundColor: '#f1f1f1' } }}
                                                    >
                                                        {button.item}
                                                    </Button>
                                                    <Login open={open} setOpen={setOpen} />
                                                </>
                                            ) : button.path ? (
                                                <Link to={button.path}>
                                                    <Button
                                                        onClick={handleMenuClose(setAnchorElUser)}
                                                        size="small"
                                                        sx={{ color: '#333', '&:hover': { backgroundColor: '#f1f1f1' } }}
                                                    >
                                                        {button.item}
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <>
                                                    <Button
                                                        onClick={() => {
                                                            if (button.id === 4) handleLogout();
                                                            if (button.id === 3) setOpenResetPassword(true);
                                                            handleMenuClose(setAnchorElUser)();
                                                        }}
                                                        size="small"
                                                        sx={{ color: '#333', '&:hover': { backgroundColor: '#f1f1f1' } }}
                                                    >
                                                        {button.item}
                                                    </Button>
                                                    <ResetPassword open={openResetPassword} setOpen={setOpenResetPassword} />
                                                </>
                                            )}
                                        </Fragment>
                                    ))}
                                </ButtonGroup>
                            </Menu>
                        </Box>
                        {/* :::END MOVIL FIRST LOGIN:: */}
                    </Toolbar>
                </Container>
            </AppBar>
            {isMobile ? <Box sx={{ height: '50px' }} /> : <Box sx={{ height: '325px' }} />}
        </>
    )
}

export default Header