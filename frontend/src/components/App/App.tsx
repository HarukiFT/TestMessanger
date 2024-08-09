import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Outlet } from "react-router-dom"
import Topper from "../Topper/Topper"

export default () => {
    const theme = createTheme({
        palette: {
            mode: 'light'
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>

            <Box width={1} height={1}>
                <Topper height={75}/>
            </Box>
        </ThemeProvider>
    )
}