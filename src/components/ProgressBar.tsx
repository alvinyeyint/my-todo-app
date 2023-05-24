import { useState, useEffect } from 'react'
import { useGetTodos } from '@queries/TodoTasks';
import './ProgressBar.css';

const ProgressBar = () => {
  const [ percentage, setPercentage ] = useState(0);
  const { data: todos } = useGetTodos();

  let doneTasks = todos?.filter(item => item.completed).length ?? 0
  let total = todos?.length ?? 0

  useEffect(() => {
    setPercentage((doneTasks / total) * 100)
    return () => {
      setPercentage(0)
    }
  }, [todos])
  console.log(percentage)

  // const progress = useMemo(
  //   () => precentCalculate(),
  //   [todos]
  // );

  
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
