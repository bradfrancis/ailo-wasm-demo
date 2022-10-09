import { SettingsPanel } from "./components/SettingsPanel";
import { ResultsGraph } from "./components/ResultsGraph";
import { useGlobalStore } from "./GlobalStore";
import { ResultsGraphProps } from "./types";
import { useMemo } from "react";

import "./App.css";

// PrimeReact styles
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

function App() {
  const { state } = useGlobalStore();

  const dataGroups = useMemo(
    () =>
      Object.entries(state?.results || {}).reduce((acc, [label, result]) => {
        acc.push({ label, ...result });

        return acc;
      }, [] as ResultsGraphProps["dataGroups"]) || [],
    [state?.results]
  );

  return (
    <div className="App">
      {state.settings && (
        <SettingsPanel
          settings={state.settings}
          loading={state?.benchmarkStarted ?? false}
        />
      )}
      <ResultsGraph dataGroups={dataGroups} />
    </div>
  );
}

export default App;
