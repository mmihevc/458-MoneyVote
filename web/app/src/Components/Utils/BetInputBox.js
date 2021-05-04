import {Box, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import React from "react";
import {useStyles} from "../Static/Constants";

function BetInputBox(props) {
    const classes = useStyles();
    const handleChange = (prop) => (event) => {
        props.setValue({ ...props.value, [prop]: event.target.value });
    };

    return (
        <>
            <Grid container
                  justify="center"
            >
                <Box pt={2} pb={4} width="75%">
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Bet Amount</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            value={props.value.amount}
                            onChange={handleChange('amount')}
                            startAdornment={<InputAdornment position="start">Ξ</InputAdornment>}
                            labelWidth={83}
                        />
                    </FormControl>
                </Box>
            </Grid>
        </>
    )
}

export default BetInputBox;