import { expose } from "threads";
import { runBenchmark } from "./runner";
import { BenchmarkFn } from "./types";

function sieveOfEratosthenes(n: number) {
  const primes = Array(n + 1).fill(true);

  for (let p = 2; p * p <= n; p++) {
    if (primes[p]) {
      for (let i = p * p; i <= n; i += p) {
        primes[i] = false;
      }
    }
  }

  return Promise.resolve(
    primes.map((isPrime, i) => (isPrime ? i : 0)).filter((prime) => !!prime)
  );
}

const runJSBenchmark: BenchmarkFn = async (iterations, max) => {
  return runBenchmark(iterations, max, sieveOfEratosthenes);
};

expose(runJSBenchmark);
