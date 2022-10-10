import React from "react";
import { InputNumber } from "primereact/inputnumber";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { useGlobalStore } from "../GlobalStore";
import { ActionType, GlobalStoreState } from "../types";
import "./SettingsPanel.css";

type InputNumberParams = Pick<
  React.ComponentProps<typeof InputNumber>,
  "min" | "max" | "step"
>;

export const SettingsPanel: React.FC<{
  settings: GlobalStoreState["settings"];
  loading: boolean;
}> = ({ settings, loading }) => {
  const { dispatch } = useGlobalStore();

  const maxInputParams: InputNumberParams = {
    min: 1000000,
    max: 500000000,
    step: 1000000,
  };

  const numRunsInputParams: InputNumberParams = {
    min: 0,
    max: 20,
  };

  const controls = [
    {
      element: (
        <InputNumber
          name="max"
          value={settings.max}
          onValueChange={(e) =>
            dispatch({
              type: ActionType.UPDATE_SETTINGS,
              payload: { ...settings, max: e.value || settings.max },
            })
          }
          showButtons
          {...maxInputParams}
        />
      ),
      id: "max",
      label: "Find Primes Up To",
    },
    {
      element: (
        <InputNumber
          name="numRuns"
          value={settings.iterations}
          onValueChange={(e) =>
            dispatch({
              type: ActionType.UPDATE_SETTINGS,
              payload: { ...settings, iterations: e.value || settings.max },
            })
          }
          showButtons
          {...numRunsInputParams}
        />
      ),
      id: "numRuns",
      label: "Number of Iterations",
    },
  ];

  return (
    <Panel header="Settings" className="settings-panel">
      <div className="grid p-fluid">
        {controls.map(({ element, id, label }) => {
          return (
            <div key={id} className="col-12 md:col-4">
              <label htmlFor={id}>{label}</label>
              <div className="p-inputgroup">{element}</div>
            </div>
          );
        })}
        <Button
          label="Run"
          loading={loading}
          onClick={() => dispatch({ type: ActionType.START_BENCHMARK })}
        />
      </div>
    </Panel>
  );
};
