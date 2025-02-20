import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaTags } from "react-icons/fa";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.updateProfile);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [coverLetter, setCoverLetter] = useState(user?.coverLetter || "");
  const [avatar, setAvatar] = useState(null);
  const [resume, setResume] = useState(null);
  const [firstNiche, setFirstNiche] = useState(user?.niches?.firstNiche || "");
  const [secondNiche, setSecondNiche] = useState(user?.niches?.secondNiche || "");
  const [thirdNiche, setThirdNiche] = useState(user?.niches?.thirdNiche || "");

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support",
    "Systems Administration",
    "IT Consulting",
  ];

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (avatar) formData.append("avatar", avatar);
    if (resume) formData.append("resume", resume);
    formData.append("firstNiche", firstNiche);
    formData.append("secondNiche", secondNiche);
    formData.append("thirdNiche", thirdNiche);

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, error, isUpdated]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <FaUser className="header-icon" />
        <h2>Update Profile</h2>
      </div>

      <div className="profile-card">
        <div className="form-grid">
          <div className="form-group">
            <label>
              <FaUser className="icon" /> Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>
              <FaEnvelope className="icon" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>
              <FaPhone className="icon" /> Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label>
              <FaMapMarkerAlt className="icon" /> Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group full-width">
            <label>
              <FaFileAlt className="icon" /> Cover Letter
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write your cover letter"
              rows={6}
            />
          </div>

          <div className="form-group">
            <label>Profile Picture</label>
            <div className="file-input">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Resume</label>
            <div className="file-input">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <FaTags className="icon" /> Primary Niche
            </label>
            <select value={firstNiche} onChange={(e) => setFirstNiche(e.target.value)}>
              <option value="">Select Primary Niche</option>
              {nichesArray.map((niche) => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <FaTags className="icon" /> Secondary Niche
            </label>
            <select value={secondNiche} onChange={(e) => setSecondNiche(e.target.value)}>
              <option value="">Select Secondary Niche</option>
              {nichesArray.map((niche) => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              <FaTags className="icon" /> Tertiary Niche
            </label>
            <select value={thirdNiche} onChange={(e) => setThirdNiche(e.target.value)}>
              <option value="">Select Tertiary Niche</option>
              {nichesArray.map((niche) => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            className="submit-btn"
            onClick={handleUpdateProfile}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;