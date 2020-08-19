import React, { useEffect, useState } from 'react';
import '../viewStyle/viewstyle.css';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


/**  * @author:sarath
 *  * @description:To render order data */



const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const WishList = () => {
    
    const classes = useStyles();
    const [date,setDate]=useState([]);
    const [list, setlist, setState, state] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:9000/wishlist?email=${sessionStorage.getItem("email")}`).then((response) => {
            setlist(response.data);
        })
    }, [])

    const handleBuy = (item) => {
console.log(item);

     let id=item.id;
        let hotelName = item.hotelName;
        let city = item.city;
    let status =item.status;
    let rating =item.rating;
    let type=item.type;
    let price=item.price;
    // let date=item.date;
        let email = sessionStorage.getItem('email');
        console.log(date);

        axios.post('http://localhost:9000/booking', {
         hotelName,
         city,
         status,
         rating,
         type,
         price,
         email,
         date,
         
    
        }
        );
        axios.delete(`http://localhost:9000/wishlist/${id}`)
          .then(function (response) {
            console.log(response);
            window.alert('Booking confirmed');
            window.location.reload();
          })
          .catch(function (error) {
            console.log('Cannot Order now try again');
            console.log(error);
          });
      }
    
      const handleRemove = (removeItem) => {
        let id = removeItem.id;
        console.log(id);
        axios.delete(`http://localhost:9000/wishlist/${id}`, {
          data: { id: 'id' }
        })
          .then(function (response) {
            console.log(response);
            window.alert('deleted from wishlist');
            window.location.reload();    
          })
          .catch(function (error) {
            console.log('Cannot delete now try again');
            console.log(error);
          });
      }

    return (<React.Fragment>


<ul>
        <li>
        <Link className='active' to="/OnlineIndex">HOME</Link>
        </li>
        <li>
          <Link className='a' to="/WishList">MY WISHLIST </Link>
        </li>
        <li>
          <Link className='a' to="/Booking">MY BOOKINGS</Link>
        </li>
        <li style={{ float: 'right', border: '1px solid #bbb' }}>
          <Link className='a' to="/Logout">Logout</Link>
        </li>
      </ul><br/><br/>
        <TableContainer component={Paper} style={{backgroundColor:'darkgray',boxShadow:'none'}}>
            <Table className={classes.table} aria-label="customized table" style={{width:'100px'}}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">ADDRESS</StyledTableCell>
                        <StyledTableCell align="right">STATUS</StyledTableCell>
                        <StyledTableCell align="right">Rating</StyledTableCell>
                        <StyledTableCell align="right">TYPE</StyledTableCell>
                        <StyledTableCell align="right">PRICE(₹)</StyledTableCell>
                        <StyledTableCell align="right">DATE</StyledTableCell>
                        <StyledTableCell align="right">CONFIRM</StyledTableCell>
                        <StyledTableCell align="right">REMOVE</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((item, i) => (
                        <StyledTableRow key={i} >
                            <StyledTableCell component="th" scope="row">
                                {item.hotelName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{item.city}</StyledTableCell>
                            <StyledTableCell align="right">{item.status}</StyledTableCell>
                            <StyledTableCell align="right">{item.rating}</StyledTableCell>
                            <StyledTableCell align="right">{item.type}</StyledTableCell>
                            <StyledTableCell align="right">{item.price}</StyledTableCell>
                            {/* <StyledTableCell align="right">{<input name='date' type='date'/>}</StyledTableCell> */}
                            <StyledTableCell align="right">{<input name='date' type='date' onChange={(event)=>{setDate(event.target.value)}} required/>}</StyledTableCell>

                            <StyledTableCell align="right">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<SaveIcon />} onClick={()=>handleBuy(item)}>
                                    Confirm
                                  </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}  onClick={()=>handleRemove(item)}>
                                    Delete
                                  </Button>
                            </StyledTableCell>

                        </StyledTableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>



    </React.Fragment>)
}

export default WishList;