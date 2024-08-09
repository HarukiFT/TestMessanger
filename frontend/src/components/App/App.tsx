import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Outlet } from "react-router-dom"
import Topper from "../Topper/Topper"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const topperHeight = 75

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
                <Topper height={topperHeight}/>

                <Box  width={1} sx={{
                    position: 'absolute',
                    top: `${topperHeight}px`,
                    height: `calc(100vh - ${topperHeight}px)`
                }}>
                    <Outlet/>
                </Box>
            </Box>

            <ToastContainer/>
        </ThemeProvider>
    )
}