import React from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { useTranslation } from "react-i18next";
import Card from "components/Card/Card";
import { mapOrder } from "ultilities/ultis";

import "./Column.scss";

const Column = (props) => {
  const { column, onCardDrop } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");
  const { t } = useTranslation();

  // const onCardDrop = (card) => {
  //   console.log(card);
  // };

  return (
    <>
      <div className="columns">
        <header className="column-drag-handle">{column.title} </header>
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
      </div>
    </>
  );
};

export default React.memo(Column);
