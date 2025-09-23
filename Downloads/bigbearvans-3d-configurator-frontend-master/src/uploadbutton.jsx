<div className="text-center mt-4">
<button
  className="btn btn-success px-4 py-2 fw-semibold"
  onClick={() =>
    showQuoteForm(async (formData) => {
      console.log("User Info Submitted:", formData);



      Swal.fire({
        icon: "success",
        title: "Submitted!",
        text: "Thanks! We'll get back to you with a quote shortly.",
      });
            // Optional: include your exportScene logic here
      exportScene();
    })
  }
>
  Submit & Get a Quote
</button>

</div>