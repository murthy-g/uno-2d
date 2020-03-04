import React from "react";
import data from "./data";
import { DragDropContext } from "react-beautiful-dnd";

import PlayableRegion from "./PlayableRegion";

class TestScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = data;
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const playableRegion = this.state.playableRegions[source.droppableId];
    const newCardIds = [...playableRegion.cards];
    newCardIds.splice(source.index, 1);
    newCardIds.splice(destination.index, 0, draggableId);

    const newPlayableRegion = {
      ...playableRegion,
      cards: newCardIds
    };

    this.setState({
      playableRegions: {
        ...this.state.playableRegions,
        [newPlayableRegion.id]: newPlayableRegion
      }
    });
  };

  render = () => (
    <>
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.playableRegionsOrder.map(regionId => {
          const playableRegion = this.state.playableRegions[regionId];
          const playerCards = playableRegion.cards.map(
            cardId => this.state.cards[cardId]
          );
          return (
            <PlayableRegion
              key={playableRegion.id}
              playableRegion={playableRegion}
              cards={playerCards}
            />
          );
        })}
      </DragDropContext>
    </>
  );
}

export default TestScene;
