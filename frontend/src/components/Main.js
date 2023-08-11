//Other Details
import Header from './Header';
import Home from './Home';
import About  from './About';
import Footer from './Footer';

//Courses details
import CourseDetail from './CourseDetail';
import AllCourses from './AllCourses';
import CourseChapters from './teacher/CourseChapters';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
import CoursesCategory from './CoursesCategory';

// User/Student Details
import MyCourses from './user/MyCourses';
import FavouriteCourses from './user/FavouriteCourses';
import RecommendedCourses from './user/RecommendedCourses';
import ProfileSettings from './user/ProfileSettings';
import ChangePassword from './user/ChangePassword';
import Login from './user/Login';
import Register from './user/Register';
import StudentLogout from './user/StudentLogout';
import Dashboard from './user/Dashboard';
//import EnrolledStudents from './user/EnrolledStudents';


// Teachers Details
import TeacherLogin from './teacher/TeacherLogin';
import TeacherRegister from './teacher/TeacherRegister';
import TeacherDashboard from './teacher/TeacherDashboard';
import TeacherCourses from './teacher/TeacherCourses';
import EnrolledStudents from './teacher/EnrolledStudents';
import AddCourses from './teacher/AddCourses';
import AddChapter from './teacher/AddChapter';
import TeacherProfileSettings from './teacher/TeacherProfileSettings';
import TeacherChangePassword from './teacher/ChangePassword';
import TeacherDetail from './teacher/TeacherDetail';
import TeacherLogout from './teacher/TeacherLogout';
import AllChapters from './teacher/CourseChapters';
import EditChapter from './teacher/EditChapter';
import EditCourse from './teacher/EditCourse';
import TeacherskillCourses from './teacher/TeacherskillCourses';


import { Routes,Route } from 'react-router-dom';
function Main(){
  return(
    <div className="App">
       <Header />
       <Routes>
        {/* Other Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />

          {/* Courses Routes */}
          <Route path='/detail/:course_id' element={<CourseDetail />} />
          <Route path='/all-courses' element={<AllCourses />} />
          <Route path='/popular-courses' element={<PopularCourses />} />
          <Route path='/popular-teachers' element={<PopularTeachers />} />

          {/* Student Routes */}
          <Route path='/user-login' element={<Login />} />
          <Route path='/user-register' element={<Register />} />
          <Route path='/student-dashboard' element={<Dashboard />} />
          <Route path='/my-courses' element={<MyCourses />} />
          <Route path='/enrolled-students/:course_id' element={<EnrolledStudents />} />
          <Route path='/favourite-courses' element={<FavouriteCourses />} />
          <Route path='/student-logout' element={<StudentLogout />} />
          <Route path='/recommended-courses' element={<RecommendedCourses />} />
          <Route path='/profile-setting' element={<ProfileSettings />} />
          <Route path='/change-password' element={<ChangePassword />} />

          {/* Teacher Routes */}
          <Route path='/teacher-register' element={<TeacherRegister />} />
          <Route path='/teacher-login' element={<TeacherLogin />} />
          <Route path='/teacher-logout' element={<TeacherLogout />} />
          <Route path='/teacher-dashboard' element={<TeacherDashboard />} />
          <Route path='/teacher-courses' element={<TeacherCourses />} />
          <Route path='/enrolled-students/:course_id' element={<EnrolledStudents />} />
          <Route path='/add-courses' element={<AddCourses />} />
          <Route path='/edit-course/:course_id' element={<EditCourse />} />
          <Route path='/add-chapter/:course_id' element={<AddChapter />} />
          <Route path='/all-chapters/:course_id' element={<AllChapters />} />
          <Route path='/edit-chapter/:chapter_id' element={<EditChapter />} />
          <Route path='/teacherprofile-setting' element={<TeacherProfileSettings />} />
          <Route path='/teacherchange-password' element={<TeacherChangePassword />} />
          <Route path='/teacher-detail/:teacher_id' element={<TeacherDetail />} />
          <Route path='/category/:category_slug' element={<CoursesCategory />} />
          <Route path='/teacher-skill-courses/:skill_name/:teacher_id' element={<TeacherskillCourses />} />

        </Routes>
      
      <Footer />
    </div>
  );
}
export default Main;