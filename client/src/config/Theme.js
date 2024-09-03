import { createTheme } from "@mui/material";
import { red, blue, green } from "@mui/material/colors";


export const getTheme = createTheme({
    palette:{
          primary: {
            main: '#FFFFFF'
          },
          secondary: {
            main: '#DDC90F'
          },
          success:{
            main: "#008F39"
          },
          error: {
            main: red.A400
          },
          bottomNavigation: {
            selected: '#FFFFFF', // Color para BottomNavigationAction seleccionado
            unselected: '#DDC90F' // Color para BottomNavigationAction no seleccionado
          },
          textField: {
            main : '#757575'
          }
    }
})