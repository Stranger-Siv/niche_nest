import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaLock, FaKey, FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  clearAllUpdateProfileErrors,
  updatePassword,
} from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, error, isUpdated } = useSelector((state) => state.updateProfile);
  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated Successfully");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
      // Clear form fields after successful update
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [dispatch, error, isUpdated]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <FaShieldAlt className="header-icon" />
        <h2>Update Password</h2>
      </div>

      <div className="profile-card">
        <div className="form-grid">
          <div className="form-group full-width">
            <label>
              <FaKey className="icon" /> Current Password
            </label>
            <div className="password-input">
              <input
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your current password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowOldPassword(!showOldPassword)}
                aria-label={showOldPassword ? "Hide password" : "Show password"}
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group full-width">
            <label>
              <FaLock className="icon" /> New Password
            </label>
            <div className="password-input">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group full-width">
            <label>
              <FaLock className="icon" /> Confirm New Password
            </label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            className="submit-btn"
            onClick={handleUpdatePassword}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;