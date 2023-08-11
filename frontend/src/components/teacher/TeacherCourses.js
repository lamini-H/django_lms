import Swal  from "sweetalert2";
import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';
function TeacherCourses(){
    const [courseData, setCourseData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');
    //Fetch courses when page load
    useEffect (()=>{
        try {
            axios.get(baseUrl+'/teacher-courses/'+teacherId)
            .then((res)=>{
                setCourseData(res.data);
                
            });
        } catch (error) {
            console.log(error);
        }
    }, []);
    //End Fetch categories when page load
    console.log(courseData)

    const handleDeleteClick = (course_id)=>{
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this Course?',
            icon: 'warning',
            confirmButtonText: 'Continue',
            showCancelButton:true
          }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/teacher-course-detail/'+course_id)
                    .then((res)=>{
                        Swal.fire('success', 'Data has been deleted.');
                        try{
                            axios.get(baseUrl+'/teacher-course-detail/'+course_id)
                            .then((res)=>{

                                setCourseData(res.data);
                            })
                        }catch(error){
                            console.log(error);
                        }
                       
                    });
                   
                }catch(error){
                    Swal.fire('error', 'Data has not been deleted!!');
            }
            }else{
                Swal.fire('error','Data has not been deleted!!');
            }
          });
    }
    return (

        <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
            < TeacherSidebar/> 
            </aside>
            <section className='col-md-9'>
            <div className='card'>
        <h5 className='card-header'> My Courses</h5>
        <div className='card-body'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Total Enrolled </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courseData.map((course, index)=>
                    <tr>
                    <td><Link to={`/all-chapters/`+course.id}>{course.title}</Link></td>
                    <td>{course.title}</td>
                    <td><img src={course.featured_img} width="80" className="rounded" alt={course.title}/></td>
                    <td><Link to={`/enrolled-students/`+course.id}> {course.total_enrolled_students} Student(s)</Link></td>
                    <td>
                         <Link to={`/edit-course/`+course.id} className="btn btn-sm btn-success ms-2"><i className="bi bi-pencil-square"></i></Link>
                        <Link to={`/add-chapter/`+course.id} className="btn btn-sm  btn-secondary ms-2"><i className="bi bi-plus-square"></i></Link>
                        <button onClick={()=>handleDeleteClick(course.id)} to={`/delete-course/`+course.id} className='btn btn-danger btn-sm text-white ms-1'><i className="bi bi-trash"></i></button>

                    </td>
                 
                   
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
            </section>
            </div>
    </div>
  
    
    );
}
export default TeacherCourses;