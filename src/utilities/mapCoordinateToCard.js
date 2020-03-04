const getColor = row => {
  switch (row) {
    case 0:
      return "green";
    case 1:
      return "blue";
    case 2:
      return "red";
    case 3:
      return "yellow";
    default:
      return;
  }
};

const getType = col => {
  switch (col) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return col;
    case 10:
      return "draw-2";
    case 11:
      return "skip";
    case 12:
      return "reverse";
    case 13:
      return "draw-4";
    case 14:
      return "wild";
    default:
      return "wild";
  }
};

const mapCoordinateToCard = (row, col) => {
  let id;
  if (col <= 12) {
    id = `${getColor(row)}-${getType(col)}`;
  } else {
    id = getType(col);
  }
  return id;
};

export default mapCoordinateToCard;
