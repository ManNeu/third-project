import {
  GET_CONSUMERS,
  ADD_CONSUMER,
  DELETE_CONSUMER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONSUMER,
  FILTER_CONSUMERS,
  CLEAR_FILTER,
  CONSUMER_ERROR,
  CLEAR_CONSUMERS,
} from "../types";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_CONSUMERS:
      return {
        ...state,
        consumers: action.payload,
        loading: false,
      };
    case ADD_CONSUMER:
      return {
        ...state,
        consumers: [action.payload, ...state.consumers],
        loading: false,
      };
    case UPDATE_CONSUMER:
      return {
        ...state,
        consumers: state.consumers.map((consumer) =>
          consumer._id === action.payload._id ? action.payload : consumer
        ),
        loading: false,
      };
    case DELETE_CONSUMER:
      return {
        ...state,
        consumers: state.consumers.filter(
          (consumer) => consumer._id !== action.payload
        ),
        loading: false,
      };
    case CLEAR_CONSUMERS:
      return {
        ...state,
        consumers: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_CONSUMERS:
      return {
        ...state,
        filtered: state.consumers.filter((consumer) => {
          //creating regular expression and using gi to match irrespective of the case sensetive
          const regex = new RegExp(`${action.payload}`, "gi");

          //will return anything that matches the text passed in
          return (
            (consumer.first_name + " " + consumer.last_name).match(regex) ||
            // consumer.last_name.match(regex) ||
            consumer.email.match(regex) ||
            consumer.type.match(regex) ||
            consumer.date.match(regex) ||
            (consumer.type + " " + consumer.date).match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case CONSUMER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
