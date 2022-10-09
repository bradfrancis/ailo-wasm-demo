import { Action, ActionType, GlobalStoreState } from "./types";

export const GlobalReducer = (
  state: GlobalStoreState,
  action: Action
): GlobalStoreState => {
  switch (action.type) {
    case ActionType.UPDATE_SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case ActionType.START_BENCHMARK:
      return {
        ...state,
        benchmarkStarted: true,
      };
    case ActionType.END_BENCHMARK: {
      return {
        ...state,
        benchmarkStarted: false,
        results: { ...action.payload },
      };
    }
    default:
      return state;
  }
};
