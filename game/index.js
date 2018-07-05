import {Map} from 'immutable'
import { createStore } from 'redux';

const MOVE = 'MOVE'

export const move =  (player, position)=>{
  return {
    type: MOVE,
    position: position,
    player: player
  };
}

const initialState= {position:[], player: 'X'};

export default function reducer(state = initialState, action) {
  switch (action.type){
    case MOVE:
    return {position: action.position, player: action.player}
    default:
    return state
  }
}

