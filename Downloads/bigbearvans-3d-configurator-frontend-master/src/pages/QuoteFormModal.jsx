// components/QuoteFormModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";



const QuoteFormModal = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const MySwal = withReactContent(Swal);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async () => {
    if (!formData.name || !formData.email) {
      await Swal.fire("Missing Fields", "Name and Email are required.", "warning");
      return false;
    }
    onSubmit(formData);
    return true;
  };

  React.useEffect(() => {
    MySwal.fire({
      title: "Get a Quote",
      html: (
        <div>
          <input
            name="name"
            placeholder="Your Name"
            className="swal2-input"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            className="swal2-input"
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone (Optional)"
            type="tel"
            className="swal2-input"
            onChange={handleChange}
          />
        </div>
      ),
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: () => handleFormSubmit(),
      didOpen: () => {
        document.querySelector("input[name='name']").focus();
      }
    });
    // eslint-disable-next-line
  }, []);

  return null;
};

export default QuoteFormModal;
