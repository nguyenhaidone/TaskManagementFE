import React from "react";
import Column from "components/Column/Column";
import "./BoardContent.scss";

const BoardContent = () => {
  return (
    <>
      <nav className="workspace">
        <Column />
        <Column />
        <Column />
        <Column />
      </nav>
    </>
  );
};

export default React.memo(BoardContent);
