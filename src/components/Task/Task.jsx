import React from "react";

import "./Task.scss";

const Task = () => {
  return (
    <>
        <li className="task-item">
          <img
            src="https://o.rada.vn/data/image/2021/08/21/Yae-Genshin-Impact-7.jpg"
            alt="yae miko"
          />
          TITLE: YAE MIKO
        </li>
    </>
  );
};

export default React.memo(Task);
