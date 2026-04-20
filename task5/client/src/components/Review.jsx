function Review({ formData, prevStep, nextStep }) {
    const handleSubmit = async () => {
      try {
        const res = await fetch("http://localhost:5000/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
        alert(data.message);
        console.log("Submitted successfully");
        nextStep(); // ✅ move to success screen
      } catch (err) {
        console.error(err);
        alert("Error submitting form");
      }
    };
  
    return (
      <div>
        <h2>Review</h2>
  
        <p>{formData.name}</p>
        <p>{formData.email}</p>
        <p>{formData.company}</p>
        <p>{formData.role}</p>
  
        <button onClick={prevStep}>Back</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  }
  
  export default Review;