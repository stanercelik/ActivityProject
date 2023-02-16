export const SET_ACTIVITY_DATE = 'SET_ACTIVITY_DATE';
export const SET_ACTIVITY = 'SET_ACTIVITY';

export const SetActivityDate = activityDate => {
  return {
    type: SET_ACTIVITY_DATE,
    payload: activityDate,
  };
};

export const SetActivity = activity => {
  return {
    type: SET_ACTIVITY,
    payload: activity,
  };
};
