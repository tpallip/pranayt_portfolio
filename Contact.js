document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const formContainer = document.getElementById("contact-form-container");
  const formSubmitted = document.getElementById("form-submitted");
  const submitAgainButton = document.getElementById("submit-again-button");

  // Initialize EmailJS (Replace "YOUR_USER_ID" with your actual EmailJS user ID)
  emailjs.init("Y8hq_MyOqe41zgBYs");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
      const result = await emailjs.send(
        "service_m6owad8",
        "template_zvnfy8a",
        data
      );
      if (result.status === 200) {
        formContainer.style.display = "none";
        formSubmitted.style.display = "block";
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });

  submitAgainButton.addEventListener("click", () => {
    formContainer.style.display = "block";
    formSubmitted.style.display = "none";
  });
});
