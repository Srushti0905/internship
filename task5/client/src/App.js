import { useState } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Review from "./components/Review";
import ProgressBar from "./components/Progress";
import "./styles.css";

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input, value) => {
    setFormData({ ...formData, [input]: value });
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1>Onboarding Form</h1>

        <ProgressBar step={step} />

        {step === 1 && (
          <Step1
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        )}

        {step === 2 && (
          <Step2
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 3 && (
          <Review
            formData={formData}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}

        {step === 4 && (
          <div style={{ textAlign: "center" }}>
            <h2>🎉 Form Submitted Successfully!</h2>
            <p>Thank you for your submission.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;