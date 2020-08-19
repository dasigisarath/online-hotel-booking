import React, { Component } from 'react';
import '../viewStyle/viewstyle.css';
import { HashLink as Link } from 'react-router-hash-link';
import '../viewStyle/viewstyle.css';
import { apiHoc, axiosHocPost } from '../ApiHoc/ApiHoc';
import Displayhotels from '../viewhotels/Displayhotels';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**  * @author:Sarath
 *  * @description:To render dashboard page */

class OnlineIndex extends Component {
  constructor() {
    super();
    this.state = {
         hotels: {
       hotelName:'',
       city:'',
       status:'',
       rating:'',
       type:'',
       price:'',
       email: ''
      }

    }

    this.handleBuy = this.handleBuy.bind(this);

  }


  handleChange = (event) => {
    let hotels = this.state.hotels;
    hotels[event.target.name] = event.target.value;
    this.setState({ hotels });

  }
 
  handleBuy = (hotelsCart) => {

    const cart = {
        hotelName: hotelsCart.hotelName,
        city: hotelsCart.city,
        status: hotelsCart.status,
        rating: hotelsCart.rating,
        type:hotelsCart.type,
        price:hotelsCart.price,
        email:sessionStorage.getItem('email')       }

    axiosHocPost({ url: ' http://localhost:9000/wishlist', method: 'post', data: cart });
    window.location.reload();
  }
  render() {
    const {open, } = this.state;
    return (<React.Fragment>
  
      <ul>
        <li>
          <a href="#" className='active'>HOTELS</a>
        </li>
        <li>
          <Link className='a' to="/WishList">WISHLIST </Link>
        </li>
        <li>
          <Link className='a' to="/Booking">BOOKINGS</Link>
        </li>
      
        <li style={{ float: 'right', border: '1px solid #bbb' }}>
          <Link className='a' to="/Logout">Logout</Link>

        </li>

      </ul>
      <h2 style={{color:'red'}}>HOTEL DETAILS</h2>

      <table>
        <thead>
          <tr><td>Name</td>
            <td>ADDRESS</td>
            <td>STATUS</td>
            <td>Rating</td>
            <td>TYPE</td>
            <td>PRICE(INR)</td>
            <td>WISHLIST</td>
            </tr>
        </thead>
        <tbody>
          {
            this.props.data.map((product, j) => {

              return <Displayhotels key={j} productLists={product} handleBuy={this.handleBuy} handleChange={this.handleChange} />
            })
          }
        </tbody>
      </table>
      <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
                   <MuiAlert onClose={this.handleClose} severity="success">
                      Added to WishList
                   </MuiAlert>
               </Snackbar>
             
    </React.Fragment>)
  }
}


/** @author:Sarath
  @description:api hoc  for get product data */

const viewProductData = apiHoc(OnlineIndex, { url: ' http://localhost:9000/hotels' });
export default viewProductData; 