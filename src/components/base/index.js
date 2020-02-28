import React, {createRef} from 'react';
import './index.css';
import * as uuid from 'uuid';

class BaseScene extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.generateCards = this.generateCards.bind(this);
    this.cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.rows = [0, 1, 2, 3, 4, 5, 6, 7];
    this.players = 0;
    this.playCards = 0;
    this.storeCards = [];
    this.state = {
      saveCards: [],
    };
    this.cardRef = createRef();
    this.playerRef = createRef();
  }

  componentDidMount() {
    this.generateCssBackgroundSize();
  }

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateCards() {
    let storeCards = [];
    this.setState(
      {saveCards: [], playCards: this.cardRef.current.value},
      () => {
        for (let i = 0; i < this.playerRef.current.value; i++) {
          for (let j = 0; j < this.state.playCards; j++) {
            const randomNum = this.randomIntFromInterval(
              0,
              this.storeCards.length
            );
            // console.log(this.storeCards[randomNum]);
            storeCards.push(this.storeCards[randomNum]);
          }
        }
        this.setState({
          saveCards: storeCards,
        });
      }
    );
  }

  generateCssBackgroundSize = () => {
    this.rows.forEach(row => {
      this.cols.forEach(col => {
        this.storeCards.push(
          <div
            className="sprite"
            key={
              Math.random()
                .toString(36)
                .substring(7) + uuid.v4()
            }
            style={{
              width: '40px',
              height: '80px',
              backgroundPosition: `${col * 7.75}% ${row * 14.3}%`,
            }}
          ></div>
        );
      });
    });
  };

  render() {
    return (
      <div>
        Enter Number of Cards:{' '}
        <input type="text" id="cards" ref={this.cardRef} />
        Enter Number of Players:{' '}
        <input type="text" id="players" ref={this.playerRef} />
        <button onClick={this.generateCards}>Generate</button>
        <br />
        {this.state.saveCards.map(card => card)}
      </div>
    );
  }
}

export default BaseScene;
