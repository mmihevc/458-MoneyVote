import React from "react";
import {Card, CardActionArea, CardMedia, makeStyles} from "@material-ui/core";
import {useStyles} from "../Static/Constants";

function BettingCard(props) {
    const classes = useStyles();

    return (
        <Card>
            <CardActionArea onClick={() => set(props)}>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title={props.name}
                />
            </CardActionArea>
        </Card>
    )
}

function set(props) {
    props.setCandidateSelected(true);
    props.setName(props.name);
}

export default BettingCard;