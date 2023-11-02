results = {}

import timeit
import sys

results["time.time()"] = timeit.timeit(setup="import time; fn=time.time", stmt="fn()")
results["datetime.now().timestamp()"] = timeit.timeit(
    setup="import datetime; fn=datetime.datetime.now", stmt="fn().timestamp()"
)
results["datetime.now()"] = timeit.timeit(
    setup="import datetime; fn=datetime.datetime.now", stmt="fn()"
)

results["datetime.now(timezone.UTC)"] = timeit.timeit(
    setup="import datetime, pytz; fn=datetime.datetime.now", stmt="fn(pytz.UTC)"
)
results["datetime.now(tz)"] = timeit.timeit(
    setup="import datetime, pytz; a_timezone = pytz.timezone('America/Los_Angeles'); fn=datetime.datetime.now",
    stmt="fn(a_timezone)",
)

import time

print(f"{time.time()} -vs- {time.perf_counter()}")

results_sorted = sorted(results.items(), key=lambda t: t[1])

for name, result_s in results_sorted:
    print(f"{name},{result_s}")
