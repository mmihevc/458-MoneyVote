import {Box, Grid, Typography} from "@material-ui/core";
import CountdownTimer from "../Utils/CountdownTimer";
import React, {useEffect, useState} from "react";

async function whatsTheEndTime (MV) {
    return await MV.endTime();
}

function HeaderBar(props) {

    let [endTime, setEndTime] = useState();
    useEffect(() => {
        if (props.MVInfo != null){
            Promise.resolve(whatsTheEndTime(props.MVInfo.MV))
                .then(function (result){
                    setEndTime(parseInt(result) - Math.floor(Date.now() / 1000));
                })
        }
    })

    console.log(endTime);

    return (
        <>
            {props.step === 0 ?
                <>
                    <Grid container direction="column" justify="center">
                        <Box p={4}>
                            <Typography variant='h2' align='center' >
                                Put Your Money Where Your Vote Is
                            </Typography>
                        </Box>
                        <Box p={4}>
                            <Typography variant='h5' align='center'>
                                Please select which candidate you would like to vote for and place your bet.
                            </Typography>
                        </Box>
                    </Grid>
                    <Box pr={5} pl={5} pt={2}>
                        <CountdownTimer {...props} count={endTime} border showTitle size={12} responsive hideDay direction='right'/>
                    </Box>
                </> :
                <Grid container direction="column" justify="center">
                    <Box p={4}>
                        <Typography variant='h2' align='center' >
                            Put Your Money Where Your Vote Is
                        </Typography>
                    </Box>
                    <Box p={4}>
                        <Typography variant='h5' align='center'>
                            The vote has come to an end, you can no longer place your bets.
                            <br/>
                            Thank you for your participation!
                        </Typography>
                    </Box>
                </Grid>
            }
        </>
    )
}

export default HeaderBar;