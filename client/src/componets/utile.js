
import {createTheme } from '@mui/material'

const theme = createTheme({
    components:{
        MuiDrawer:{
            styleOverrides:{
                paper:{
                    backgroundColor:"black",
                    borderRadius:'0px 70px 0px 0px',
                    borderRight:`1px solid blue`,
                    width:140,
                }
            }
        }, 
    },
    typography:{
      fontFamily:[
        'Noto Serif Khojki'
      ]
    }
})
export default theme
