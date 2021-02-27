import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Grid, withStyles, Typography, Button} from "@material-ui/core";
import styles from "./styles";
import Space from "../Space";
import Blank from "../Blank";
import classNames from "classnames";
import {cardValues} from "../../configs/common/cardValues";

class PriceCard extends Component {
    render() {
        const {classes} = this.props;
        const array = [];
        cardValues.map((item, index) => {
            const list = cardValues[index].content.filter(a => a.membership_id === item.id);
            array.push(list.length);
            return 1;
        });
        const maxLenghtItem = Math.max(...array);


        const listOject = cardValues.map((item, index) => {
            const list = cardValues[index].content.filter(a => a.membership_id === item.id);
           
            const listItem = list.map((item, index) => {
                return <Typography key={index}>{item}</Typography>;
            });

            const lengthItem = list.length;
            if (maxLenghtItem - lengthItem > 0) {
                for (let i = 0; i < maxLenghtItem - lengthItem; i++) {
                    listItem.push(<Blank key={lengthItem + i}/>);
                }
            }
            let link = "";
            switch (item.type) {
                case "student":
                    link = "/signup_perku";
                    break;
                case "persional":
                    link = "/signup_perkprime";
                    break;
                default:
                    link = "/signup_perkfamily_subscriber";
            }
            return (
                <Grid key={index}>
                    <Space/>
                    <Grid
                        item
                        container
                        justify="center"
                        className={classes.widthItem}
                        style={{
                        padding: "0 15px"
                    }}>
                        <Grid container justify="center">
                            <Grid item>
                                <img src={item.header} alt="Images"/>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.heightTitle}>
                            <Typography align="center">{item.title}</Typography>
                            <Typography align="center">{item.subtitle}</Typography>
                        </Grid>
                        <Grid container direction="column" className={classes.border}>
                            <Grid item className={classes.borderBot}>
                                <Typography className={classes.includeBold}>Include</Typography>
                            </Grid>
                            <Grid item className={classes.padding4}>
                                {listItem}
                            </Grid>
                        </Grid>
                        <Grid item className={classes.widthButton}>
                            <NavLink to={link} className={classes.link}>
                                <Button
                                    className={classNames(classes.button$, classes.button)}
                                    variant="outlined"
                                    fullWidth>
                                    <Typography>${item.button.name}
                                    </Typography>
                                </Button>
                            </NavLink>
                        </Grid>
                    </Grid>
                </Grid>
            );
        });

        return (
            <Grid container spacing={8} justify="flex-start" className={classes.margin0}>
                {listOject}
            </Grid>
        );
    }
}

export default withStyles(styles)(PriceCard);
