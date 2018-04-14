import React, { Component } from 'react'; 
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class CreatableDemo extends Component {
        
        constructor(props) {
            super(props);
            this.state = {
                multi: true,
                multiValue: [],
                value: this.props.amenities,
        }}

	handleOnChange (value) {
            this.setState({ multiValue: value });
            this.props.multiValueChange(value)
	}
	render () {
		return (
			<div className="section">
                <Select.Creatable class='form-control'
                placeholder='Enter Skills'
                valueArray={this.props.skills}    
                multi={this.state.multi}
					onChange={this.handleOnChange.bind(this)}
					value={this.state.multiValue}
				/>
		<div className="hint">{this.props.hint}</div>
			</div>
		);
    }}

export default CreatableDemo;