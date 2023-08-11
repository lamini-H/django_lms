import { useEffect,useState } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';
function Login(){
    const [studentLoginData, setstudentLoginData]= useState({
        email: '',
        password: ''
    });

    const [errorMsg, seterrorMsg] = useState('');
   //Change Element Value
   const handleChange = (event) =>{
    setstudentLoginData({
        ...studentLoginData,
        [event.target.name]: event.target.value
    });
}
//end
const submitForm=(event)=>{
    event.preventDefault();
    const StudentFormData= new FormData();
    StudentFormData.append('email', studentLoginData.email)
    StudentFormData.append('password', studentLoginData.password)
    try {
        axios.post(baseUrl+'/student-login',StudentFormData)
        .then((res)=>{
            if(res.data.bool==true){
                localStorage.setItem('studentLoginStatus',true);
                localStorage.setItem('studentId',res.data.student_id);
                window.location.href='/student-dashboard';
            }
            else
                {
                    seterrorMsg('Invalid Email or Password!');
                }
        });
    } catch (error) {
        console.log(error);
    }  
}
const studentLoginStatus = localStorage.getItem('studentLoginStatus')
if(studentLoginStatus === 'true'){
    window.location.href='/student-dashboard';
}
    useEffect(()=>{
        document.title = 'Student Login'
    });
    
    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                <div className='card'>
                {errorMsg &&  <p className='text-danger'>{errorMsg}</p>}
                    <h3 className='card-header'>User Login</h3>
                    <div className='card-body'>
                            <div className='mb-3'>
                                <label className='form-lable'>Email</label>
                                <input type='text' name='email' value={studentLoginData.email} onChange={handleChange}  className='form-control' />
                        </div>
                            <div className='mb-3'>
                                <label className='form-lable'>Password</label>
                                <input type='password' name='password' value={studentLoginData.password} onChange={handleChange} className='form-control' />
                            </div>
                            {/* <div className='mb-3 form-check'>
                                <input type='checkbox' className='form-check-input'  />
                                <label className='form-check-label'>Remember Me</label>
                            </div> */}
                            <button type='submit' onClick={submitForm} className='btn btn-primary'>Login</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
export default Login;