import {Map} from 'immutable'
import { createStore } from 'redux';

//actions
const MOVE = 'MOVE'

//action creators
export const move =  (player, position)=>{
  return {
    type: MOVE,
    board: position,
    turn: player
  };
}

//toggle Player
const togglePlayer = (currentPlayer) => {
  if (currentPlayer === "X") {
    return "O"
  }
  return "X";
}

const initialState= {board:[0,0], turn: 'X'};

export default function gameReducer(state = initialState, action) {
  switch (action.type){
    case MOVE:
    return {board: action.position, turn: togglePlayer(action.turn)}
    default:
    return state
  }
}


