function Step1({ formData, handleChange, nextStep }) {
    return (
      <div>
        <h2>Step 1</h2>
  
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
  
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
  
        <button onClick={nextStep}>Next</button>
      </div>
    );
  }
  
  export default Step1;