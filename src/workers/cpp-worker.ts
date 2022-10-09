import { expose } from "threads/worker";
import { runBenchmark } from "./runner";
import wasmGlue from "../wasm/sieve";
import { BenchmarkFn } from "./types";

const runCPPBenchmark: BenchmarkFn = async (iterations, max) => {
  const wasm = await wasmGlue({
    locateFile: (path: string) => {
      return "/" + path;
    },
  });

  return runBenchmark(iterations, max, wasm.sieveOfEratosthenes);
};

expose(runCPPBenchmark);
