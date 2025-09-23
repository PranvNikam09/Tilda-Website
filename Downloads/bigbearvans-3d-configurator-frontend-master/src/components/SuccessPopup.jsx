import React, { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/**
 * SuccessPopup handles upload feedback using SweetAlert2.
 * Props:
 * - show: boolean — whether upload started
 * - isUploading: boolean — true during upload
 * - progress: number — 0 to 100
 * - shareLink: string — shown after upload
 * - onClose: function — called after popup is closed
 */
const SuccessPopup = ({ show, isUploading, progress, shareLink, onClose }) => {
  const loadingShown = useRef(false);
  const successShown = useRef(false);

  useEffect(() => {
    if (!show) return;

    // Step 1: Show loading popup once
    if (isUploading && !loadingShown.current) {
      loadingShown.current = true;
      successShown.current = false;

      Swal.fire({
        title: 'Uploading...',
        html: `<b>Progress:</b> 0%`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
        showConfirmButton: false
      });
    }

    // Step 2: Update progress
    if (isUploading && loadingShown.current) {
      Swal.update({
        html: `<b>Progress:</b> ${Math.round(progress)}%`
      });
    }

    // Step 3: Upload finished — show success popup once
    if (!isUploading && shareLink && !successShown.current) {
      successShown.current = true;
      loadingShown.current = false;

      Swal.close(); // Close loading spinner
      Swal.fire({
        title: 'Upload Successful!',
        html: `
          <p>Your model has been uploaded successfully!</p>
          <p>Share your creation with your friends:</p>
          <div style="display: flex; align-items: center; margin-top: 0.5rem;">
            <input id="swal-input" 
                   style="flex: 1; margin-right: 8px; padding: 0.5rem; 
                          border: 1px solid #ccc; border-radius: 4px;"
                   type="text" 
                   value="${shareLink}" 
                   readonly />
            <button id="swal-copy-btn" 
                    class="swal2-confirm swal2-styled" 
                    style="margin: 0;">
              Copy Link
            </button>
          </div>
        `,
        showCloseButton: true,
        showConfirmButton: false,
        willClose: onClose
      });

      // Attach copy button logic
      const copyBtn = Swal.getPopup().querySelector('#swal-copy-btn');
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(shareLink);
        copyBtn.innerText = 'Copied!';
        setTimeout(() => { copyBtn.innerText = 'Copy Link'; }, 2000);
      });
    }
  }, [show, isUploading, progress, shareLink, onClose]);

  return null;
};

export default SuccessPopup;
