import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { 
  FaUser, 
  FaEdit, 
  FaKey, 
  FaBriefcase, 
  FaListAlt, 
  FaSignOutAlt,
  FaUserTie,
  FaChevronRight
} from "react-icons/fa";
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";

const Dashboard = () => {
  const [componentName, setComponentName] = useState("My Profile");
  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  const menuItems = [
    {
      title: "My Profile",
      icon: <FaUser />,
      component: "My Profile",
      role: "all"
    },
    {
      title: "Update Profile",
      icon: <FaEdit />,
      component: "Update Profile",
      role: "all"
    },
    {
      title: "Update Password",
      icon: <FaKey />,
      component: "Update Password",
      role: "all"
    },
    {
      title: "Post New Job",
      icon: <FaBriefcase />,
      component: "Job Post",
      role: "Employer"
    },
    {
      title: "My Jobs",
      icon: <FaListAlt />,
      component: "My Jobs",
      role: "Employer"
    },
    {
      title: "Applications",
      icon: <FaUserTie />,
      component: "Applications",
      role: "Employer"
    },
    {
      title: "My Applications",
      icon: <FaListAlt />,
      component: "My Applications",
      role: "Job Seeker"
    }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <div className="sidebar-header">
            <div className="user-info">
              <div className="user-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <h3>{user?.name}</h3>
                <p>{user?.role}</p>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              (item.role === "all" || item.role === user?.role) && (
                <button
                  key={item.component}
                  className={`nav-item ${componentName === item.component ? 'active' : ''}`}
                  onClick={() => setComponentName(item.component)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.title}</span>
                  <FaChevronRight className="nav-arrow" />
                </button>
              )
            ))}
            
            <button className="nav-item logout-btn" onClick={handleLogout}>
              <span className="nav-icon"><FaSignOutAlt /></span>
              <span className="nav-text">Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          <div className="content-header">
            <h2>{componentName}</h2>
          </div>
          
          <div className="content-body">
            {(() => {
              switch (componentName) {
                case "My Profile":
                  return <MyProfile />;
                case "Update Profile":
                  return <UpdateProfile />;
                case "Update Password":
                  return <UpdatePassword />;
                case "Job Post":
                  return <JobPost />;
                case "My Jobs":
                  return <MyJobs />;
                case "Applications":
                  return <Applications />;
                case "My Applications":
                  return <MyApplications />;
                default:
                  return <MyProfile />;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;