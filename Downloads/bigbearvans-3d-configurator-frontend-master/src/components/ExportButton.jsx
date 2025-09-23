import React from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const ExportButton = ({
  exportScene,
  isPivotoff,
  isSelected,
  setIsSelected,
  setActiveModelId,
  setActiveExteriorModelId,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async () => {
    if (!user) {
      const result = await Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to save your configuration to the cloud.',
        confirmButtonText: 'Go to Login',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        // Use navigate so we stay in the SPA, and pass along current path
        navigate('/login', {
          state: { from: location.pathname },
          replace: true
        });
      }
      return; // block the export
    }

    // If logged in, proceed:
    setIsSelected(false);
    setActiveModelId(null);
    setActiveExteriorModelId(null);
    await new Promise((resolve) => setTimeout(resolve, 100));
    exportScene();
  };

  return (
    <button
      className="btn-custom save-btn"
      onClick={handleClick}
      disabled={isPivotoff}
    >
      Save to Cloud
    </button>
  );
};

export default ExportButton;
