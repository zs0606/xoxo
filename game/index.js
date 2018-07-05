import {Map} from 'immutable'
import { createStore } from 'redux';

//actions
const MOVE = 'MOVE'

//action creators
export const move =  (player, position)=>{
  return {
    type: MOVE,
    position: position,
    player: player
  };
}

//toggle Player
const togglePlayer = (currentPlayer) => {
  if (currentPlayer === "X") {
    return "O"
  }
  return "X";
}

const initialState= {
  board:Map(),
   turn: 'X'
 };

export default function gameReducer(state = initialState, action) {
  switch (action.type){
    case MOVE:
    return {board: state.board.setIn(action.position, action.player), turn: togglePlayer(action.player)}
    default:
    return state
  }
}

function streak(board, firstCoord, ...remainingCoords) {
    const value = board.getIn(firstCoord);

    for (let i = 0; i < remainingCoords.length; i++) {
        if (board.getIn(remainingCoords[i]) !== value) {
            return undefined;
        }
    }

    return value;
}



function winner(board) {
  //horizontal, same rows: [0,*]  [1,*] [2,*]
  for (let i = 0; i < 3; i++) {
    const result = streak(board, [i, 0], [i, 1], [i, 2])
    if (result) {
        return result;
    }
  }

  //vertical, same cols: [*,0] [*,1] [*,2]
  for (let j = 0; j < 3; j++) {
    const result = streak(board, [0, j], [1, j], [2, j])
    if (result) {
        return result;
    }
  }

  //2 diagonals
  const diagonal1 =streak(board, [0,0], [1,1], [2,2])
  if (diagonal1) return diagonal1
  const diagonal2 =streak(board, [2,0], [1,1], [0,2])
  if (diagonal2) return diagonal2


  //draw or ongoing?
  let count = 0;
  for (let k = 0; k < 3; k++) {
    for (let h = 0; h < 3; h++) {
        if (board.getIn([k,h])) {
            count++;
        }
    }
  }
  //draw
  if (count === 9) {
    return 'draw';
  }

  //ongoing
  return null
}

