import {SET_ACTIVITY, SET_TIMER} from './action';

const initialState = {
  timer: '',
  activity: 'No Activity',
};

export default function activityReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TIMER:
      return {...state, timer: action.payload};

    case SET_ACTIVITY:
      return {...state, activity: action.payload};

    default:
      return state;
  }
}
