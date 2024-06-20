
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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
    Popper,
    Chip,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import Login from '../../auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../redux/features/userSlice';
import ResetPassword from '../../auth/ResetPassword';

const Header = () => {

    const theme = useTheme();
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
        { item: 'Contactenos', id: 4 },
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
    const [anchorElContact, setAnchorElContact] = useState(null);
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

    const contactClick = (event) => {
        setAnchorElContact(anchorElContact ? null : event.currentTarget);
    }

    const openInfo = Boolean(anchorElContact);
    const id = openInfo ? 'simple-popper' : undefined;
    if (anchorElContact) {
        setTimeout(() => {
            setAnchorElContact(null)
        }, 5000)
    }

    const handlePasswordChange = () => {

    }

    const handleLogout = () => {
        dispatch(setLogin(false))
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
                item.path ? (
                    <Link to={item.path} target="_blank" rel="noopener noreferrer" key={item.id}>
                        <Button size="small">{item.item}</Button>
                    </Link>
                ) : (
                    <Button onClick={contactClick} size="small" key={item.id}>
                        {item.item}
                    </Button>
                )
            ))}
        </ButtonGroup>
    );

    return (
       <>
         <AppBar position="fixed">
            <Toolbar sx={{ justifyContent: 'space-around', display: { xs: 'none', md: 'flex' } }}>
                <Box>{renderButtonGroup(about)}</Box>
                {login ? <Typography>hola {userName}</Typography> : null}
            </Toolbar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* :::START MOVIL FIRST NAVBAR:: */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenuOpen(setAnchorElNav)}
                            color="inherit"
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
                            <ButtonGroup orientation="vertical" variant="contained" aria-label="Vertical button group">
                                {filteredPages.map((page) => (
                                    <Link
                                        to={page.path}
                                        key={page.id}>
                                        <Button
                                            onClick={handleMenuClose(setAnchorElNav)}
                                        >
                                            {page.item}
                                        </Button>
                                    </Link>
                                ))}
                            </ButtonGroup>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* :::END MOVIL FIRST NAVBAR:: */}

                    <Box mt={2} sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                        <BottomNavigation
                            showLabels
                            value={valuePage}
                            onChange={(event, newValue) => {
                                setValuePage(newValue);
                            }}>
                            {filteredPages.map((page) => (
                                <BottomNavigationAction
                                    sx={{
                                        color: theme.palette.bottomNavigation.selected,
                                        '&.Mui-selected': {
                                            color: theme.palette.bottomNavigation.unselected,
                                        },
                                        '.MuiBottomNavigationAction-label': {
                                            fontSize: '0.9rem',
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
                    </Box>

                    {/* :::START MOVIL FIRST LOGIN:: */}

                    <Box sx={{ display: { xs: 'flex' } }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleMenuOpen(setAnchorElUser)} sx={{ p: 0 }}>
                                <Typography sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    {login ? 'Opciones' : 'Acceder'}
                                </Typography>
                                <LoginIcon />
                            </IconButton>
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
            {openInfo && (
                <Popper id={id} open={openInfo} anchorEl={anchorElContact} color="primary">
                    <Box>
                        <Chip icon={<MailOutlineIcon />} label="memoriaoralsena@gmail.com" />
                        <Chip icon={<PhoneAndroidIcon />} label="+57 (2) 8205108 – 8205903 - Ext. 22408 - 22029" />
                        <Chip icon={<LocationOnIcon />} label="Calle 4 #2-80 - Popayán (Cauca)" />
                    </Box>
                </Popper>
            )}
        </AppBar>
        <Box sx={{ height: '150px' }} />
       </>
    )
}

export default Header