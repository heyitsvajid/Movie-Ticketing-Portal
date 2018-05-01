import React, { Component } from 'react';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';
import {BarChart, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, Line, AreaChart, LineChart} from 'recharts';
import '../assets/css/admingraphs.css';


class AdminGraphs extends Component {

    constructor() {
        super();
        this.state = {
            multiplexAdminGraphData:[]

        }
        
        this.loadMultiplexAdminGraphData=this.loadMultiplexAdminGraphData.bind(this);
    }

    componentWillMount() {
      this.loadMultiplexAdminGraphData()
    }

    loadMultiplexAdminGraphData(){

        let findAllMultiplexAPI = envURL + 'findAllMultiplex';
        axios.get(findAllMultiplexAPI)
            .then(res => {
                if (res.data.successMsg != '') {
                    console.log('Fetching all multiplex');
                    console.log(res.data.data);
                    var allMultiplex =res.data.data ? res.data.data : [];
                    var userId = localStorage.getItem('userid')
                    var adminMultiplex = {}
                    allMultiplex.forEach(element => {
                        if(element.multiplex_owner_id ==userId ){
                            adminMultiplex = element;
                            this.setState({
                                multiplex:element
                            })
                        }
                    });
                    if('_id' in adminMultiplex){
                        let url = envURL + 'getMultiplexAdminGraph';
                        var payload  = {
                            multiplex_id:adminMultiplex._id
                        }
                        axios.post( url, payload, { withCredentials : true } )
                        .then( (res) => {
                            console.log("multiplexAdminGraphData", res.data );
                            var result = res.data.data?res.data.data:[]
                            let graphData = []
                            result.forEach(element => {
                                graphData.push({
                                    name:element.movie_name,
                                    amount:element.total_revenue
                                })
                            });
                            this.setState({
                                multiplexAdminGraphData:graphData
                            })

                        })
                  
                    }
            


                } else {
                    console.error('Error Fetching all multiplex');
                }
            })
            .catch(err => {
                console.error(err);
            });


    }
    
    render() {
        return (
            <div>
                <div class="row">
                    <div className="form-group col-md-12">
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h3 class="c-grey-900 mB-20">Movie Revenues Till Date</h3>
                            </div>
                        </div>
                        
                        <br/>                            
                        <BarChart width={1250} height={400} data={this.state.multiplexAdminGraphData}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="amount" fill="#ffcc00" />
                        </BarChart>
                    </div>
                </div>
                <hr/>    
            </div>
        );
    }
}

export default AdminGraphs;