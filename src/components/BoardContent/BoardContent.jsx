import React, { useState, useEffect } from "react";
import Column from "components/Column/Column";
import "./BoardContent.scss";
import { isEmpty } from "lodash";
import { initialData } from "actions/initialData";
import { mapOrder } from "ultilities/ultis";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [column, setColumn] = useState([]);

  useEffect(() => {
    const getBoardFromDB = initialData.boards.find(
      (board) => board.id === "board-1"
    );
    if (getBoardFromDB) {
      setBoard(getBoardFromDB);

      setColumn(
        mapOrder(getBoardFromDB.columns, getBoardFromDB.columnOrder, "id")
      );
    }
  }, []);

  if (isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }

  return (
    <>
      <nav className="workspace">
        {column.map((column, index) => (
          <Column key={index} column={column} />
        ))}
      </nav>
    </>
  );
};

export default React.memo(BoardContent);
