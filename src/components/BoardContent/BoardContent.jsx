import React, { useState, useEffect } from "react";
import Column from "components/Column/Column";
import { Container, Draggable } from "react-smooth-dnd";
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

  const onColumnDrop = (dropResult) => {
    console.log(dropResult);
  };

  return (
    <>
      <nav className="workspace">
        <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "cards-drop-preview",
          }}
          getChildPayload={index => column[index]}
        >
          {column.map((column, index) => (
            <Draggable key={index}>
              <Column column={column} />
            </Draggable>
          ))}
        </Container>
      </nav>
    </>
  );
};

export default React.memo(BoardContent);
