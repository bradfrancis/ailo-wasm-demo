import React from "react";
import { Chart } from "primereact/chart";
import { Panel } from "primereact/panel";
import { ProgressSpinner } from "primereact/progressspinner";
import { useMemo } from "react";
import { ResultsGraphProps, ResultsGraphDataSet } from "../types";
import { useGlobalStore } from "../GlobalStore";
import "./ResultsGraph.css";

const PanelContent: React.FC<{ loading: boolean }> = ({ loading }) => {
  return loading ? (
    <ProgressSpinner />
  ) : (
    <p className="no-results-msg">No results</p>
  );
};

export const ResultsGraph: React.FC<ResultsGraphProps> = ({
  dataGroups,
  barColours,
}) => {
  const {
    state: { benchmarkStarted },
  } = useGlobalStore();

  const data = useMemo(
    () => ({
      labels: dataGroups.map((set) => set.label),
      datasets: [
        {
          label: "Min",
          data: dataGroups.map((group) => group.min),
          backgroundColor: barColours?.min,
        },
        {
          label: "Avg",
          data: dataGroups.map((group) => group.avg),
          backgroundColor: barColours?.avg,
        },
        {
          label: "Max",
          data: dataGroups.map((group) => group.max),
          backgroundColor: barColours?.max,
        },
      ] as ResultsGraphDataSet[],
    }),
    [dataGroups, barColours]
  );

  const hasData = useMemo(() => dataGroups?.length > 0, [dataGroups]);
  console.log({ hasData, data });

  return (
    <Panel header="Results" className="results-panel">
      {hasData && !benchmarkStarted ? (
        <Chart type="bar" data={data} />
      ) : (
        <PanelContent loading={benchmarkStarted} />
      )}
    </Panel>
  );
};
