import React, { useState, useEffect } from "react";
import Column from "components/Column/Column";
import { Container, Draggable } from "react-smooth-dnd";
import "./BoardContent.scss";
import { isEmpty } from "lodash";
import { initialData } from "actions/initialData";
import { mapOrder } from "ultilities/ultis";
import { applyDrag } from "../../ultilities/dnd";

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
    let newColumn = [...column];
    newColumn = applyDrag(newColumn, dropResult);
    setColumn(newColumn);
    console.log(column);
    console.log(newColumn);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumn.map((c) => c.id);
    newBoard.columns = newColumn;
    setBoard(newBoard);
  };

  const onCardDrop = (columnId, dropResult) => {
    //log history when change column
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumn = [...column];

      let curColumn = newColumn.find((c) => c.id === columnId);

      curColumn.cards = applyDrag(curColumn.cards, dropResult);
      curColumn.cardOrder = curColumn.cards.map((i) => i.id);

      setColumn(newColumn);
    }
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
          getChildPayload={(index) => column[index]}
        >
          {column.map((column, index) => (
            <Draggable key={index}>
              <Column column={column} onCardDrop={onCardDrop} />
            </Draggable>
          ))}
          <div className="add-new-column">
            <i className="fa fa-plus icon"></i>Add another column
          </div>
        </Container>
      </nav>
    </>
  );
};

export default React.memo(BoardContent);
