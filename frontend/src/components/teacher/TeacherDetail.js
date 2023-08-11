import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherDetail(){
    const [teacherData, setteacherData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [skillListData, setskillListData] = useState([]);
    

    let {teacher_id} = useParams()

    useEffect (()=>{
        try {
            axios.get(baseUrl+'/teacher/'+teacher_id)
            .then((res)=>{
                setteacherData(res.data);
                setCourseData(res.data.teacher_courses);
                setskillListData(res.data.skill_list);
          
                
            });
        } catch (error) {
            console.log(error);
        }
    }, []);
    console.log(teacherData)
    return (
        <div className="container mt-3">
        <div className="row">
            <div className="col-4"><img src="/singleteacher.jpg" className="img-thumbnail" alt=" Teacher image" /></div>
            <div className="col-8">
                <h3>{teacherData.full_name}</h3>
                <p>{teacherData.detail}</p>
                <p className="fw-bold">Skills: 
                {skillListData.map((skill,index)=>
                      <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className="badge bg-warning text-black ms-1">{skill.trim()}</Link>
                )}


                
                </p>
                <p className="fw-bold">Recent Course:<Link to="/category/eviews">Analysing Spatial Data using Eviews</Link>  </p>
                
                <p className="fw-bold">Rating: 4.5 / 5 </p>
            </div>
        </div>
        { /* Course videos*/ }
        <div className="card mt-4" >
            <h5 className="card-header">
                Course Lists
            </h5>
         <div className="list-group list-group-flush">
            {courseData.map((course,index)=>
            <Link to={`/detail/${course.id}`} className="list-group-item list-group-item-action">{course.title}</Link>
            )}
            
         </div>

        </div>


        
    </div>
    );
}
export default TeacherDetail;