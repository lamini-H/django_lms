

import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';
function PopularTeachers() {
  const [teacher, setTeacher] = useState(null);
  useEffect(()=>{
    axios.get(baseUrl + '/teacher/').then((response)=>{
     setTeacher(response.data);

    });
  },[]);
  console.log(teacher);
  return (
    <div className="container mt-4">
    <div className="row mb-4">
    <div className="col-md-3">
    
    <div className="card">
      <a href="#"><img src="teacher.jpg" className="card-img-top" alt="image" /></a>
        <div className="card-body">
          <h5 className="card-title"> <Link to="/teacher-detail/1">Teacher Name</Link></h5>
        </div>
        <div className='card-footer'>
         <div className='title'>
          <span>Rating:  4.5/5 </span>
         
          
          </div>
        </div>
      </div>
    </div>
    
    <div className="col-md-3">
      <div className="card">
      <a href="#"><img src="teacher.jpg" className="card-img-top" alt="image" /></a>
        <div className="card-body">
          <h5 className="card-title"><a href="#">Teacher Name</a></h5>  
        </div>
        <div className='card-footer'>
         <div className='title'>
          <span>Rating:  4.5/5 </span>
         
          
          </div>
        </div>
      </div>
    
    </div>

    <div className="col-md-3">
      <div className="card">
      <a href="#"><img src="teacher.jpg" className="card-img-top" alt="image" /></a>
        <div className="card-body">
          <h5 className="card-title"><a href="#">Teacher Name</a></h5>
        </div>
        <div className='card-footer'>
         <div className='title'>
          <span>Rating:  4.5/5 </span>
         
          
          </div>
        </div>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card">
      <a href="#"><img src="teacher.jpg" className="card-img-top" alt="image" /></a>
        <div className="card-body">
          <h5 className="card-title"><a href="#">Teacher Name</a></h5>  
        </div>
        <div className='card-footer'>
         <div className='title'>
          <span>Rating:  4.5/5 </span>
         
          
          </div>
        </div>
      </div>
    </div>

    </div>
    </div>
  );
}

export default PopularTeachers;
