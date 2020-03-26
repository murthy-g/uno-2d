var Game = function(socket, io) {
  this.socket = socket;
  this.io = io;

  this.handler = {
    deal_cards: deal_cards.bind(this)
  };
};

function deal_cards(number) {
  this.io.sockets.emit("num_cards_dealt", { status: "success", data: { number: number } });
}

module.exports = Game;
