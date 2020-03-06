import React from "react";
import { CardContainer } from "../../card";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./YourRegion.scss";

const YourRegion = ({ yourCards, allCards }) => (
  <div className="yr-container">
    <Droppable droppableId="your-region" direction="horizontal">
      {provided => (
        <CardContainer innerRef={provided.innerRef} {...provided.droppableProps}>
          {yourCards.map((id, index) => (
            <Draggable key={id} draggableId={id} index={index}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {allCards[id].card}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </CardContainer>
      )}
    </Droppable>
  </div>
);

export default YourRegion;
