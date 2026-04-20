function Step2({ formData, handleChange, nextStep, prevStep }) {
    return (
      <div>
        <h2>Step 2</h2>
  
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
        />
  
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
        />
  
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    );
  }
  
  export default Step2;