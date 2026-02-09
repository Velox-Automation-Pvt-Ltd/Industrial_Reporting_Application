import IconButton from "./IconButton";
import Iconify from "./Iconify";

interface AddButtonProps {
  onClick: () => void;
  title?: string;
}

const AddButton = ({ onClick, title = "Add New" }: AddButtonProps) => {
  return (
    <IconButton className="p-4" onClick={onClick} title="Add ">
      <Iconify icon={"mdi:plus"} size={24} /> &nbsp;
      <span className="text-sm">{title}</span>
    </IconButton>
  );
};

export default AddButton;
