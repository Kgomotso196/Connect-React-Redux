import axios from "axios";

const api = "https://randomuser.me/api/?results=5";

// Action Types
const FETCH_USERS_PENDING = "users/fetchUsersPending";
const FETCH_USERS_FULFILLED = "users/fetchUsersFulfilled";
const FETCH_USERS_REJECTED = "users/fetchUsersRejected";

// Action Creators
export const fetchUsersPending = () => ({
  type: FETCH_USERS_PENDING,
});

export const fetchUsersFulfilled = (users) => ({
  type: FETCH_USERS_FULFILLED,
  payload: users,
});

export const fetchUsersRejected = (error) => ({
  type: FETCH_USERS_REJECTED,
  payload: error,
});

// Async Action Creator (Thunk)
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    try {
      const response = await axios.get(api);
      dispatch(fetchUsersFulfilled(response.data.results));
    } catch (error) {
      dispatch(fetchUsersRejected(error.message));
    }
  };
};

// Initial State
const initialState = {
  isLoading: true,
  error: undefined,
  users: [],
};

// Reducer
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_USERS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case FETCH_USERS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
