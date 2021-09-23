import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

import Weather from './component/Weather';
import Movie from './component/Movie';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationResult: [],
      searchQuery: '',
      showLocInfo: false,
      showerror:false,
      weatherResult:[],
      movieResult:[]

    }
  }

  getLocFun = async (event) => {
    event.preventDefault();
    await this.setState({
      searchQuery: event.target.city.value
    })

// http://localhost:3005?city=


 //////// locationResult
 try{    
  let Url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

  let locResult = await axios.get(Url);

  console.log('asArray', locResult.data);



  this.setState({
    locationResult: locResult.data[0],
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

////////// weatherdata
    try{    
    let reqUrl = `${process.env.REACT_APP_SERVER_LINK}/weather?city=${this.state.searchQuery}`;

    let weatherdata = await axios.get(reqUrl);
  



    this.setState({
      weatherResult: weatherdata.data,
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
 
  ////////// movedata
  try{    
    let MovieUrl = `${process.env.REACT_APP_SERVER_LINK}/movies?city=${this.state.searchQuery}`;

    let moviedata = await axios.get(MovieUrl);
  



    this.setState({
      movieResult: moviedata.data,
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
  <form onSubmit={this.getLocFun} >
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
            {console.log(this.state.locationResult)}
            <ListGroup.Item> City name: {this.state.searchQuery}</ListGroup.Item>
            <ListGroup.Item>latitude: {this.state.locationResult.lat}</ListGroup.Item>
            <ListGroup.Item> longitude: {this.state.locationResult.lon}</ListGroup.Item>
            <ListGroup.Item> days info</ListGroup.Item>
  
    {this.state.weatherResult.map(info => {
     return (
      <ListGroup.Item>
    <Weather  weatherResult={info} />
  </ListGroup.Item>
    )})} 
  
  {this.state.movieResult.map(info => {
     return (
      <ListGroup.Item>
    <Movie  movieResult={info} />
  </ListGroup.Item>
    )})} 

  </ListGroup>

  <Card.Body>
  </Card.Body>
</Card>
}
      </div>
    )
  }
}

export default App;
