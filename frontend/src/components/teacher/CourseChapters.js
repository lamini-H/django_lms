import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function CourseChapters(){
    const [chapterData,setchapterData] = useState([]);
    const [totalResult,settotalResult] = useState([0]);
    const {course_id} = useParams();

    useEffect (()=>{
        try {
            axios.get(baseUrl+'/course-chapters/'+course_id)
            .then((res)=>{
                settotalResult(res.data.length);
                setchapterData(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

   
    const handleDeleteClick = (chapter_id)=>{
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this chapter?',
            icon: 'warning',
            confirmButtonText: 'Continue',
            showCancelButton:true
          }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/chapter/'+chapter_id)
                    .then((res)=>{
                        Swal.fire('success', 'Data has been deleted.');
                        try{
                            axios.get(baseUrl+'/course-chapters/'+course_id)
                            .then((res)=>{
                              
                                settotalResult(res.data.length);
                                setchapterData(res.data);
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
    return(
        <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
            < TeacherSidebar/> 
            </aside>
            <section className='col-md-9'>
            <div className='card'>
        <h5 className='card-header'>All Chapters ({totalResult}) <Link className='btn btn-success float-end btn-sm' to={`/add-chapter/`+course_id}>Add Chapters</Link></h5>
        <div className='card-body'>
        <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Video</th>
                        <th>Remarks</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {chapterData.map((chapter, index)=>
                    <tr>
                    <td><Link to={`/edit-chapter/`+ chapter.id} >{chapter.title}</Link></td>
                    <td>
                        <video controls width="250">
                            <source src={chapter.video.url} type="video/webm" />
                            Sorry, your browser doesn't support embeded videos
                        </video>
                    </td>
                    <td>{chapter.remarks}</td>
                    <td>
                        <Link to={`/edit-chapter/`+ chapter.id}  className='btn btn-info btn-sm text-white '><i className="bi bi-pencil-square"></i></Link>
                        <button onClick={()=>handleDeleteClick(chapter.id)} to={`/delete-chapter/`+chapter.id} className='btn btn-danger btn-sm text-white ms-1'><i className="bi bi-trash"></i></button>
                        
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
export default CourseChapters;