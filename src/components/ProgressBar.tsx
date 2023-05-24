import './ProgressBar.css';

const ProgressBar = ({percentage, doneTasks}: {percentage: number, doneTasks: number}) => {
  
  return (
    <>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="progress-status">{doneTasks} completed</p>
    </>
  );
};

export default ProgressBar;
