import React, { Component } from "react";
import axios from "axios";

export default class Create extends Component {
    //constructor to initialize the state of the component
    constructor(props) {
        //super() is used to call the constructor of the parent class
        super(props);

        //binding the methods to the class
        this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
        this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //setting the initial state of the component
        this.state = {
            business_name: '',
            owner_name: '',
            nic: ''
        };
    }

    //changing the state of the business name
    onChangeBusinessName(e) {
        this.setState({
            business_name: e.target.value
        });
    }

    //changing the state of the owner name
    onChangeOwnerName(e) {
        this.setState({
            owner_name: e.target.value
        });
    }

    //changing the state of the NIC number
    onChangeNIC(e) {
        this.setState({
            nic: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            business_name: this.state.business_name,
            owner_name: this.state.owner_name,
            nic: this.state.nic
        };
        axios.post('http://localhost:4000/business/add', obj)
            .then(res => console.log(res.data));
        
        this.setState({
            business_name: '',
            owner_name: '',
            nic: ''
        });
    }

    //onSubmit method to handle the form submission
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Add New Business</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add a Business Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.business_name} 
                            onChange={this.onChangeBusinessName} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Add the owner's name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.owner_name} 
                            onChange={this.onChangeOwnerName} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Add the NIC number</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.nic} 
                            onChange={this.onChangeNIC} 
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register Business" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
