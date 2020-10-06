// import React, {Component} from 'react';
// import axios from 'axios';

// export default class FileUpload extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             filePath: ""
//         };
//         this.onChange = this.onChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//     }

//     onChange(event) {
//         this.setState({[event.target.name]: event.target.value})
//     }

//     onSubmit(event) {
//         event.preventDefault();
//         const _id = this.state._id;
//         const firstName = this.state.firstName.trim();
//         const lastName = this.state.lastName.trim();
//         const designation = this.state.designation.trim();
//         const faculty = this.state.faculty.trim();
//         const email = this.state.email;
//         const contactNumber = this.state.contactNumber.trim();
//         const password = this.state.password;
//         const cPass = this.state.cPassword;

//         if (firstName == '' || lastName == '' || designation == '' || faculty == '' || contactNumber == '') {
//             alert('One or more fields are empty!');
//         } else {
//             //if (/^[0-9]{9}[v|V]+$/.test(NIC)) {
//                 if(contactNumber.length === 10 && /^[0-9]{10}$/.test(contactNumber)) {
//                     if (password !== cPass) {
//                         alert('Entered password does not match confirmed password!');
//                     } else {
//                         const instructor = {
//                             _id: _id,
//                             firstName: firstName,
//                             lastName: lastName,
//                             designation: designation,
//                             faculty: faculty,
//                             password: password,
//                             email: email,
//                             contactNumber: contactNumber
//                         };

//                         axios.put('http://localhost:3000/administrator/instructor/update', instructor).then(data => {
//                             alert(data.data);
//                         }).catch(err => {
//                             alert(err.response.data);
//                         })
//                     }
//                 } else {
//                     alert('Invalid Contact Number');
//                 }
//             // } else {
//             //     alert('Invalid NIC!');
//             // }
//         }
//     }

//     render() {

//         return <div className="container mt-2">
//             <div className="container mt-3">
//                 <h1 className="h3 mb-3 font-weight-normal">Browse File</h1>
//                 <br/>
//                 <form className="form-inline">
//                     <div className="input-group mb-3">
//                         <div className="input-group-prepend">
//                             <span className="input-group-text">File Path: </span>
//                         </div>
//                         <input
//                             className="form-control mr-sm-2"
//                             name="filePath"
//                             value={this.state.filePath}
//                             onChange={this.onChange}
//                         />
//                         <button onClick={this.onSearch} className="btn btn-primary mx-auto">Browse</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     }
// }