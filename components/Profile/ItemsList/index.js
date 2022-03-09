import React, { useState } from "react";
import CollectionItem from "./Item";
import SectionHeading from "./SectionHeading";

const CollectionItemsList = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <SectionHeading handleClick={toggleList} isOpen={isOpen}>
        {props.title}
      </SectionHeading>
      {/* Items in List*/}
      {isOpen && (
        <div className={`flex  w-full justify-around mb-4 h-12  `}>
          {props.items.map((item, idx) => (
            <CollectionItem
              key={idx}
              text={item.text}
              icon={item.icon}
              img={item.img}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CollectionItemsList;
