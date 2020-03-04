import React, { createRef } from "react";
import "./index.css";
import * as uuid from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Card, CardContainer } from "../card";
import { mapCoordinateToCard, getRandomInt } from "../../utilities";
import { coordinates } from "../../data";

class BaseScene extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.generateCards = this.generateCards.bind(this);
    this.coordinates = coordinates;
    this.players = 0;
    this.playCards = 0;
    this.storeCards = [];
    this.state = {
      saveCards: []
    };
    this.cardRef = createRef(); // number of cards per hand
    this.playerRef = createRef(); // number of players
  }

  componentDidMount() {
    this.generateCssBackgroundSize();
  }

  generateCards() {
    let storeCards = [];
    const totalNumberOfCards =
      this.playerRef.current.value * this.state.playCards;

    for (let i = 0; i < totalNumberOfCards; i++) {
      storeCards.push(getRandomInt(0, this.storeCards.length - 1));
    }

    this.setState({
      saveCards: storeCards,
      playCards: this.cardRef.current.value
    });
  }

  generateCssBackgroundSize = () => {
    this.storeCards = this.coordinates.map(coordinate => {
      return {
        id: mapCoordinateToCard(coordinate.y, coordinate.x),
        card: <Card x={coordinate.x * 100} y={coordinate.y * 150} />
      };
    });
  };

  // TODO: update state to persist drag & drop reordering
  // This is a required callback
  onDragEnd = result => {};

  render() {
    return (
      <div>
        Enter Number of Cards:{" "}
        <input type="text" id="cards" ref={this.cardRef} />
        Enter Number of Players:{" "}
        <input type="text" id="players" ref={this.playerRef} />
        <button onClick={this.generateCards}>Generate</button>
        <br />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="playing-region" direction="horizontal">
            {provided => (
              <CardContainer
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                {this.state.saveCards.map((randomNum, index) => (
                  <Draggable
                    key={this.storeCards[randomNum].id}
                    draggableId={this.storeCards[randomNum].id}
                    index={index}
                  >
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {this.storeCards[randomNum].card}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </CardContainer>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default BaseScene;
