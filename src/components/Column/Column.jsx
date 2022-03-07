import React from "react";
import Task from "components/Task/Task";

import "./Column.scss";

const Column = () => {
  return (
    <>
      <div className="columns">
        <header>Brainstorm </header>
        <ul className="task-list">
          <Task />
          <Task />
          <Task />
          <Task />
          <li className="task-item">Add everything you want </li>
          <li className="task-item">Add everything you want </li>
          <li className="task-item">Add everything you want </li>
          <li className="task-item">Add everything you want </li>
        </ul>
        <footer>Add another card</footer>
      </div>
    </>
  );
};

export default React.memo(Column);
