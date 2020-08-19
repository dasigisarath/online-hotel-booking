import React, { Component } from 'react';
import axios from 'axios';

/**  * @author:Roshan
 *  * @description: Hoc function for get method */


export function apiHoc(WrapperComponent, input) {
  return class ApiHOC extends Component {
    constructor() {
      super();
      this.state = {
        data: [

        ]
      }
    }

    /**  * @author:Roshan
 *  * @description: function to get method api call */
    componentDidMount() {
      console.log(input.url);
      axios.get(input.url, {}).then((response) => {
        console.log(response.data);
        this.setState({ data: response.data });
      }).catch((error) => {
        console.log(error);
      })
    }
    render() {
      return (
        <WrapperComponent data={this.state.data} />

      )
    }
  }
}

/**  * @author:Roshan
 *  * @description:hoc function for post method */


export const axiosHocPost = (input) => {
  console.log("axioshocpost", input.url, input.method, input.data);
  axios({ url: input.url, method: input.method, data: input.data }).then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
  })
}
