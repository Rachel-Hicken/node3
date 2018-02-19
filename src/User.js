import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      hobbies:"hiking",
      birthdayYear:1979,
      birthdayMonth:4,
      brithdayDay:28,
      gender:"male",
      name:{last:"Gross",first:"Sanchez"},
      hairColor:"blond",
      eyeColor:"blue",
      picture:"https://robohash.org/63017545.jpg?size=100x100&set=set4",
      id:105}
  }

  render() {
    return (
      <div className="User" style = {{minWidth:'200px'}}>
        <div>
          <h4>{this.props.user.name.first} {this.props.user.name.last}</h4>
          <img src = {this.props.user.picture}/>
          <div> Birthday <br/> {this.props.user.birthdayMonth} / {this.props.user.brithdayDay} / {this.props.user.birthdayYear} </div>
          <div> Id: {this.props.user.id } </div>
          <div> Gender: {this.props.user.gender } </div>
          <div> Eye: {this.props.user.eyeColor} </div>
          <div> Hair: {this.props.user.hairColor} </div>
          <div> Hobbies: {this.props.user.hobbies} </div>
        </div>
      </div>
    );
  }
}

export default User;
