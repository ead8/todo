import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
export const getTimeAgo = (timestamp) => {
  // const now = new Date();
  // const taskTime = new Date(timestamp);
  // const diffInSeconds = Math.floor((now - taskTime) / 1000);
  // if (diffInSeconds < 60) return "a few seconds ago";
  // if (diffInSeconds < 3600)
  //   return `${Math.floor(diffInSeconds / 60)} minute${
  //     Math.floor(diffInSeconds / 60) > 1 ? "s" : ""
  //   } ago`;
  // if (diffInSeconds < 86400)
  //   return `${Math.floor(diffInSeconds / 3600)} hour${
  //     Math.floor(diffInSeconds / 3600) > 1 ? "s" : ""
  //   } ago`;
  // return `${Math.floor(diffInSeconds / 86400)} day${
  //   Math.floor(diffInSeconds / 86400) > 1 ? "s" : ""
  // } ago`;
  const now = dayjs();
  const taskTime = dayjs(timestamp);
  return taskTime.fromNow();
};

export const getSubtaskCount = (parentTask, getGroupedTasks) => {
  let totalSubtasks = 0;

  const countSubtasks = (task) => {
    const subTasks = getGroupedTasks(task._id, true); // Get all subtasks
    if (!subTasks || subTasks.length === 0) return;

    totalSubtasks += subTasks.length; // Count all direct subtasks

    subTasks.forEach(countSubtasks); // Recursively count nested subtasks
  };

  countSubtasks(parentTask);

  // Total count includes the parent task itself
  const totalCount = totalSubtasks + 1;

  return `${totalSubtasks}/${totalCount}`;
};

export const getTimeColor = (createdAt) => {
  const now = dayjs();
  const createdTime = dayjs(createdAt);
  const diffInMinutes = now.diff(createdTime, "minute");

  if (diffInMinutes < 1) return "text-red-500"; // Less than a minute ago
  if (diffInMinutes < 5) return "text-yellow-500"; // Less than 5 minutes ago
  return "text-green-500"; // More than 5 minutes ago
};
// const toggleExpand = (taskId) => {
//     setExpandedTasks((prev) => ({
//         ...prev,
//         [taskId]: !prev[taskId],
//     }));
// };
// const getCompletionStatus = (task) => {
//     if (!task.subTasks || task.subTasks.length === 0) return null;
//     const completed = task.subTasks.filter((subTask) => subTask.completed).length;
//     return `${completed}/${task.subTasks.length}`;
// };
//get completed task
// const getCompletionStatus = (parentTask, getGroupedTasks) => {
//     const subTasks = getGroupedTasks(parentTask._id, true); // Get all subtasks (including completed ones)

//     if (!subTasks || subTasks.length === 0) return null; // No subtasks, no progress tracking

//     let completedCount = 0;
//     let totalCount = 0;

//     const countCompletion = (task) => {
//         totalCount++; // Count every task
//         if (task.completed) completedCount++; // Count completed tasks

//         const nestedSubtasks = getGroupedTasks(task._id, true); // Get deeper subtasks
//         if (nestedSubtasks && nestedSubtasks.length > 0) {
//             nestedSubtasks.forEach(countCompletion); // Recursively check completion
//         }
//     };

//     subTasks.forEach(countCompletion); // Start counting from direct subtasks

//     return completedCount === totalCount ? "Completed" : `${completedCount}/${totalCount}`;
// };
// const getSubtaskCount = (parentTask, getGroupedTasks) => {
//     const subTasks = getGroupedTasks(parentTask._id, true); // Get all subtasks

//     if (!subTasks || subTasks.length === 0) return null; // No subtasks, no count

//     let totalCount = 0;
//     let directCount = subTasks.length;

//     const countSubtasks = (task) => {
//         totalCount++; // Count the current subtask
//         const nestedSubtasks = getGroupedTasks(task._id, true); // Get deeper subtasks
//         if (nestedSubtasks && nestedSubtasks.length > 0) {
//             nestedSubtasks.forEach(countSubtasks); // Recursively count nested subtasks
//         }
//     };

//     subTasks.forEach(countSubtasks); // Start counting from direct subtasks

//     return `${directCount}/${totalCount}`;
// };
