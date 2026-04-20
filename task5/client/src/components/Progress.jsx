function ProgressBar({ step }) {
    const percent = (step / 3) * 100;
  
    return (
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    );
  }
  
  export default ProgressBar;