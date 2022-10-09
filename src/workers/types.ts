export interface BenchmarkResult {
  avg: number;
  max: number;
  min: number;
}

export type BenchmarkFn = (
  iterations: number,
  max: number
) => Promise<BenchmarkResult>;
