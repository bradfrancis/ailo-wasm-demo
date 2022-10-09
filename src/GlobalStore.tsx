import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { Worker, Thread, spawn } from "threads";
import { GlobalReducer } from "./GlobalReducer";
import { ActionType, GlobalStoreReturn, GlobalStoreState } from "./types";
import { BenchmarkFn } from "./workers/types";

const StoreContext = createContext<GlobalStoreReturn>({} as GlobalStoreReturn);

const initialState: GlobalStoreState = {
  settings: { iterations: 3, max: 100000000 },
  benchmarkStarted: false,
  results: {},
};

export const GlobalStore: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);
  const benchmarkInProgress = useRef(false);

  useEffect(() => {
    const startBenchmark = async () => {
      const jsBenchmarkFn = await spawn<BenchmarkFn>(
        new Worker("./workers/js-worker.ts")
      );

      const cppBenchmarkFn = await spawn<BenchmarkFn>(
        new Worker("./workers/cpp-worker")
      );

      const promises = [jsBenchmarkFn, cppBenchmarkFn].map((benchmarkFn) =>
        benchmarkFn(state.settings.iterations, state.settings.max)
      );

      const [jsResult, cppResult] = await Promise.all(promises);

      await Promise.all([
        Thread.terminate(cppBenchmarkFn),
        Thread.terminate(jsBenchmarkFn),
      ]);

      dispatch({
        type: ActionType.END_BENCHMARK,
        payload: { JS: jsResult, "WASM (C++)": cppResult },
      });
    };

    if (state.benchmarkStarted && !benchmarkInProgress.current) {
      benchmarkInProgress.current = true;

      startBenchmark();

      benchmarkInProgress.current = false;
    }
  }, [state.benchmarkStarted, state.settings]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useGlobalStore = () => useContext(StoreContext);
