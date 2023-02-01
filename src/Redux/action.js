export const SET_TIMER = 'SET_TIMER';
export const SET_ACTIVITY = 'SET_ACTIVITY';

export const SetTimer = timer => {
  return {
    type: SET_TIMER,
    payload: timer,
  };
};

export const SetActivity = activity => {
  return {
    type: SET_ACTIVITY,
    payload: activity,
  };
};
