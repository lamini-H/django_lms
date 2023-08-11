import Swal from 'sweetalert2';
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function EditChapter(){
    

    const [chapterData, setChapterData]= useState({
        'course': '',
        'title':'',
        'description':'',
        'prev_video':'',
        'video':'',
        'remarks':''
    });

     //Change Element Value
     const handleChange = (event) =>{
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.value
        });
    }
    //end
    
    
    //Handle File Upload changes
    const handleFileChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.files[0]
        });
    }
    
    const {chapter_id} = useParams();

      //Submit Form    
      const formSubmit =()=>{
        const _formData = new FormData();        
        _formData.append('course',chapterData.course);
        _formData.append('title',chapterData.title);
        _formData.append('description',chapterData.description);
        if (chapterData.video != ''){
            _formData.append('video',chapterData.video,chapterData.video.name);
        } 
        _formData.append('remarks',chapterData.remarks);
        try {
            axios.put(baseUrl+'/chapter/'+chapter_id,_formData,{
                headers:{
                    'content-type': 'multipart/form-data'
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
                }
             //console.log(res);
             //window.location.href='/add-chapter/1';
            });
        } catch (error) {
            console.log(error)
        }

    };

    //Fetch Chapters when page Load
    useEffect (()=>{
        try {
            axios.get(baseUrl+'/chapter/'+chapter_id)
            .then((res)=>{
                setChapterData(
                    {
                        course:res.data.course,
                        title:res.data.title,
                        description:res.data.description,
                        prev_video:res.data.video,
                        remarks:res.data.remarks,
                        video:''


                    }
                );
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
            < TeacherSidebar/> 
            </aside>
            <section className='col-md-9'>
             <div className='card'>
                <h5 className='card-header'>Update Course Chapter</h5>
                <div className='card-body'>
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                    <input type="text" value={chapterData.title} className='form-control' onChange={handleChange} name='title' />
                </div>
                </div>

                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                 <textarea className='form-control' value={chapterData.description} id='description' onChange={handleChange} name='description' ></textarea>
                </div>
                </div>
             
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Video</label>
                    <div className="col-sm-10">
                    <input type="file" className='form-control' onChange={handleFileChange} name='video' />
                    </div>
                    { chapterData.prev_video &&
                    <video controls width="100%" height="250px" className="mt-2">
                            <source src={chapterData.prev_video} type="video/mp4" />
                        Sorry, your browser doesn't support embeded videos
                     </video>
                     }
                </div>
                
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-2 col-form-label">Remarks</label>
                    <div className="col-sm-10">
                    <textarea className='form-control' value={chapterData.remarks} onChange={handleChange} name='remarks'></textarea>
                    </div>
                </div>
                
                <hr/>
                <button type='button' onClick={formSubmit} className='btn btn-info'>Update</button>
                
                </div>
             </div>
            </section>
            </div>
    </div>
    );
}
export default EditChapter;