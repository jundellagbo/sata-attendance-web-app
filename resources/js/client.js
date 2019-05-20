import React from "react"
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { BrowserRouter } from "react-router-dom"
import Main from "./Main"

const MaterialUI = createMuiTheme({
    palette: {
        primary: { main: "#2196f3" },
        secondary: { main: "#f73378" }
    },
    typography: {
        useNextVariants: true,
        "fontFamily": "\"Roboto\"",
        "fontSize": 14,
        "fontWeightLight": 400,
        "fontWeightRegular": 400,
        "fontWeightMedium": 400
      },
});

if (document.getElementById('app')) {
    ReactDOM.render(
    <MuiThemeProvider theme={MaterialUI}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </MuiThemeProvider>
    , document.getElementById('app'));
}