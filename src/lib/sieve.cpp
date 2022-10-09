#include <emscripten/bind.h>
#include <iostream>
#include "sieve.h"

using namespace std;

// EMSCRIPTEN_KEEPALIVE
vector<int> sieveOfEratosthenes(int max)
{
    vector<bool> primes = vector<bool>(max + 1, true);

    for (int p = 2; p * p <= max; p++)
    {
        if (primes[p])
        {
            for (int i = p * p; i <= max; i += p)
            {
                primes[i] = false;
            }
        }
    }

    vector<int> results = vector<int>();
    int length = primes.size();
    for (int i = 2; i < length; i++)
    {
        if (primes[i])
        {
            results.push_back(i);
        }
    }

    // std::cout << "First prime: " << results.at(0) << "\n";
    // std::cout << "Last prime: " << results.back() << "\n";
    // std::cout << "Num primes: " << results.size() << "\n";

    return results;
}

using namespace emscripten;

EMSCRIPTEN_BINDINGS(my_module)
{
    emscripten::register_vector<int>("VectorInt");
    emscripten::function("sieveOfEratosthenes", &sieveOfEratosthenes);
}