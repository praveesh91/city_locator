import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col, FormGroup, Input} from 'reactstrap';

import MapContainer from '../Map/Map'


import './Container.scss'

class Container extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data: [],
             states: [],
             selectedValue: 'Select',
             cities: []
        }
    }


    removeDuplicates(arr) {
        const map = new Map();
        arr.forEach(ele => map.set(ele.State, ele)) 
        return [...map.values()];
    }

    optionChanged = event => {
        // console.log(value);
        this.setState({ selectedValue: event.target.value });
        const {data} = this.state
        let bigCities = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].State === event.target.value) {
                bigCities.push(data[i]);
            }
        }
        this.setState({cities: bigCities})
      }
  

    componentDidMount(){
        axios.get("https://indian-cities-api-nocbegfhqg.now.sh/cities")
        .then(res =>{
            const data = res.data;
            this.setState({data: data})
            this.setState({ states: this.removeDuplicates(data) });
        })
            
    }
    
    render() {
        const data = (this.state.cities).slice(0, 40)

        let city = this.state.cities.map((event, index) => <li key={index}>{event.City}</li>)
        
        let optionItems = this.state.states.map((name, index) =>
                <option           
                    value={name.State}
                    key={index}
                >
                    {name.State}
                </option>
            );

        return (
            <div>
                <Row>
                    <div className="instruction_box">
                        <p>Please select the city to view the location</p>
                    </div>
                </Row>
                <Row>
                    <FormGroup>
                        <Input 
                            value="Select"
                            type="select" 
                            name="select" 
                            id="exampleSelect" 
                            onChange={this.optionChanged}
                            >
                            {optionItems}
                        </Input>
                    </FormGroup>
                </Row>
                <Row>
                    <Col xs="6">
                        <div className="city_container">
                            <p>List of cities </p>
                            <ul>{city}</ul> 
                        </div>
                        </Col>  
                    <Col xs="6">
                        <div className="map_container">
                            <MapContainer cities={data} />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Container
