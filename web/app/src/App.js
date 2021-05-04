import React, {useState, useEffect} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {SnackbarProvider, useSnackbar} from 'notistack';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import initBlockchain from "./Components/Utils/initBlockchain";

import Home from '../src/Components/Pages/Home'


const Router = (props) => {
    return (
        <Switch>
            <Route exact path="/">
                <Home {...props}/>
            </Route>
        </Switch>
    )
}

const LoadApp = (props) =>
{
    const {enqueueSnackbar} = useSnackbar();
    const produceSnackBar = (message, variant = "error") => enqueueSnackbar(message, {variant: variant});

    return (
        <BrowserRouter>
            <Router {...props} produceSnackBar={produceSnackBar}/>
        </BrowserRouter>
    );
};


/* The asynchronous function that gets called in the promise */
async function ftest (pro) {
    let dddd = await pro.MV.voteValue();
    return dddd;
}


function App() {

    const theme = createMuiTheme({ palette: {
            primary: {main: '#488DB7' },
            secondary: {main: "#B77248"}}});


    let [MVInfo, setMVInfo] = useState(null)
    useEffect(()=> {
        Promise.resolve(initBlockchain())
            .then(function (result){
                console.log("result.userAddress",result.userAddress);


                /*To talk to the contract we must call an asynchronous function
                * the function returns a promise that gets resolved below
                * ftest returns otherResult which is then printed to the console
                * but could be passed to props or printed to the page*/
                // Promise.resolve(ftest(result))
                //     .then(function (otherResult){
                //         console.log("-------->",otherResult)
                //     })


                setMVInfo(result);
            })
            .catch(function (error){
                alert(`Failed to load provider, signer, or contract. Check console for details. If you have already signed into your wallet you will need to refresh the page for changes to appear.`)
                console.log(error)
            })
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <SnackbarProvider maxSnack={3} preventDuplicate>
                <LoadApp MVInfo={MVInfo}/>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;