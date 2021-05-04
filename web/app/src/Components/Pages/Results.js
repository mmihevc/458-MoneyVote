import React from 'react';
import Header from "../Margins/Header";
import {Box, Typography, Grid, Button} from "@material-ui/core";
import HeaderBar from "../Margins/HeaderBar";
import Arlo from "../Static/Images/arlo.jpg";
import Maizee from "../Static/Images/maizee.jpg";
import Razmataz from "../Static/Images/razzy.jpg";
import Tim from "../Static/Images/tim.jpg";
import BettingCard from "../Utils/BettingCard";

function Result(props) {
    console.log("winning dog", props)

    function searchCandidateImage(name) {
        if (name !== null) {
            if (name.toLowerCase() === 'maizee') {
                return Maizee;
            }
            else if (name.toLowerCase() === 'razmataz') {
                return Razmataz;
            }
            else if (name.toLowerCase() === 'tim') {
                return Tim;
            }
            else {
                return Arlo;
            }
        }
        return Maizee;
    }
    return (
        <>
            <Header {...props}/>
            <Box minHeight={225} display={"flex"} flexDirection={"column"} bgcolor={"primary.main"}>
                <HeaderBar/>
            </Box>
            <Box border={1} m={5}>
                <Box pt={2} pl={2}>
                    <Typography variant='h4'> Cutest Pet </Typography>
                </Box>
                <Grid container spacing={9} justify='center'>
                    <Grid item xs={3}>
                        <Box pb={3} pt={3} pl={5} ml={5}>
                            <Typography variant='h5'>The winner is . . .</Typography>
                            <BettingCard {...props} image={searchCandidateImage(props.winningCandidateName)} name='arlo' setCandidateSelected={props.setCandidateSelected}/>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box pl={5} pt={3}>
                            { props.winner ?
                                <>
                                    <Typography variant='h2'> Congratulations you won!</Typography>
                                    <Typography variant='h4' align='center'>You may now withdraw your bet</Typography>
                                    <Box pt={5}>
                                        <Grid container justify='center'>
                                            <Button variant="contained" style={{backgroundColor: '#488DB7'}} onClick={() => handleWithdrawal}>Withdraw</Button>
                                        </Grid>
                                    </Box>
                                </>
                                :
                                <Box pt={5}>
                                    <Typography variant='h2'>We are sorry but you did not win</Typography>
                                    <Typography variant='h4' align='center'>Please have a good day!</Typography>
                                </Box>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

function handleWithdrawal() {

}

export default Result;