import React, { useState, useEffect, useRef } from "react";
import Column from "components/Column/Column";
import { Container, Draggable } from "react-smooth-dnd";
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import "./BoardContent.scss";
import { isEmpty } from "lodash";
import { initialData } from "actions/initialData";
import { mapOrder } from "ultilities/ultis";
import { applyDrag } from "../../ultilities/dnd";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [column, setColumn] = useState([]);
  const [isCreateInputOpen, setIsCreateInputOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const newColumnInputRef = useRef(null);

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

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
      newColumnInputRef.current.select();
    }
  }, [isCreateInputOpen]);

  if (isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }

  const onColumnDrop = (dropResult) => {
    let newColumn = [...column];
    newColumn = applyDrag(newColumn, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumn.map((c) => c.id);
    newBoard.columns = newColumn;
    setBoard(newBoard);
    setColumn(newColumn);

    // console.log(dropResult);
    // console.log(column);
    // console.log(newColumn);
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

  const handleToggleInput = () => {
    setIsCreateInputOpen(!isCreateInputOpen);
  };

  const handleOnCreate = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus();
      return;
    }

    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: [],
    };

    let newColumns = [...column];
    newColumns.push(newColumnToAdd);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((c) => c.id);
    newBoard.columns = newColumns;
    setBoard(newBoard);
    setColumn(newColumns);
    setNewColumnTitle("");
    setIsCreateInputOpen(false);
  };

  const onChangeInput = (e) => {
    setNewColumnTitle(e.target.value);
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
        </Container>
        <BootstrapContainer className="trello-container">
          {!isCreateInputOpen ? (
            <Row>
              <Col className="add-new-column" onClick={handleToggleInput}>
                <i className="fa fa-plus icon"></i>Add another column
              </Col>
            </Row>
          ) : (
            <Row>
              <Col className="enter-new-column">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Enter column title..."
                  className="input-enter-new-column"
                  ref={newColumnInputRef}
                  value={newColumnTitle}
                  onChange={onChangeInput}
                  onKeyDown={(e) => e.key === "Enter" && handleOnCreate()}
                />
                <Button variant="success" size="sm" onClick={handleOnCreate}>
                  Add column
                </Button>
                <span
                  className="cancel-add-new-column"
                  onClick={handleToggleInput}
                >
                  <i className="fa fa-close icon"></i>
                </span>
              </Col>
            </Row>
          )}
        </BootstrapContainer>
      </nav>
    </>
  );
};

export default React.memo(BoardContent);
