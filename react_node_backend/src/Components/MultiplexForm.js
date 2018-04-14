import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { post } from 'axios';
import swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import '../assets/css/admin.css'
import Creatable from './CreatableDemo'
import { envURL, reactURL } from '../config/environment';


class MultiplexForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            update: false,
            file: '',
            name: '',
            address: '',
            city: '',
            state_name: '',
            zipcode: '',
            contact_number: '',
            multiplex_owner_id: '',
            amenities: '',
            seat_count: '',
            row_count: '',
            screens: [],
            multiplexList: [],
            update_id: 0
        }
    }
    _handleChangeFile(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        // eslint-disable-next-line
        if (!file) {
            return;
        }
        if (file.type == 'image/png') {
            reader.onloadend = () => {
                this.setState({
                    file: file,
                });
            }
            reader.readAsDataURL(file)
        }
        else {
            swal({
                type: 'error',
                title: 'File Upload',
                text: 'Only PNG images allowed',
            })
        }
    }

    componentWillMount() {
        this.loadMultiplex()
    }

    handleSubmit(e) {
        e ? e.preventDefault() : ''
        if (!this.state.name || !this.state.address || !this.state.state_name || !this.state.city || !this.state.zipcode
            || !this.state.multiplex_owner_id || !this.state.amenities || !this.state.screens.length > 0 || !this.state.file) {
            swal({
                type: 'error',
                title: 'Add Multiplex',
                text: 'Provide all fields.',
            })
            return;
        }
        if (!this.state.zipcode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/i)) {
            swal({
                type: 'error',
                title: 'Add Multiplex',
                text: 'Invalid Zipcode',
            })
            return;
        }
        if (!(this.state.contact_number.length == 10)) {
            swal({
                type: 'error',
                title: 'Add Multiplex',
                text: 'Invalid Contact Number',
            })
            return;
        }
        let createNewMultiplexAPI = envURL + 'createNewMultiplex';
        var multiplex = {
            name: this.state.name,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state_name,
            zipcode: this.state.zipcode,
            contact_number: this.state.contact_number,
            multiplex_owner_id: this.state.multiplex_owner_id,
            amenities: this.state.amenities,
            screen: JSON.stringify(this.state.screens),
        }

        const formData = new FormData();
        formData.append('file', this.state.file);
        for (var key in multiplex) {
            formData.append(key, multiplex[key]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        post(createNewMultiplexAPI, formData, config).then(function (res) {
            if (res.data.errorMsg != '') {
                swal({
                    type: 'error',
                    title: 'Add Multiplex',
                    text: res.data.errorMsg,
                })
            } else if (res.data.successMsg != '') {
                swal({
                    type: 'success',
                    title: 'Add Multiplex',
                    text: res.data.successMsg,
                })
            }
        });
        this.setState({
            update: false,
            file: '',
            name: '',
            address: '',
            city: '',
            state_name: '',
            zipcode: '',
            contact_number: '',
            multiplex_owner_id: '',
            amenities: '',
            seat_count: '',
            row_count: '',
            screens: [],
            multiplexList: [],
            update_id: 0
        });
        var that = this;
        setTimeout(function () {
        }, 2000);


    }

    loadMultiplex() {
        let findAllMultiplexAPI = envURL + 'findAllMultiplex';
        axios.get(findAllMultiplexAPI)
            .then(res => {
                if (res.data.successMsg != '') {
                    console.log('Fetching all multiplex');
                    console.log(res.data.data);
                    this.setState({
                        multiplexList: res.data.data ? res.data.data : []
                    })
                } else {
                    console.error('Error Fetching all multiplex');
                }
            })
            .catch(err => {
                console.error(err);
            });

    }

    multiValueChange(val) {
        var multiValues = []
        val.forEach(element => {
            multiValues.push(element.value)
        });
        this.setState({
            amenities: multiValues.join(',')
        })
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
        console.log(this.state)
    }
    returnMultiplexList() {
        let rowNodes = this.state.multiplexList.map((item, index) => {
            return (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.screens.length}</td>
                    <td>{item.state}</td>
                    <td>{item.city}</td>
                    <td><input type="button" class="btn-link"
                        value="Update" required="" id={item._id} onClick={this.handleMultiplexUpdate.bind(this)} />
                    </td>
                </tr>
            )
        });
        return (
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Screen Count</th>
                        <th scope="col">State</th>
                        <th scope="col">City</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rowNodes}
                </tbody>
            </table>
        );

    }

    updateMultiplex(e) {
        debugger;
        e ? e.preventDefault() : ''
        if (!this.state.name || !this.state.address || !this.state.state_name || !this.state.city || !this.state.zipcode
            || !this.state.multiplex_owner_id || !this.state.amenities || !this.state.screens.length > 0 || !this.state.file) {
            swal({
                type: 'error',
                title: 'Add Multiplex',
                text: 'Provide all fields.',
            })
            return;
        }
        if (!String(this.state.zipcode).match(/(^\d{5}$)|(^\d{5}-\d{4}$)/i)) {
            swal({
                type: 'error',
                title: 'Add Multiplex',
                text: 'Invalid Zipcode',
            })
            return;
        }
        if (!(String(this.state.contact_number).length == 10)) {
            swal({
                type: 'error',
                title: 'Add Multiplex',
                text: 'Invalid Contact Number',
            })
            return;
        }
        let updateMultiplexAPI = envURL + 'updateMultiplex';

        this.state.screens.forEach(element => {
            delete element._id
        });

        var multiplex = {
            _id: this.state.update_id,
            name: this.state.name,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state_name,
            zipcode: this.state.zipcode,
            contact_number: this.state.contact_number,
            multiplex_owner_id: this.state.multiplex_owner_id,
            amenities: this.state.amenities,
            screen: JSON.stringify(this.state.screens),
        }

        const formData = new FormData();
        formData.append('file', this.state.file);
        for (var key in multiplex) {
            formData.append(key, multiplex[key]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        post(updateMultiplexAPI, formData, config).then(function (res) {
            if (res.data.errorMsg != '') {
                swal({
                    type: 'error',
                    title: 'Update Multiplex',
                    text: res.data.errorMsg,
                })
            } else if (res.data.successMsg != '') {
                swal({
                    type: 'success',
                    title: 'update Multiplex',
                    text: res.data.successMsg,
                })
            }
        }.bind(this));
        this.setState({
            update: false,
            file: '',
            name: '',
            address: '',
            city: '',
            state_name: '',
            zipcode: '',
            contact_number: '',
            multiplex_owner_id: '',
            amenities: '',
            seat_count: '',
            row_count: '',
            screens: [],
            multiplexList: [],
            update_id: 0
        })
        var that = this;
        setTimeout(function () {
        }, 2000);
    }
    handleMultiplexUpdate(e) {
        e ? e.preventDefault() : ''
        this.state.multiplexList.forEach(element => {
            if (element._id == e.target.id) {
                this.setState({
                    update_id: e.target.id,
                    update: !this.state.update,
                    name: element.name,
                    address: element.address,
                    city: element.city,
                    state_name: element.state,
                    zipcode: element.zipcode,
                    contact_number: element.contact_number,
                    multiplex_owner_id: element.multiplex_owner_id,
                    amenities: element.amenities,
                    screens: element.screens,
                })
                return;
            }
        });

    }
    render() {
        return (
            <div>
                <h3>Multiplex List</h3>
                <hr />

                {this.returnMultiplexList()}
                <hr class='mt-5 mb-5' />
                <h3>{this.state.update ? 'Update' : 'Add New'} Multiplex</h3>
                <hr />
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="col-lg-3 control-label"><strong>Name</strong></label>
                        <div class="col-lg-5">
                            <input class="form-control" type="text" name="name"
                                placeholder="Name" required="" value={this.state.name} onChange={this.handleUserInput} />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label"><strong>Address</strong></label>
                        <div class="col-lg-5">
                            <input class="form-control" type="text" name="address"
                                placeholder="Address Line" required="" value={this.state.address} onChange={this.handleUserInput} />
                            <input class="form-control" type="text" name="city"
                                placeholder="City" required="" value={this.state.city} onChange={this.handleUserInput} />
                            <input class="form-control" type="text" name="state_name"
                                placeholder="State" required="" value={this.state.state_name} onChange={this.handleUserInput} />
                            <input class="form-control" type="text" name="zipcode"
                                placeholder="Zip Code" required="" value={this.state.zipcode} onChange={this.handleUserInput} />

                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label"><strong>Contact</strong></label>
                        <div class="col-md-5">
                            <input class="form-control" type="number" name="contact_number"
                                placeholder="Contact" required="" value={this.state.contact_number} onChange={this.handleUserInput} />

                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-3 control-label"><strong>Multiplex Owner</strong></label>
                        <div class="col-md-5">
                            <select class="form-control col-sm-5" value={this.state.multiplex_owner_id}
                                onChange={this.handleUserInput} name="multiplex_owner_id" id="multiplex_owner_id">
                                <option value="00">Owner</option>
                                <option value="01">Jan (01)</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label"><strong>Amenities</strong></label>
                        <div class="col-lg-5">
                            <Creatable amenities={this.state.amenities} multiValueChange={this.multiValueChange.bind(this)} />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label"><strong>Add Multiplex Screens</strong></label>
                        <div class="col-lg-8">
                            <div class="ml-5 row">
                                <div class="col-2"> <label class="col-lg-15 control-label"><strong>Seat Count</strong></label>
                                </div>
                                <div class="col-3"> <input class="form-control" type="number" name="seat_count"
                                    placeholder="Seat Count" required="" value={this.state.seat_count} onChange={this.handleUserInput} />
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="ml-5 row">
                                <div class="col-2"> <label class="col-lg-15 control-label"><strong>Row Count</strong></label>
                                </div>
                                <div class="col-3"> <input class="form-control" type="number" name="row_count"
                                    placeholder="Row Count" required="" value={this.state.row_count} onChange={this.handleUserInput} />
                                </div>
                                <input type="button" class="btn btn-info"
                                    value="Add Screen" required="" onClick={this.handleAddScreen.bind(this)} />

                            </div>
                            <div class="mt-2 col-lg-8">

                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Seats</th>
                                            <th scope="col">Row</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderScreenRows()}
                                    </tbody></table></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label"><strong>Multiplex Logo</strong></label>
                        <div class="col-lg-5">
                            <input type="file" class="form-control" onChange={this._handleChangeFile.bind(this)} />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label"></label>
                        <div class="col-md-8">
                            {this.state.update ? <input type="submit" class="btn btn-primary"
                                value="Update Multiplex" required="" onClick={this.updateMultiplex.bind(this)} /> : <input type="submit" class="btn btn-primary"
                                    value="Add Multiplex" required="" onClick={this.handleSubmit.bind(this)} />}

                            <span></span>
                            <input type="reset" class="btn btn-default" value="Cancel" />
                        </div>
                    </div>
                </form>
            </div>)
    }

    renderScreenRows() {
        let rowNodes = this.state.screens.map((screen, index) => {
            return (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{screen.seat_count}</td>
                    <td>{screen.row_count}</td>
                    <td><input type="button" class="btn btn-warn"
                        value="Remove" required="" id={index} onClick={this.handleRemoveScreen.bind(this)} />
                    </td>
                </tr>
            )
        });
        return rowNodes;
    }
    handleAddScreen() {
        let screens = this.state.screens;
        screens.push({
            screen_number: screens.length + 1,
            row_count: this.state.row_count,
            seat_count: this.state.seat_count
        })
        this.setState({
            screens: screens,
            row_count: '',
            seat_count: ''
        })
    }
    handleRemoveScreen(e) {
        let screens = this.state.screens;
        screens.splice(e.target.id, 1)
        this.setState({
            screens: screens
        })
    }

}

export default withRouter(MultiplexForm);