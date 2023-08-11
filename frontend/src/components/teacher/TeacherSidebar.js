import {Link} from 'react-router-dom';
function TeacherSidebar(){
    return(
        <div className='card'>
        <h5 className='card-header'>Dashboard</h5>
        <div className='list-group list-group-flush'>
            <Link to='/teacher-dashboard' className='list-group-item list-group-action'>Dashboard</Link>
            <Link to='/teacher-courses' className='list-group-item list-group-action'>My Courses</Link>
            <Link to='/add-courses' className='list-group-item list-group-action'>Add Courses</Link>
            {/* <Link to='/add-chapter' className='list-group-item list-group-action'>Add Course Chapters</Link> */}
            <Link to='/enrolled-students' className='list-group-item list-group-action'>Enrolled Students</Link>
            <Link to='/teacherprofile-setting' className='list-group-item list-group-action'>Profile Settings</Link>
            <Link to='/teacherchange-password' className='list-group-item list-group-action'>Change Password</Link>
            <Link to='/teacher-login' className='list-group-item list-group-action text-danger'>Logout</Link>
        </div>
</div>
    );

}
export default TeacherSidebar;