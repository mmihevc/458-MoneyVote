import React, {useEffect, useState} from 'react'
import {Box, Grid, Typography} from "@material-ui/core";
import Header from "../Margins/Header";
import BettingCard from "../Utils/BettingCard";
import Arlo from "../Static/Images/arlo.jpg";
import Maizee from "../Static/Images/maizee.jpg";
import Razmataz from "../Static/Images/razzy.jpg";
import Tim from "../Static/Images/tim.jpg";
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import Button from "@material-ui/core/Button";
import {Row} from "@mui-treasury/components/flex";
import {useStyles} from "../Static/Constants";
import HeaderBar from "../Margins/HeaderBar";
import Results from './Results'
import {ethers} from "ethers";

async function totalElectionValue (MV) {
    return await MV.getContractBalance();
}
async function whatsTheBetAmount (MV) {
    return await MV.voteValue();
}
async function didVoterWin (MV) {
    return await MV.didVoterWin();
}
async function whoWon (MV) {
    return await MV.getWinnerName();
}

function Home(props) {
    const [step, setStep] = useState(1);
    const [winningCandidateName, setWinningCandidateName] = useState(null)
    const [candidateSelected, setCandidateSelected] = useState(false);
    const [winner, setWinner] = useState(false);
    if (step === 0) {
        return <Betting {...props} step={step} candidateSelected={candidateSelected} setCandidateSelected={setCandidateSelected}/>
    }
    else {
        if(props.MVInfo !== null) {
            // Promise.resolve(didVoterWin(props.MVInfo.MV))
            //     .then(function (result) {
            //         setWinner(result);
            //     })
            Promise.resolve(whoWon(props.MVInfo.MV))
                .then(function (result) {
                    setWinningCandidateName(ethers.utils.parseBytes32String(result))
                    console.log("the winning dog",winningCandidateName)
                })
        }
            return <Results {...props} step={step} winner={winner} winningCandidateName={winningCandidateName} setCandidateSelected={setCandidateSelected}/>
    }
}

function Betting(props) {

    const [name, setName] = useState();
    let [totalEV, settotalEV] = useState(0) ;
    let [betAmount,setBetAmount] = useState(0);

    useEffect(() => {
        if (props.MVInfo != null){
            Promise.resolve(totalElectionValue(props.MVInfo.MV))
                .then(function (result){
                    settotalEV(result.toString());
                })
            Promise.resolve(whatsTheBetAmount(props.MVInfo.MV))
                .then(function (otherResult){
                    setBetAmount(otherResult);
                })
        }
    })

    return (
        <>
            <Header {...props}/>
            <Box minHeight={400} display={"flex"} flexDirection={"column"} bgcolor={"primary.main"}>
                <HeaderBar {...props} MVInfo={props.MVInfo} step={props.step}/>
            </Box>
            <Box border={1} m={2}>
                <Box pt={2} pl={2}>
                    <Typography variant='h4'> Cutest Pet </Typography>
                </Box>
                <Grid container
                      spacing={3}
                      justify="center"
                >
                    <Grid item xs={3}>
                        <Box p={3} >
                            <BettingCard {...props} image={Arlo} setName={setName} name='arlo' setCandidateSelected={props.setCandidateSelected}/>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box p={3}>
                            <BettingCard {...props} image={Maizee} setName={setName} name='maizee' setCandidateSelected={props.setCandidateSelected}/>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box p={3}>
                            <BettingCard {...props} image={Tim} setName={setName} name='tim' setCandidateSelected={props.setCandidateSelected}/>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box p={3}>
                            <BettingCard {...props} image={Razmataz} setName={setName} name='razmataz' setCandidateSelected={props.setCandidateSelected}/>
                        </Box>
                    </Grid>
                </Grid>
                {props.candidateSelected ?
                    <Grid container
                          justify="center"
                    >
                        <Typography>Bet Amount: {(props.MVInfo == null) ? "Null" : betAmount} </Typography>
                    </Grid>
                    : null
                }
                <Row>
                    <Box pl={2}>
                        <Typography>Total Election Value: {(props.MVInfo == null) ? "Null" : totalEV} </Typography>
                    </Box>
                    <SubmitButton MVInfo={props.MVInfo} betAmount={betAmount} name={name}/>
                </Row>
            </Box>
        </>
    )
}


function SubmitButton(props) {
    const classes = useStyles();
    return (
        <>
            <Grid container justify="flex-end">
                <Button
                    variant="contained"
                    style={{backgroundColor: '#488DB7'}}
                    className={classes.button}
                    endIcon={<HowToVoteIcon/>}
                    onClick={() => sendCandidate(props.MVInfo, props.betAmount, props.name)}
                >
                    Submit
                </Button>
            </Grid>
        </>
    )
}

async function sendCandidate(MVInfo, betAmount, name) {

    let index;
    switch (name) {
        case "arlo":
            index = 0;
            break;
        case "maizee":
            index = 1;
            break;
        case "tim":
            index = 2;
            break;
        case "razmataz":
            index = 3;
            break;
    }

    if(MVInfo != null){
        try{
            await MVInfo.MV.voteForCandidate(index,{value: betAmount});
        }catch (e){
            alert("Error in voting Unable to vote. Check console for details.")
            console.log(e)
        }
    }

}

export default Home;