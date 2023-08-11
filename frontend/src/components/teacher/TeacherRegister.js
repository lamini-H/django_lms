import { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api/teacher/';

function TeacherRegister(){
    const [teacherData, setteacherData]= useState({
        'full_name':'',
        'email':'',
        'password':'',
        'qualification':'',
        'mobile_no':'',
        'address':'',
        'skills':'',
        'status':''
    });

    //Change Element Value
    const handleChange = (event) =>{
        setteacherData({
            ...teacherData,
            [event.target.name]: event.target.value
        });
    }
//end

//Submit Form
const submitForm=(event)=>{
    event.preventDefault();
    const teacherFormData = new FormData(event.preventDefault());
    teacherFormData.append("full_name", teacherData.full_name)
    teacherFormData.append("email", teacherData.email) 
    teacherFormData.append("password", teacherData.password)
    teacherFormData.append("qualification", teacherData.qualification)
    teacherFormData.append("mobile_no", teacherData.mobile_no)
    teacherFormData.append("address", teacherData.address)
    teacherFormData.append("skills", teacherData.skills)
    try {
        axios.post(baseUrl,teacherFormData).then((response)=>{
          setteacherData({
            'full_name':'',
            'email':'',
            'password':'',
            'qualification':'',
            'mobile_no':'',
            'address':'',
            'skills':'',
            'status':'success'
          });
        });
    } catch (error) {
        console.log(error);
        setteacherData({'status': 'error'})
    }  
};


const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
if(teacherLoginStatus == 'true'){
    window.location.href='/teacher-dashboard';
}

//End
    useEffect(()=>{
        document.title= 'Teacher Register';
    });
    return(
        <div className='container mt-4'>
        <div className='row'>
            <div className='col-6 offset-3'>
                {teacherData.status =='success' && <p className='text-success'>Thanks for your registration</p>}
                {teacherData.status =='error'  && <p className='text-danger'>Something is wrong! Try Again</p>}
            <div className='card'>
                <h3 className='card-header'>Teacher Register</h3>
                <div className='card-body'>
                    <form method='post'>
                        <div className='mb-3'>
                            <label className='form-lable'>Full Name</label>
                            <input value={teacherData.full_name} onChange = {handleChange} name='full_name' type='text' className='form-control' />
                        </div>
                        <div className='mb-3'>
                            <label className='form-lable'>Email</label>
                            <input value={teacherData.email} onChange = {handleChange}  name='email' type='email' className='form-control' />
                        </div>
                       
                        <div className='mb-3'>
                            <label className='form-lable'>Password</label>
                            <input value={teacherData.password} onChange = {handleChange} name='password' type='password' className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label className='form-lable'>Qualification</label>
                            <input value={teacherData.qualification} onChange = {handleChange} name='qualification' type='text' className='form-control' />
                        </div>

                            
                        <div className='mb-3'>
                            <label className='form-lable'>Mobile Number</label>
                            <input value={teacherData.mobile_no} onChange = {handleChange}  name='mobile_no' type='text' className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label className='form-lable'>Address</label>
                            <input value={teacherData.address} onChange = {handleChange} name='address' type='text' className='form-control' />
                        </div>

                        <div className='mb-3'>
                            <label className='form-lable'>Skills</label>
                            <textarea  value={teacherData.skills} onChange = {handleChange} className='form-control' name='skills'></textarea>
                            <div id="em" className='form-text' >PHP, Java, Python, JavaScript etc</div>
                        </div>
                       
                        <button  onClick={submitForm} type='submit' className='btn btn-primary'>Register</button>
                    </form>

                </div>
            </div>
            </div>
        </div>
    </div>
    );
}
export default TeacherRegister;