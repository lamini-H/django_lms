import {Link} from 'react-router-dom';
function Header() {
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus = localStorage.getItem('studentLoginStatus')
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
      <Link  className="navbar-brand" to="/">Learn Online</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button> 
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ms-auto">
          <Link  className="nav-link active" aria-current="page" to="/">Home</Link>
          <Link className="nav-link" to="/all-courses">Courses</Link>
          {/* <a className="nav-link" href="#">Teachers</a> */}
          <div className="dropdown">

          <a className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Teacher
          </a>
          <ul className="dropdown-menu">
            {teacherLoginStatus != 'true' &&
            
            <>
            <li><Link className="dropdown-item" to="teacher-login">Login</Link></li>
            <li><Link className="dropdown-item" to="teacher-register">Register</Link></li>
            </>
          }

            <li><Link className="dropdown-item" to="teacher-dashboard">Dashboard</Link></li>
            <li><Link className="dropdown-item" to="teacher-logout">Logout</Link></li>
          </ul>
        </div>
          <div className="dropdown">
          <a className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            User
          </a>
          <ul className="dropdown-menu">
          {studentLoginStatus != 'true' && 
            <>
           <li><Link className="dropdown-item" to="user-login">Login</Link></li>
            <li><Link className="dropdown-item" to="user-register">Register</Link></li>
            </>
              }
            {studentLoginStatus === 'true' && 
            <>
            <li><Link className="dropdown-item" to="user-dashboard">Dashboard</Link></li>
            <li><Link to="student-logout" className="dropdown-item" href="#">Logout</Link></li>
            </>
              }
          </ul>
      
        </div>




          
          
        </div>
      </div>
      </div>
  </nav>
 
    );
  }
  
  export default Header;
  