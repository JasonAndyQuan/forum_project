const timeAgo = (timestamp) => {
  const inputDate = new Date(timestamp.split("T")[0]);
  const currentDate = new Date();
  inputDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  const diffInTime = currentDate - inputDate;
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

  if (diffInDays === 0){
    return "Today"
  }
  if (diffInDays === 1){
    return "Yesterday"
  }
  return `${diffInDays} days ago`;
};
export default timeAgo;
