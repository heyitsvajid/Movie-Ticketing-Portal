import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { post } from 'axios';
import swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import '../assets/css/admin.css'
import Creatable from './CreatableDemo'
import { envURL, reactURL } from '../config/environment';
import Pagination from './Pagination';


class MultiplexForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            update: false,
            file: '',
            name: '',
            address: '',
            city: '',
            state_name: 'AL',
            zipcode: '',
            contact_number: '',
            multiplex_owner_id: '#',
            amenities: '',
            seat_count: '',
            row_count: '',
            screens: [],
            multiplexList: [],
            searchedMultiplexList: [],
            multiplexAdminList:[],
            update_id: 0,
            currentPage: 1, 
            perPageRows: 5,
            multiplex_logo:''
        }
    }
    _handleChangeFile(e) {
        e.preventDefault();
        document.getElementById("file_error").innerHTML = "";
        let reader = new FileReader();
        let file = e.target.files[0];
        // eslint-disable-next-line
        if (!file) {
            return;
        }
        if ( file.type === 'image/png' ||  file.type === 'image/jpg' || file.type === "image/jpeg" ) {
            reader.onloadend = () => {
                this.setState({
                    file: file,
                });
            };
            reader.readAsDataURL(file)
        }
        else {
            swal({
                type: 'error',
                title: 'File Upload',
                text: 'Only PNG/JPG/JPEG images allowed',
            })
            document.getElementById("file-upload").value = "";
        }
    }

    componentWillMount() {
        this.loadMultiplex();
        this.handleFindAllAdmins();
    }


    validateNameFormat(name){
        if(name == ""){
          document.getElementById("name_error").innerHTML = "Please enter Multiplex Name";
          return false;
        }
        return true;
    }

    validateAddressFormat(address){
        if(address == ""){
          document.getElementById("address_error").innerHTML = "Please enter Multiplex Address";
          return false;
        }
        return true;
    }

    validateFile(file){
        if(file == ""){
          document.getElementById("file_error").innerHTML = "Please add File";
          return false;
        }
        return true;
    }
    
    validateCityFormat(city){
        if(city == ""){
          document.getElementById("city_error").innerHTML = "Please enter City Name";
          return false;
        }
        return true;
    }

    validateZipcodeFormat(zipcode){
        const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        if(zipcode == ""){
          document.getElementById("zipcode_error").innerHTML = "Please enter Valid Zipcode";
          return false;
        }
        else if(!regex.test(String(zipcode).toLowerCase())){
            document.getElementById("zipcode_error").innerHTML = "Please enter Valid Zipcode";
            return false;
        }
        return true;
    }

    validateContactNumberFormat(contact_number){
        const regex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
        if(contact_number == ""){
            document.getElementById("contact_number_error").innerHTML = "Please enter Valid Contact Number";
            return false;
        }
        else if(!regex.test(String(contact_number).toLowerCase())){
            document.getElementById("contact_number_error").innerHTML = "Please enter Valid Contact Number";
            return false;
          }
          return true;
    }

    validateMultiplexAdminFormat(multiplexOwner){
        if(multiplexOwner == ""){
            document.getElementById("multiplex_owner_id_error").innerHTML = "Please Select Multiplex Owner";
            return false;
        }
          return true;
    }

    validateAmenitiesFormat(amenities){
        if(amenities.length == 0){
          document.getElementById("amenities_error").innerHTML = "Please enter amenities";
          return false;
        }
        return true;
    }

    handleSubmit(e) {
        e ? e.preventDefault() : ''
        if(localStorage.getItem('roleId')!='3'){
            swal({
                type: 'error',
                title: 'Add Multiplex',
                text: 'Access Denied.',
            })
        }
        else{
            // if (!this.state.name || !this.state.address || !this.state.state_name || !this.state.city || !this.state.zipcode
            //     || !this.state.multiplex_owner_id || !this.state.amenities || !this.state.screens.length > 0 || !this.state.file) {
            //     swal({
            //         type: 'error',
            //         title: 'Add Multiplex',
            //         text: 'Provide all fields.',
            //     })
            //     return;
            // }
            // if (!this.state.zipcode.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/i)) {
            //     swal({
            //         type: 'error',
            //         title: 'Add Multiplex',
            //         text: 'Invalid Zipcode',
            //     })
            //     return;
            // }
            // if (!(this.state.contact_number.length == 10)) {
            //     swal({
            //         type: 'error',
            //         title: 'Add Multiplex',
            //         text: 'Invalid Contact Number',
            //     })
            //     return;
            // }
            let nameErrorPresent = !this.validateNameFormat(this.state.name) ? true : false; 
            let addressErrorPresent = !this.validateAddressFormat(this.state.address) ? true : false;
            let cityErrorPresent = !this.validateCityFormat(this.state.city) ? true : false;
            let zipcodeErrorPresent = !this.validateZipcodeFormat(this.state.zipcode) ? true : false;
            let checkFilePresent = !this.validateFile(this.state.file) ? true : false;
            let contactNumberErrorPresent = !this.validateContactNumberFormat(this.state.contact_number) ? true : false;
            let multiplexAdminErrorPresent = !this.validateMultiplexAdminFormat(this.state.multiplex_owner_id) ? true : false;
            let amenitiesErrorPresent = !this.validateAmenitiesFormat(this.state.amenities) ? true : false;

            if(nameErrorPresent || addressErrorPresent || cityErrorPresent || zipcodeErrorPresent || checkFilePresent || contactNumberErrorPresent
                || multiplexAdminErrorPresent || amenitiesErrorPresent){ return; }

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
                multiplex_owner_id: '#',
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
    }

    loadMultiplex() {
        let findAllMultiplexAPI = envURL + 'findAllMultiplex';
        axios.get(findAllMultiplexAPI)
            .then(res => {
                if (res.data.successMsg != '') {
                    console.log('Fetching all multiplex');
                    console.log(res.data.data);
                    this.setState({
                        multiplexList: res.data.data ? res.data.data : [],
                        searchedMultiplexList: res.data.data ? res.data.data : [],
                        currentPage: 1
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
        document.getElementById("amenities_error").innerHTML = "";
    }

    handleFindAllAdmins = () => {
        let url = envURL+'findallmultiplexadmin';
        axios.get( url, {withCredentials : true} )
            .then( (response) => {
                console.log(response.data);
                this.setState({
                    multiplexAdminList:response.data.data?response.data.data:[]
                })
            } )
    };


    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
        document.getElementById(e.target.name + "_error").innerHTML = "";
        console.log(this.state)
    }

    handleNextPaginationButton(e) {
        const total_pages = this.state.searchedMultiplexList.length > 0 ? this.state.searchedMultiplexList.length/this.state.perPageRows : 0;
        if(this.state.searchedMultiplexList != [] && this.state.currentPage != Math.ceil(total_pages)){
          this.setState({currentPage: Number(this.state.currentPage + 1)})      
        }
      }
    
      handlePrevPaginationButton(e) {
        if(this.state.searchedMultiplexList != [] && this.state.currentPage != 1){
          this.setState({currentPage: Number(this.state.currentPage - 1)})
        }
      }

      handlePageChange(e) {
        this.setState({currentPage: Number(e.target.dataset.id)})
      }

    returnMultiplexList() {
        let pagination_list, currentTodos=null;
        if(this.state.searchedMultiplexList != []){
            const indexOfLastTodo = this.state.currentPage * this.state.perPageRows;
            const indexOfFirstTodo = indexOfLastTodo - this.state.perPageRows;
            currentTodos = this.state.searchedMultiplexList.slice(indexOfFirstTodo, indexOfLastTodo);
            const total_pages = this.state.searchedMultiplexList.length > 0 ? this.state.searchedMultiplexList.length/this.state.perPageRows : 0;
            const page_numbers = [];
            for (let i = 1; i <= Math.ceil(this.state.searchedMultiplexList.length / this.state.perPageRows); i++) {
                page_numbers.push(i);
            }  
            pagination_list = page_numbers.map(number => {
                return (
                <li class="page-item" key= {number} data-id={number} onClick={this.handlePageChange.bind(this)}  ><a data-id={number} class="page-link" href="#">{number}</a></li>
                );
            });
            for(let i = 0; i< currentTodos.length; i++){
                currentTodos[i].current_index = indexOfFirstTodo + i + 1;
            }
        }
        let rowNodes = currentTodos.map((item, index) => {
            return (
                <tr>
                    <th scope="row">{item.current_index}</th>
                    <td>{item.name}</td>
                    <td>{item.screens.length}</td>
                    <td>{item.state}</td>
                    <td>{item.city}</td>
                    <td><input type="button" class="dashboard-form-btn link-style nav-link btn-info action-link"
                        value="Update" required="" id={item._id} onClick={this.handleMultiplexUpdate.bind(this)} />
                    </td>
                </tr>
            )
        });
        return (
            <div>
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
                <Pagination handlePrevPaginationButton = {this.handlePrevPaginationButton.bind(this)} handleNextPaginationButton = {this.handleNextPaginationButton.bind(this)}
                handlePageChange = {this.handlePageChange.bind(this)} pagination_list = {pagination_list}/>
            </div>
            
        );

    }

    handleCancelClick(e){
        document.getElementById("name_error").innerHTML = "";
        document.getElementById("address_error").innerHTML = "";
        document.getElementById("city_error").innerHTML = "";
        document.getElementById("zipcode_error").innerHTML = "";
        document.getElementById("contact_number_error").innerHTML = "";
        document.getElementById("state_name_error").innerHTML = "";
        document.getElementById("multiplex_owner_id_error").innerHTML = "";
        document.getElementById("amenities_error").innerHTML = "";
        document.getElementById("file_error").innerHTML = "";

        this.setState({
            update: false,
            file: '',
            name: '',
            address: '',
            city: '',
            state_name: '',
            zipcode: '',
            contact_number: '',
            multiplex_owner_id: "#",
            amenities: '',
            seat_count: '',
            row_count: '',
            screens: [],
            update_id: 0
        })
    }

    updateMultiplex(e) {
        e ? e.preventDefault() : ''        

        let nameErrorPresent = !this.validateNameFormat(this.state.name) ? true : false; 
        let addressErrorPresent = !this.validateAddressFormat(this.state.address) ? true : false;
        let cityErrorPresent = !this.validateCityFormat(this.state.city) ? true : false;
        let zipcodeErrorPresent = !this.validateZipcodeFormat(this.state.zipcode) ? true : false;
        let contactNumberErrorPresent = !this.validateContactNumberFormat(this.state.contact_number) ? true : false;
        let multiplexAdminErrorPresent = !this.validateMultiplexAdminFormat(this.state.multiplex_owner_id) ? true : false;
        

        if(nameErrorPresent || addressErrorPresent || cityErrorPresent || zipcodeErrorPresent || contactNumberErrorPresent
            || multiplexAdminErrorPresent){ return; }
        if (!this.state.name || !this.state.address || !this.state.state_name || !this.state.city || !this.state.zipcode
            || !this.state.multiplex_owner_id || !this.state.amenities || !this.state.screens.length > 0) {
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
            multiplex_logo:this.state.multiplex_logo
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
            multiplex_owner_id: '#',
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
        document.getElementById("name_error").innerHTML = "";
        document.getElementById("address_error").innerHTML = "";
        document.getElementById("city_error").innerHTML = "";
        document.getElementById("zipcode_error").innerHTML = "";
        document.getElementById("contact_number_error").innerHTML = "";
        document.getElementById("state_name_error").innerHTML = "";
        document.getElementById("multiplex_owner_id_error").innerHTML = "";
        document.getElementById("amenities_error").innerHTML = "";
        document.getElementById("file_error").innerHTML = "";

        this.state.multiplexList.forEach(element => {
            if (element._id == e.target.id) {
                this.setState({
                    multiplex_logo:element.multiplex_logo,
                    update_id: e.target.id,
                    update: true,
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

    handleSearchBar(e){
        var searched_array = [];
        if(e.target.value != ""){
          if(this.state.multiplexList.length > 0){
              for(let i = 0; i < this.state.multiplexList.length; i++){
                var strRegExPattern = new RegExp(e.target.value, 'i');
                let list_element = this.state.multiplexList[i]
                if(list_element.name.match(strRegExPattern) || list_element.city.match(strRegExPattern)
                || list_element.state.match(strRegExPattern)){
                    searched_array.push(list_element);
                }
              }
              this.setState({searchedMultiplexList: searched_array, currentPage: 1})
          }
        }
        else{
          this.loadMultiplex();
        }
    }


    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-lg-2">
                        <h4 class="c-grey-900 mB-20">All Multiplex</h4>
                    </div>
                    <div class="col-lg-10">
                    <div id = "search_bar">
                        <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search Multiplex By Name, City, State" onChange = {this.handleSearchBar.bind(this)}/>
                        </div>
                    </div>
                    </div>
                </div>
                <hr/>

                {this.returnMultiplexList()}
                <hr class='mt-5 mb-5' />
                <h3>{this.state.update ? 'Update' : 'Add New'} Multiplex</h3>
                <hr />
                
                <div class="row gap-20 masonry pos-r" style={{position: 'relative', height: '1086px'}}>
                    <div class="masonry-item col-md-6" style={{position: 'absolute', top: '0px'}}>
                        <div class="bgc-white p-20 bd">
                            <div class="mT-30">
                                <form id="dashboard-form" className='form-multiplexadmin'>

                                    <div className="form-group">
                                        <label class="dashboard-label">Name</label>
                                        <input class="form-control" type="text" name="name"
                                            placeholder="Enter Multiplex Name" required="" value={this.state.name} onChange={this.handleUserInput} />
                                        <div id = "name_error" class= "error"></div>
                                    </div>
                                    <div className="form-group">
                                        <label class="dashboard-label">Address</label>
                                        <input class="form-control" type="text" name="address"
                                            placeholder="Address Line" required="" value={this.state.address} onChange={this.handleUserInput} />
                                        <div id = "address_error" class= "error"></div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">City</label>
                                            <input class="form-control" type="text" name="city"
                                                placeholder="City" required="" value={this.state.city} onChange={this.handleUserInput} />
                                            <div id = "city_error" class= "error"></div>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">State</label>
                                            <select class="form-control" value={this.state.state_name} onChange={this.handleUserInput} id="state" name='state_name' required >
                                                <option value="AL">Alabama</option>
                                                <option value="AK">Alaska</option>
                                                <option value="AZ">Arizona</option>
                                                <option value="AR">Arkansas</option>
                                                <option value="CA">California</option>
                                                <option value="CO">Colorado</option>
                                                <option value="CT">Connecticut</option>
                                                <option value="DE">Delaware</option>
                                                <option value="DC">District Of Columbia</option>
                                                <option value="FL">Florida</option>
                                                <option value="GA">Georgia</option>
                                                <option value="HI">Hawaii</option>
                                                <option value="ID">Idaho</option>
                                                <option value="IL">Illinois</option>
                                                <option value="IN">Indiana</option>
                                                <option value="IA">Iowa</option>
                                                <option value="KS">Kansas</option>
                                                <option value="KY">Kentucky</option>
                                                <option value="LA">Louisiana</option>
                                                <option value="ME">Maine</option>
                                                <option value="MD">Maryland</option>
                                                <option value="MA">Massachusetts</option>
                                                <option value="MI">Michigan</option>
                                                <option value="MN">Minnesota</option>
                                                <option value="MS">Mississippi</option>
                                                <option value="MO">Missouri</option>
                                                <option value="MT">Montana</option>
                                                <option value="NE">Nebraska</option>
                                                <option value="NV">Nevada</option>
                                                <option value="NH">New Hampshire</option>
                                                <option value="NJ">New Jersey</option>
                                                <option value="NM">New Mexico</option>
                                                <option value="NY">New York</option>
                                                <option value="NC">North Carolina</option>
                                                <option value="ND">North Dakota</option>
                                                <option value="OH">Ohio</option>
                                                <option value="OK">Oklahoma</option>
                                                <option value="OR">Oregon</option>
                                                <option value="PA">Pennsylvania</option>
                                                <option value="RI">Rhode Island</option>
                                                <option value="SC">South Carolina</option>
                                                <option value="SD">South Dakota</option>
                                                <option value="TN">Tennessee</option>
                                                <option value="TX">Texas</option>
                                                <option value="UT">Utah</option>
                                                <option value="VT">Vermont</option>
                                                <option value="VA">Virginia</option>
                                                <option value="WA">Washington</option>
                                                <option value="WV">West Virginia</option>
                                                <option value="WI">Wisconsin</option>
                                                <option value="WY">Wyoming</option>
                                            </select>
                                        </div>
                                        <div id = "state_name_error" class= "error"></div>
                                    </div>
                                    <div class="form-row">
                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">ZipCode</label>
                                            <input class="form-control" type="text" name="zipcode"
                                                placeholder="Zip Code" required="" value={this.state.zipcode} onChange={this.handleUserInput} />
                                            <div id = "zipcode_error" class= "error"></div>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Contact Number</label>
                                            <input class="form-control" type="number" name="contact_number"
                                                placeholder="Contact" required="" value={this.state.contact_number} onChange={this.handleUserInput} />
                                            <div id = "contact_number_error" class= "error"></div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Multiplex Owner</label>
                                        <br/>
                                        <select class="form-control" value={this.state.multiplex_owner_id}
                                            onChange={this.handleUserInput} name="multiplex_owner_id" id="multiplex_owner_id">
                                                <option value="#" disabled>Multiplex Owner</option>
                                            {
                                                this.state.multiplexAdminList.map(function (admin) {
                                                    return <option key={admin.id}
                                                        value={admin.id}>{admin.first_name} : {admin.email}</option>;
                                                })
                                            }
                                        </select>
                                        
                                    </div>
                                    <div id = "multiplex_owner_id_error" class= "error"></div><br/>
                                    <div className="form-group">
                                        <label class="dashboard-label">Amenities</label>
                                        <Creatable name= "amenities" amenities={this.state.amenities} multiValueChange={this.multiValueChange.bind(this)} />
                                        
                                    </div>
                                    <div id = "amenities_error" class= "error"></div><br/>
                                    <label class="dashboard-label">Add Multiplex Screens</label>
                                    <div class="form-row">
                                        
                                        <br/>
                                        <div className="form-group col-md-4">
                                        <input class="form-control" type="number" name="seat_count"
                                            placeholder="Seat Count" required="" value={this.state.seat_count} onChange={this.handleUserInput} />
                                        </div>
                                        <div id = "seat_count_error" class= "error"></div>

                                        <div className="form-group col-md-4">
                                            
                                        <input class="form-control" type="number" name="row_count"
                                        placeholder="Row Count" required="" value={this.state.row_count} onChange={this.handleUserInput} />
                                        </div>

                                        <div className="form-group col-md-2">
                                            <input type="button" class="btn btn-info"
                                        value="Add Screen" required="" onClick={this.handleAddScreen.bind(this)} />
                                        </div>
                                        
                                    <div id = "row_count_error" class= "error"></div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Screen Rows</label>
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
                                                </tbody></table>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Multiplex Logo</label>
                                        <input id="file-upload" type="file" onChange={ this._handleChangeFile.bind(this) } />
                                        <div id = "file_error" class= "error"></div>
                                    </div>

                                    <div class="form-row">
                                        <div className="form-group col-md-3">
                                        {this.state.update ? <input type="submit" class="dashboard-form-btn btn btn-primary"
                                        value="Update Multiplex" required="" onClick={this.updateMultiplex.bind(this)} /> : <input type="submit" class="dashboard-form-btn btn btn-primary"
                                            value="Add Multiplex" required="" onClick={this.handleSubmit.bind(this)} />}
                                        </div>

                                        <div className="form-group col-md-3">
                                            <input onClick = {this.handleCancelClick.bind(this)} type="reset" class="dashboard-form-btn cancel-update btn btn-default" value="Cancel" />
                                            
                                        </div>
                                    </div>
                                   
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
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