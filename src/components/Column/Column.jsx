import React, { useState, useEffect } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { useTranslation } from "react-i18next";
import Card from "components/Card/Card";
import { mapOrder } from "ultilities/ultis";
import { Dropdown, Form } from "react-bootstrap";
import ConfirmModal from "components/Common/ConfirmModal";
import { MODAL_ACTION_CONFIRM } from "ultilities/constants";
import { saveContent, selectAllInlineText } from "ultilities/contentEditable";

import "./Column.scss";

const Column = (props) => {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");
  const { t } = useTranslation();
  const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

  // const onCardDrop = (card) => {
  //   console.log(card);
  // };

  const handleShowConfirmation = () =>
    setIsShowConfirmPopup(!isShowConfirmPopup);

  const handleActionConfirmPopup = (type) => {
    console.log(type);
    if (type === MODAL_ACTION_CONFIRM) {
      /**
       * *something stuff here
       */
      const newColumn = {
        ...column,
        _destroy: true,
      };
      onUpdateColumn(newColumn);
    }
    setIsShowConfirmPopup(!isShowConfirmPopup);
  };

  const handleColumnTitleChange = (e) => {
    setColumnTitle(e.target.value);
  };

  const handleColumnTitleBlur = (e) => {
    const newColumn = {
      ...column,
      title: columnTitle,
    };
    onUpdateColumn(newColumn);
  };

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  return (
    <>
      <div className="columns">
        <header className="column-drag-handle">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Enter column title..."
            className="trello-content-editable"
            value={columnTitle}
            onBlur={handleColumnTitleBlur}
            spellCheck="false"
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onKeyDown={saveContent}
            onMouseDown={(e) => e.preventDefault()}
          />
          <div className="column-dropdown-actions">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                size="sm"
                className="dropdown-btn"
              />

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShowConfirmation}>
                  {t("text.removeCard")}
                </Dropdown.Item>
                <Dropdown.Item>{t("text.moveAll")}</Dropdown.Item>
                <Dropdown.Item>{t("text.more")}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
        <div className="card-list">
          <Container
            groupName="col"
            // onDragStart={(e) => console.log("drag started", e)}
            // onDragEnd={(e) => console.log("drag end", e)}
            onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
            getChildPayload={(index) => cards[index]}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            // onDragEnter={() => {
            //   console.log("drag enter:", column.id);
            // }}
            // onDragLeave={() => {
            //   console.log("drag leave:", column.id);
            // }}
            // onDropReady={(p) => console.log("Drop ready: ", p)}
            dropPlaceholder={{
              animationDuration: 300,
              showOnTop: true,
              className: "column-drop-preview",
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {cards.map((card, index) => (
              <Draggable key={index}>
                <Card card={card} />
              </Draggable>
            ))}
          </Container>
        </div>
        <footer>
          <div className="footer-actions">
            <i className="fa fa-plus icon"></i>
            {t("text.addAnotherCard")}
          </div>
        </footer>
        {isShowConfirmPopup && (
          <ConfirmModal
            show={isShowConfirmPopup}
            onAction={handleActionConfirmPopup}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(Column);
