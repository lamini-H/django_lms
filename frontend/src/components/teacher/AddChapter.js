
import { Link} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
const baseUrl = 'http://127.0.0.1:8000/api';
function AddChapter(){
    const [chapterData, setchapterData]= useState({

        'title':'',
        'description':'',
        'video':'',
        'remarks':''
    });

    

    //Change Element Value
    const handleChange = (event) =>{
        setchapterData({
            ...chapterData,
            [event.target.name]: event.target.value
        });
    }
    //end

    //Handle File Upload changes
    const handleFileChange=(event)=>{
        setchapterData({
            ...chapterData,
            [event.target.name]: event.target.files[0]
        });
    }
    
    const {course_id} = useParams();
    //Submit Form    
    const formSubmit =()=>{
        const _formData = new FormData();        
        _formData.append('course',course_id);
        _formData.append('title',chapterData.title);
        _formData.append('description',chapterData.description);
        _formData.append('video',chapterData.video,chapterData.video.name)
        _formData.append('remarks',chapterData.remarks);

        try {
            axios.post(baseUrl+'/chapter/',_formData,{
                headers:{
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res)=>{
             console.log(res.data);
             window.location.href='/add-chapter/1';
            });
        } catch (error) {
            console.log(error)
        }

    };


    return (
        <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
            < TeacherSidebar/> 
            </aside>
            <section className='col-md-9'>
             <div className='card'>
                <h5 className='card-header'>Add Course Chapter</h5>
                <div className='card-body'>
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                    <input type="text" className='form-control' onChange={handleChange} name='title' />
                </div>
                </div>

                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                 <textarea className='form-control' id='description' onChange={handleChange} name='description' ></textarea>
                </div>
                </div>
             
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Video</label>
                    <div className="col-sm-10">
                    <input type="file" className='form-control' onChange={handleFileChange} name='video' />
                    </div>
                </div>
                
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Remarks</label>
                    <div className="col-sm-10">
                    <textarea className='form-control' onChange={handleChange} name='remarks'></textarea>
                    </div>
                </div>
                
                <hr/>
                <button type='button' onClick={formSubmit} className='btn btn-primary'>Submit</button>
                
                </div>
             </div>

            </section>
            </div>
    </div>
      
  
    
    );
}
export default AddChapter;