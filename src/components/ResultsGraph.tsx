import { Chart } from "primereact/chart";
import { Panel } from "primereact/panel";
import { useMemo } from "react";
import { ResultsGraphProps, ResultsGraphDataSet } from "../types";

export const ResultsGraph: React.FC<ResultsGraphProps> = ({
  dataGroups,
  barColours,
}) => {
  const data = useMemo(
    () => ({
      labels: dataGroups.map((set) => set.label),
      datasets: [
        {
          label: "Min",
          data: dataGroups.map((group) => group.min),
          fill: false,
          borderColor: barColours?.min,
        },
        {
          label: "Avg",
          data: dataGroups.map((group) => group.avg),
          fill: false,
          borderColor: barColours?.avg,
        },
        {
          label: "Max",
          data: dataGroups.map((group) => group.max),
          fill: false,
          borderColor: barColours?.max,
        },
      ] as ResultsGraphDataSet[],
    }),
    [dataGroups, barColours]
  );

  return (
    <Panel header="Results">
      <Chart type="bar" data={data} />
    </Panel>
  );
};
