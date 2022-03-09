import React from "react";
import IconButtonsGroup from "../../UI/IconButtonsGroup";
import IconButton from "../../UI/IconButton";
import { FiSearch, FiPlus } from "react-icons/fi";

const FloatingIconButtons = () => {
  return (
    <IconButtonsGroup orientation="vertical">
      <IconButton>
        <FiSearch style={{ fontSize: 24 }} />
      </IconButton>
      <IconButton>
        <FiPlus style={{ fontSize: 24 }} />
      </IconButton>
    </IconButtonsGroup>
  );
};

export default FloatingIconButtons;

{
  /* <IconButtonsGroup>
  <IconButton>
    <FcSearch />
  </IconButton>
  <IconButton>
    <FaPlus />
  </IconButton>
</IconButtonsGroup>; */
}
