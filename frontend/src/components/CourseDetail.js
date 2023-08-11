import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
const siteUrl = 'http://127.0.0.1:8000/';
const baseUrl = 'http://127.0.0.1:8000/api';

function CourseDetail(){
  const [courseData, setCourseData] = useState([]);
  const [chapterData, setchapterData] = useState([]);
  const [teacherData, setteacherData] = useState([]);
  const [relatedcourseData, setrelatedcourseData] = useState([]);
  const [techListData, settechListData] = useState([]);
  const [userLoginStatus, setuserLoginStatus] = useState([]);
  const [enrollStatus, setenrollStatus] = useState([]);
  let {course_id} = useParams()
  const studentId = localStorage.getItem('studentId');
  useEffect (()=>{
    try {
        axios.get(baseUrl+'/course/'+course_id)
        .then((res)=>{
            setCourseData(res.data);
            setchapterData(res.data.course_chapters);
            setteacherData(res.data.teacher);
            setrelatedcourseData(JSON.parse(res.data.related_videos));
            settechListData(res.data.tech_list);
        });
    } catch (error) {
        console.log(error);
    }
     //Fetch enroll status
    try {
      axios.get(baseUrl+'/fetch-enroll-status/'+studentId+'/'+course_id)
      .then((res)=>{
        if(res.data.bool ==true){
          setenrollStatus('success')
        }
        
         
      });
  } catch (error) {
      console.log(error);
  }

    
//Check Student enrolled in this course
const studentLoginStatus = localStorage.getItem('studentLoginStatus')
if(studentLoginStatus === 'true'){
  setuserLoginStatus('success')
}
}, []);


const enrollCourse=()=>{
  const studentId = localStorage.getItem('studentId');
  const _formData = new FormData();
  _formData.append('course', course_id);
  _formData.append('student',studentId);

  try {
    axios.post(baseUrl+'/student-enroll-course/',_formData,{
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then((res)=>{
      console.log(res.data);
    });
  } catch (error) {
    console.log(error)
  }
}




//console.log(relatedcourseData)
    return(
        <div className="container mt-3">
            <div className="row">
                <div className="col-4"><img src={courseData.featured_img} className="img-thumbnail" alt={courseData.title}/></div>
                <div className="col-8">
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p className="fw-bold">Techs: &nbsp; 
                    {techListData.map((tech,index)=>
                      <Link to={`/category/${tech.trim()}`} className="badge bg-warning text-black ms-1">{tech}</Link>
                    )}
                    
                     </p>
                    <p className="fw-bold">Course By: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link> </p>
                    <p className="fw-bold">Duration: 3 Hours 30 Minutes </p>
                    <p className="fw-bold">Total Enrolled: {courseData.total_enrolled_students} Student(s) </p>
                    <p className="fw-bold">Rating: 4.5 / 5 </p>
                    <button to="/" onClick={enrollCourse} type="button"  className="btn btn-success">Enroll in this Course</button>

                    

                </div>
            </div>
            { /* Course videos*/ }
            {enrollStatus ==='success' &&  userLoginStatus =='success'&&
            <div className="card mt-4" >
                <h5 className="card-header">
                    Course Videos
                </h5>
                <ul className="list-group list-group-flush">
                {chapterData.map((chapter,index)=>
                    <li className="list-group-item">{chapter.title}
                    <span className=" float-end">
                      <span className='m-3'>1hour:30mins</span>
                     <button className="btn btn-sm  btn-danger" data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="bi-youtube"></i></button>
                    </span>

                    {/*  Video Model  Start*/}

                  <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Video 1</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <div class="ratio ratio-16x9">
                          <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
                        </div>
                        </div>
                      
                      </div>
                    </div>
                  </div>
                    {/*End Video model end */}                
                    </li>
                     )}
                    
                </ul>

            </div>
}
            {/* Related Courses */}
<h3 className="pb-1 mb-4 mt-5">Related Courses</h3>
<div className="row mb-4">
  {relatedcourseData.map((rcourse,index)=>
<div className="col-md-3">
  <div className="card">
  <Link target="_blank" to={`/detail/${rcourse.pk}`}><img src={`${siteUrl}media/${rcourse.fields.featured_img}`} className="card-img-top" alt={rcourse.fields.title} /></Link>
    <div className="card-body">
      <h5 className="card-title"><Link to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link></h5>     
    </div>
  </div>
  
</div>
)}

</div>            
</div>
    );
}
export default CourseDetail;