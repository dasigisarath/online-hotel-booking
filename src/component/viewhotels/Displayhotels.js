import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles, makeStyles } from '@material-ui/core/styles';

/**  * @author:Sarath
 *  * @description:To render product data */

const Displayhotels = (props) => {
    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });
    const classes = useStyles();
    let { productLists } = props;
    return (
        <tr>
            <td>{productLists.hotelName}</td>
            <td>{productLists.city}</td>
            <td>{productLists.status}</td>
            <td>{productLists.rating}</td>
            <td>{productLists.type}</td>
            <td>{productLists.price}</td>

            <td>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />} onClick={() => props.handleBuy(productLists)}>
                    ADD
                                  </Button>
            </td>
        </tr >

    )
}
export default Displayhotels;