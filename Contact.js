document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const formContainer = document.getElementById("contact-form-container");
  const formSubmitted = document.getElementById("form-submitted");
  const submitAgainButton = document.getElementById("submit-again-button");

  // Initialize EmailJS
  emailjs.init(process.env.EMAILJS_USER_ID);

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData); // Convert form data to an object

    try {
      const result = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID, // Service ID from environment variables
        process.env.EMAILJS_TEMPLATE_ID, // Template ID from environment variables
        data
      );

      if (result.status === 200) {
        // Show success message
        formContainer.style.display = "none";
        formSubmitted.style.display = "block";
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  });

  submitAgainButton.addEventListener("click", () => {
    // Reset form for another submission
    formContainer.style.display = "block";
    formSubmitted.style.display = "none";
  });
});
