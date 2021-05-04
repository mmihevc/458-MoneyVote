import React, {Component} from "react";
import Button from "@material-ui/core/Button"

export default class Footer extends Component {

    render() {
        return(
            <div className="full-width footer">
                <div className="vertical-center">
                    <Button className="create-button" variant="contained" > Create New </Button>
                </div>
            </div>
        )
    }

}