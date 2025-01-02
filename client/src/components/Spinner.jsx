import { CgSpinner } from "react-icons/cg";
const Spinner = ({ msg }) => {
  return (
    <div className="flex items-center justify-center gap-2 animate-bounce">
      <CgSpinner className="animate-spin text-4xl" />
      <h1 className="text-2xl"> {msg} </h1>
      <CgSpinner className="animate-spin text-4xl" />
    </div>
  );
};
export default Spinner;
