import { createTheme } from "@mui/material";
import { red, blue, green } from "@mui/material/colors";


export const getTheme = createTheme({
    palette:{
          primary: {
            main: '#D6AA26' //amarillo
          },
          secondary: {
            main: '#408156' //verde menta
          },
          lightGreen:{
            main: "#93A31C" //verde claro
          },
          error: {
            main: red.A400
          },
          lightWhite:{
            main: '#FFFFC4',
          },
          textField:{
            main: '#FFFFFF'
          },
          grayDark:{
            main: '#30374F'
          }
    }
})