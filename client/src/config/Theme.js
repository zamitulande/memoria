import { createTheme } from "@mui/material";
import { red, blue, green } from "@mui/material/colors";


export const getTheme = createTheme({
    palette:{
        primary: {
            main: '#FFFFFF'
          },
          secondary: {
            main: '#72bf31'
          },
          error: {
            main: red.A400
          },
          bottomNavigation: {
            selected: '#757575', // Color para BottomNavigationAction seleccionado
            unselected: '#212121' // Color para BottomNavigationAction no seleccionado
        },
    }
})