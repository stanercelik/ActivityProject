import {SET_ACTIVITY, SET_ACTIVITY_DATE} from './action';

const initialState = {
  timer: '',
  activity: 'No Activity',
};

export default function activityReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVITY_DATE:
      return {...state, activityDate: action.payload};

    case SET_ACTIVITY:
      return {...state, activity: action.payload};

    default:
      return state;
  }
}
