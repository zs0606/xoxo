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


