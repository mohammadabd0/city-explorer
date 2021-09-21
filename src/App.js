import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationResult: [],
      searchQuery: '',
      showLocInfo: false,
      showerror:false
    }
  }

  getLocFun = async (event) => {
    event.preventDefault();
    await this.setState({
      searchQuery: event.target.city.value
    })
// localhost:3005/weather?namecity=

    try{    
    let reqUrl = `${process.env.REACT_APP_SERVER_LINK}/weather?namecity=${this.state.searchQuery}`;

    let locResult = await axios.get(reqUrl);
  
    console.log('asArray', locResult.data);



    this.setState({
      locationResult: locResult.data,
      showLocInfo: true,
      showerror:false
    })
  } catch{
    console.log("error: Something went wrong.")
    this.setState({
      showerror:true,
      showLocInfo: false
    })
  }
  
}


render() {
  return (
    <div>
           <h3>City Explorer app</h3>
        <form onSubmit={this.getLocFun} >
          <input type="text" name='city' />
          <input type="submit" value='get city info' />
        </form>

        {this.state.showLocInfo &&
          <>
            <p>City name: {this.state.searchQuery}</p>
            <p>date : {this.state.locationResult[0].date}</p>
            <p>description : {this.state.locationResult[0].description} </p>
            <p>date : {this.state.locationResult[1].date}</p>
            <p>description : {this.state.locationResult[1].description} </p>
            <p>date : {this.state.locationResult[2].date}</p>
            <p>description : {this.state.locationResult[2].description} </p>
            
            <p></p>


          </>
        }





        {/* lab06 */}
        {/* <h3>City Explorer app</h3>
        <form onSubmit={this.getLocFun} >
          <input type="text" name='city' />
          <input type="submit" value='get city info' />
        </form> */}

        {/* {this.state.showLocInfo &&
          <>
            <p>City name: {this.state.searchQuery}</p>
            <p>latitude: {this.state.locationResult.lat}</p>
            <p>longitude: {this.state.locationResult.lon} </p>

            <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city" />

          </>
        } */}
{/* lab06 */}
  {/* <form onSubmit={this.getLocFun} >
          <input type="text" name='city' />
          <input type="submit" value='get city info' />
        </form>
{this.state.showLocInfo &&

    <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city" />
  <Card.Body>
    <Card.Title>City Explorer app</Card.Title>
  
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroup>City name: {this.state.searchQuery}</ListGroup>
    <ListGroup>latitude: {this.state.locationResult.lat}</ListGroup>
    <ListGroup>longitude: {this.state.locationResult.lon}</ListGroup>

  </ListGroup>

  <Card.Body>
  </Card.Body>
</Card>
} */}
      </div>
    )
  }
}

export default App;
