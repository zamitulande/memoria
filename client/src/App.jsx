import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { ThemeProvider } from "@emotion/react"
import { getTheme } from "./config/Theme"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import InfoRegister from "./helpers/components/InfoRegister"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useCallback, useRef } from "react";
import { setLogin, setRole, setToken, setUserId, setUserName } from "./redux/features/userSlice";
import SplashScreen from "./helpers/components/LoadingPage"
import Inactivity from "./helpers/components/Inactivity"

function App() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.user.login);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(5); // Temporizador para el modal
  const inactivityTime = 15 * 60 * 1000; // 2 minutos
  const inactivityTimer = useRef(null); // Guardar referencia del temporizador principal
  const countdownTimer = useRef(null); // Guardar referencia del temporizador del conteo regresivo


  // Función para cerrar sesión y limpiar el almacenamiento local
  const handleLogout = useCallback(() => {
    dispatch(setLogin(false));
    dispatch(setToken(null));
    dispatch(setRole(null));
    dispatch(setUserId(null));
    dispatch(setUserName(null));
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setModalOpen(false); 
  }, [dispatch]);

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const token = localStorage.getItem("jwtToken");
    const role = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    if (token && role && userId && userName) {
      dispatch(setLogin(true));
      dispatch(setToken(token));
      dispatch(setRole(role));
      dispatch(setUserId(userId));
      dispatch(setUserName(userName));
    }
    setLoading(false);

    if (login) {
      // Función para reiniciar el temporizador de inactividad
      const resetInactivityTimer = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        if (countdownTimer.current) clearInterval(countdownTimer.current);
        
        setModalOpen(false); // Cerrar el modal si se reinicia el temporizador
        setCountdown(30); // Reiniciar el contador

        // Establecer un nuevo temporizador de inactividad
        inactivityTimer.current = setTimeout(() => {
          setModalOpen(true); // Mostrar el modal después de 2 minutos de inactividad
          startCountdown(); // Iniciar el conteo regresivo
        }, inactivityTime);
      };

      // Función para iniciar el contador
      const startCountdown = () => {
        countdownTimer.current = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownTimer.current);
              handleLogout(); // Cerrar sesión cuando llegue a 0
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      };

      // Agregar eventos para detectar actividad del usuario
      window.addEventListener("mousemove", resetInactivityTimer);
      window.addEventListener("keypress", resetInactivityTimer);
      window.addEventListener("scroll", resetInactivityTimer);
      window.addEventListener("click", resetInactivityTimer);

      // Iniciar el temporizador de inactividad
      resetInactivityTimer();

      // Limpiar eventos y temporizador al desmontar
      return () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        if (countdownTimer.current) clearInterval(countdownTimer.current);
        window.removeEventListener("mousemove", resetInactivityTimer);
        window.removeEventListener("keypress", resetInactivityTimer);
        window.removeEventListener("scroll", resetInactivityTimer);
        window.removeEventListener("click", resetInactivityTimer);
      };
    }
  }, [dispatch, handleLogout, login, inactivityTime]);

  if (loading) {
    return <SplashScreen />; // Muestra SplashScreen mientras verifica el token
  }
  return (
    <ThemeProvider theme={getTheme}>
      <BrowserRouter>
        <SplashScreen />
        <Header />
        <AppRoutes />
        <Footer />
        {!login && <InfoRegister />}
        <Inactivity
          open={modalOpen}
           onClose={() => {
              setModalOpen(false); // Cerrar el modal
              if (inactivityTimer.current) clearTimeout(inactivityTimer.current); // Limpiar el temporizador actual
              resetInactivityTimer(); // Reiniciar el temporizador al aceptar
            }}
          countdown={countdown}

        />
      </BrowserRouter>

    </ThemeProvider>
  )
}

export default App
