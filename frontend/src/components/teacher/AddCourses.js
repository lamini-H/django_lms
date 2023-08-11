import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
//import { useParams } from "react-router-dom";
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';
function AddCourses(){
    const [cats,setCats] = useState([]);
    const [courseData, setcourseData]= useState({
        'category':'',
        'title':'',
        'description':'',
        'f_img':'',
        'techs':''
    });

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
    //const {teacher_id} = useParams();
    //Submit Form    
    const formSubmit =()=>{
        const teacherId = localStorage.getItem('teacherId');
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher',teacherId);
        _formData.append('title',courseData.title);
        _formData.append('description',courseData.description);
        _formData.append('featured_img',courseData.f_img,courseData.f_img.name)
        _formData.append('techs',courseData.techs);

        try {
            axios.post(baseUrl+'/course/',_formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res)=>{
             //console.log(res.data);
            
             //window.location.href='/add-course';
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
                <h5 className='card-header'>Add New Courses</h5>
                <div className='card-body'>
                    <form>

                    <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Category</label>
                    <div className="col-sm-10">
                    <select name='category' className='form-control' onChange={handleChange}>
                        {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                    </select>
                </div>
                </div>
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                    <input type="text" onChange={handleChange} name='title' className='form-control'   />
                </div>
                </div>

                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                 <textarea className='form-control'onChange={handleChange} name='description' ></textarea>
                </div>
                </div>
             
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Featured Image</label>
                    <div className="col-sm-10">
                    <input type="file" name='f_img' onChange={handleFileChange} className='form-control'  />
                    </div>
                </div>
                
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Technologies</label>
                    <div className="col-sm-10">
                    <textarea className='form-control' onChange={handleChange} name='techs'></textarea>
                    </div>
                </div>
                
                <hr/>
                <button onClick={formSubmit} className='btn btn-primary' type='button'>Submit</button>
                </form>
                </div>
             </div>

            </section>
            </div>
    </div>
    );
}
export default AddCourses;