
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';
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
    Modal,
    TextField
} from '@mui/material';
import { Fragment, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import Login from '../../auth/Login';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Header = () => {

    const theme = useTheme();
    const pages = [
        { item: 'Inicio', id: 1, path: '/' },
        { item: 'Nosotros', id: 2, path: 'nosotros' },
        { item: 'Testimonios', id: 3, path: 'testimonios' },
        { item: 'Datos Abiertos', id: 4, path: 'datos-abiertos' },
        { item: 'Usuarios', id: 5, path: 'usuarios' },
    ];
    const buttons = [
        { item: 'Ingresar', id: 1 },
        { item: 'Registrar', id: 2, path: 'usuarios/registrar' }
    ];

    const [open, setOpen] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [value, setValue] = useState(0)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
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
                            onClick={handleOpenNavMenu}
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
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <ButtonGroup orientation="vertical" variant="contained" aria-label="Vertical button group">
                                {pages.map((page) => (
                                    <Link
                                        to={page.path}
                                        key={page.id}>
                                        <Button
                                            onClick={handleCloseNavMenu}
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

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}>
                            {pages.map((page) => (
                                <BottomNavigationAction
                                    sx={{
                                        color: theme.palette.bottomNavigation.selected,
                                        '&.Mui-selected': {
                                            color: theme.palette.bottomNavigation.unselected,
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

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                            onClose={handleCloseUserMenu}
                        >
                            <ButtonGroup orientation="vertical" variant="contained" aria-label="Vertical button group">
                                {buttons.map((button) => (
                                    <Fragment key={button.id}>
                                        {button.id === 1 ? (
                                            <>
                                                <Button
                                                    onClick={(e) => {
                                                        setOpen(true)
                                                        handleCloseUserMenu()
                                                    }}
                                                    size="small"
                                                >
                                                    {button.item}
                                                </Button>
                                                <Login open={open} setOpen={setOpen} />
                                            </>
                                        ) : (
                                            <Link to={button.path}>
                                                <Button
                                                    onClick={handleCloseUserMenu}
                                                    size="small"
                                                >
                                                    {button.item}
                                                </Button>
                                            </Link>

                                        )}
                                    </Fragment>
                                ))}
                            </ButtonGroup>
                        </Menu>
                    </Box>

                    {/* :::END MOVIL FIRST LOGIN:: */}

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {buttons.map((button) => (
                            <ButtonGroup key={button.id} disableElevation
                                variant="contained"
                                aria-label="Disabled button group">
                                {button.id === 1 ? (
                                    <>
                                        <Button
                                            onClick={(e) => setOpen(true)}
                                            sx={{ m: 2 }}
                                            size="small"
                                        >
                                            {button.item}
                                        </Button>
                                        <Login open={open} setOpen={setOpen} />
                                    </>
                                ) : (
                                    <Link to={button.path}>
                                        <Button
                                            sx={{ m: 2 }}
                                            size="small"
                                        >
                                            {button.item}
                                        </Button>
                                    </Link>
                                )}
                            </ButtonGroup>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header