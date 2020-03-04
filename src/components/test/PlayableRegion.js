import React from "react";
import "./PlayableRegion.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";

const PlayableRegion = ({ playableRegion, cards }) => (
  <div className="playable-region">
    {playableRegion.title}
    <Droppable droppableId={playableRegion.id} direction="horizontal">
      {/* render props pattern */}
      {/* provided is an OBJECT has a property called droppableProps that needs to be applied to the component that is droppable */}
      {/* provided.innerRef is a function used to supply the dom node of the droppable component to react dnd*/}
      {/* provided.placeholder increase available space, needs to be added as the child of the droppable component */}
      {provided => (
        <div
          ref={provided.innerRef}
          className="cards-container"
          {...provided.droppableProps}
        >
          {cards.map((card, index) => (
            <Draggable key={card.id} draggableId={card.id} index={index}>
              {provided => (
                <div
                  className="card"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {card.title}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default PlayableRegion;
