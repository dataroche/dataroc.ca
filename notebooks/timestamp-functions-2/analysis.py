# %%

import pandas as pd

data = pd.read_csv("analysis_time_2_data.csv")

# %%

ubuntu_20 = data[data["machine"] == "Ubuntu 20"]
wsl2 = data[data["machine"] == "WSL2"]
windows_10 = data[data["machine"] == "Windows 10"]

# %%

# Compare each, py3.10 vs 3.12

import plotly.express as px

px.bar(
    ubuntu_20,
    x="fn",
    y="time_s",
    color="python",
    log_y=True,
    barmode="group",
    title="Ubuntu 20 native",
)
# %%

px.bar(
    wsl2,
    x="fn",
    y="time_s",
    color="python",
    log_y=True,
    barmode="group",
    title="WSL2",
)
# %%

px.bar(
    windows_10,
    x="fn",
    y="time_s",
    color="python",
    log_y=True,
    barmode="group",
    title="Windows 10",
)
# %%

data_by_fn_arch = data[["fn", "time_s", "machine"]].groupby(["machine", "fn"]).mean()
data_by_fn_arch = data_by_fn_arch.sort_index().reset_index()
data_by_fn_arch.sort_values(["time_s"], inplace=True)

fig_1 = px.line(
    data_by_fn_arch,
    x="fn",
    y="time_s",
    color="machine",
    log_y=True,
    title="Mean time per machine type for 100000 calls",
)

# %%

data_by_fn_python = data[["fn", "time_s", "python"]].groupby(["python", "fn"]).mean()
data_by_fn_python = data_by_fn_python.sort_index().reset_index()
data_by_fn_python.sort_values(["time_s"], inplace=True)

fig_2 = px.line(
    data_by_fn_python,
    x="fn",
    y="time_s",
    color="python",
    log_y=True,
    title="Mean time per Python version for 100000 calls",
)
# %%

import plotly.io

plotly.io.write_json(fig_1, "time_per_machine.json")
plotly.io.write_json(fig_2, "time_per_python.json")
# %%
