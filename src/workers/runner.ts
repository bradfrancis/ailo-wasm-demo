export const runBenchmark = async (
  iterations: number,
  max: number,
  benchmarkFn: (max: number) => Promise<number[]>
) => {
  const durations = await Promise.all(
    Array(iterations)
      .fill(0)
      .map(async () => {
        const start = Date.now();
        await benchmarkFn(max);
        const finish = Date.now();

        return (finish - start) / 1000;
      })
  );

  const avgDuration =
    durations.reduce((acc, val) => (acc += val), 0) / iterations;
  const maxDuration = Math.max(...durations);
  const minDuration = Math.min(...durations);

  return {
    avg: avgDuration,
    max: maxDuration,
    min: minDuration,
  };
};
