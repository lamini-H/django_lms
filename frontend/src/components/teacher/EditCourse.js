

import Swal from 'sweetalert2';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';
function EditCourse(){
    const [cats,setCats] = useState([]);
    const [courseData, setcourseData]= useState({
        'category':'',
        'title':'',
        'description':'',
        'prev_fimg':'',
        'f_img':'',
        'techs':''
    });

    const {course_id} = useParams();
    //Fetch categories when page load
    useEffect (()=>{
        try {
            axios.get(baseUrl+'/category')
            .then((res)=>{
                  setCats(res.data);
                
            });
        } catch (error) {
            console.log(error);
        }

        //Fetch current course data

        try {
            axios.get(baseUrl+'/teacher-course-detail/'+course_id)
            .then((res)=>{
                setcourseData(
                    {
                        category:res.data.category,
                        title:res.data.title,
                        description:res.data.description,
                        prev_fimg:res.data.featured_img,
                        f_img:'',
                        techs:res.data.techs,
                    


                    }
                );
            });
        } catch (error) {
            console.log(error);
        }

    }, []);
    //End Fetch categories when page load

    //Change Element Value
    const handleChange = (event) =>{
        setcourseData({
            ...courseData,
            [event.target.name]: event.target.value
        });
    }
    //end
    //Handle File Upload changes
    const handleFileChange=(event)=>{
        setcourseData({
            ...courseData,
            [event.target.name]: event.target.files[0]
        });
    }

    //Submit Form    
    const formSubmit =()=>{
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher',1);
        _formData.append('title',courseData.title);
        _formData.append('description',courseData.description);
        if(courseData.f_img!=''){
            _formData.append('featured_img',courseData.f_img,courseData.f_img.name)
        }
        _formData.append('techs',courseData.techs);

        try {
            axios.put(baseUrl+'/teacher-course-detail/'+course_id,_formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res)=>{
                if(res.status ==200){
                    Swal.fire({
                        title: 'Data has been updated',
                        icon: 'success',
                        toast: true,
                        timer: 3000,
                        position: 'top-right',
                        timerProgressBar:true,
                        showConfirmButton: false
                       
                      });
                      //window.location.href='/teacher-courses/';
                }
             //console.log(res.data);
            
            
            });
        } catch (error) {
            console.log(error)
        }

    };


    return(
        <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
            < TeacherSidebar/> 
            </aside>
            <section className='col-md-9'>
             <div className='card'>
                <h5 className='card-header'>Edit Course</h5>
                <div className='card-body'>
                    <form>

                    <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Category</label>
                    <div className="col-sm-10">
                    <select name='category' value={courseData.category} className='form-control' onChange={handleChange}>
                        {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                    </select>
                </div>
                </div>
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                    <input type="text" value={courseData.title}  onChange={handleChange} name='title' className='form-control'   />
                </div>
                </div>

                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                 <textarea className='form-control' value={courseData.description}  onChange={handleChange} name='description' ></textarea>
                </div>
                </div>
             
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Featured Image</label>
                    <div className="col-sm-10">
                    <input type="file"    name='f_img' onChange={handleFileChange} className='form-control'  />
                    </div>
                    {courseData.prev_fimg &&
                      <p className='mt-2'> <img src={courseData.prev_fimg} className="img-thumbnail" /></p>    
                    }
                </div>
                
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Technologies</label>
                    <div className="col-sm-10">
                    <textarea className='form-control' value={courseData.techs}   onChange={handleChange} name='techs'></textarea>
                    </div>
                </div>
                
                <hr/>
                <button onClick={formSubmit} className='btn btn-info' type='button'>Update</button>
                </form>
                </div>
             </div>

            </section>
            </div>
    </div>
    );
}
export default EditCourse;