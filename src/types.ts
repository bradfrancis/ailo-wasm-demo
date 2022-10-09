import { Dispatch } from "react";
import { BenchmarkResult } from "./workers/types";

export interface GlobalStoreState {
  settings: {
    iterations: number;
    max: number;
  };
  benchmarkStarted: boolean;
  results: Record<string, BenchmarkResult>;
}

export enum ActionType {
  UPDATE_SETTINGS,
  START_BENCHMARK,
  END_BENCHMARK,
}

export type Action =
  | { type: ActionType.START_BENCHMARK }
  | { type: ActionType.END_BENCHMARK; payload: Exclude<GlobalStoreState['results'], undefined> }
  | { type: ActionType.UPDATE_SETTINGS; payload: GlobalStoreState["settings"] };

export interface GlobalStoreReturn {
  state: GlobalStoreState;
  dispatch: Dispatch<Action>;
}

type ResultsGraphDataGroup = {
  label: string;
  min: number;
  max: number;
  avg: number;
};

export interface ResultsGraphProps {
  dataGroups: ResultsGraphDataGroup[];
  barColours?: { min: string; max: string; avg: string };
}

export interface ResultsGraphDataSet {
  label: string;
  data: number[];
  fill?: boolean;
  borderColor?: string;
}
