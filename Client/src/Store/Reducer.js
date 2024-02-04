import { combineReducers } from 'redux';

const userNameReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USERNAME':
        return action.payload;
      default:
        return state;
    }
  };

  const taskReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TASK':
        return action.payload;
      default:
        return state;
    }
  };

  const ataskReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ATASK':
        return action.payload;
      default:
        return state;
    }
  };

  const usersReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USERS':
        return action.payload;
      default:
        return state;
    }
  };

  const statusReducer = (state = false, action) => {
    switch (action.type) {
      case 'SET_STATUS':
        return action.payload;
      default:
        return state;
    }
  };

//   const initialState = {
//     loginStatus: false, // Initial login status
//   };
  
//   const loginStatusReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SET_LOGIN_STATUS':
//         return {
//           ...state,
//           loginStatus: action.payload,
//         };
//       default:
//         return state;
//     }
//   };

  const rootReducer = combineReducers({
    userName: userNameReducer,
    task: taskReducer,
    users: usersReducer,
    atask: ataskReducer,
    status : statusReducer
  });

  export default rootReducer;