import { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api/student/';

function Register(){

    const [studentData, setstudentData]= useState({
        'full_name':'',
        'email':'',
        'password':'',
        'username':'',
        'interest':'',
        'status':''
    });

      //Change Element Value
      const handleChange = (event) =>{
        setstudentData({
            ...studentData,
            [event.target.name]: event.target.value
        });
    }
//end

//Submit Form
const submitForm=(event)=>{
    event.preventDefault();
    const studentFormData = new FormData(event.preventDefault());
    studentFormData.append("full_name", studentData.full_name)
    studentFormData.append("email", studentData.email) 
    studentFormData.append("password", studentData.password)
    studentFormData.append("username", studentData.username)
    studentFormData.append("interested_categories", studentData.interest)

    try {
        axios.post(baseUrl,studentFormData).then((response)=>{
        setstudentData({
            'full_name':'',
            'email':'',
            'password':'',
            'username':'',
            'interest':'',
            'status':'success'
          });
        });
    } catch (error) {
        console.log(error);
        setstudentData({'status': 'error'})
    }  
};

useEffect(()=>{
    document.title= 'Student Register';
});

return(
        <div className='container mt-4'>
        <div className='row'>
        <div className='col-6 offset-3'>
        {studentData.status =='success' && <p className='text-success'>Thanks for your registration</p>}
        {studentData.status =='error'  && <p className='text-danger'>Something is wrong! Try Again</p>}
        <div className='card'>
        <h3 className='card-header'>Register</h3>
        <div className='card-body'>
        <div className='mb-3'>
        <label className='form-lable'>Full Name</label>
         <input type='text' value={studentData.full_name} name='full_name' onChange = {handleChange} className='form-control' />
       </div>
        <div className='mb-3'>
        <label className='form-lable'>Email</label>
         <input type='email' value={studentData.email}  name='email'onChange = {handleChange} className='form-control' />
        </div>
        <div className='mb-3'>
        <label className='form-lable'>Username</label>
        <input type='text' value={studentData.username}  name='username' onChange = {handleChange} className='form-control' />
        </div>
         <div className='mb-3'>
        <label className='form-lable'>Password</label>
        <input type='password' value={studentData.password}  name='password' onChange = {handleChange} className='form-control' />
        </div>
         <div className='mb-3'>
             <label className='form-lable'>Interest</label>
                <textarea className='form-control' name='interest' onChange = {handleChange} value={studentData.interest} ></textarea>
                <div id="em" className='form-text' >PHP, Java, Python, JavaScript etc</div>
            </div>           
         <button type='submit' onClick={submitForm} className='btn btn-primary'>Register</button>
        </div>
            </div>
            </div>
        </div>
    </div>
    );
}
export default Register;