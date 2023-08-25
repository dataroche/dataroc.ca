'use client';

import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

import axios from "axios";

type PlotlyData = {
    data: object;
    layout: object;
}

/**
 *
 * @param {string} filepath
 * @returns
 */
export async function plotlyChartFetch(filepath: string) {
    return await axios({
        headers: {},
        method: "GET",
        url: '/plotly-charts/' + filepath,
    });
}

function Placeholder() {
    return (
        <div className="animate-pulse">
            <div className="flex space-x-4 items-baseline m-6">
                <div className="flex-1 h-24 bg-gray-200 rounded"></div>
                <div className="flex-1 h-36 bg-gray-200 rounded"></div>
                <div className="flex-1 h-48 bg-gray-200 rounded"></div>
                <div className="flex-1 h-64 bg-gray-300 rounded"></div>
                <div className="flex-1 h-72 bg-gray-200 rounded"></div>
                <div className="flex-1 h-64 bg-gray-300 rounded"></div>
                <div className="flex-1 h-48 bg-gray-200 rounded"></div>
                <div className="flex-1 h-36 bg-gray-200 rounded"></div>
                <div className="flex-1 h-72 bg-gray-300 rounded"></div>
                <div className="flex-1 h-36 bg-gray-200 rounded"></div>
                <div className="flex-1 h-48 bg-gray-200 rounded"></div>
                <div className="flex-1 h-64 bg-gray-300 rounded"></div>
                <div className="flex-1 h-72 bg-gray-200 rounded"></div>
                <div className="flex-1 h-64 bg-gray-300 rounded"></div>
                <div className="flex-1 h-48 bg-gray-200 rounded"></div>
                <div className="flex-1 h-36 bg-gray-200 rounded"></div>
                <div className="flex-1 h-24 bg-gray-200 rounded"></div>
            </div>
        </div>
    )
}

function StaticPlotlyChart({ filepath, height, width }: { filepath: string, height?: string | number, width?: string | number }) {

    const [plotlyData, setPlotlyData] = useState<PlotlyData | undefined>(undefined);

    useEffect(() => {
        plotlyChartFetch(filepath).then(data => setPlotlyData(data.data));
    }, [])

    const staticLayout = plotlyData?.layout || {}

    const layout = {
        ...staticLayout,
    }

    return (
        <div className="border-solid rounded-lg my-4 -mx-15 border-2 p-1.5 bg-white">
            {plotlyData ? (
                <Plot
                    data={plotlyData.data}
                    layout={layout}
                    useResizeHandler
                    style={{
                        width: width || "100%",
                        height
                    }}
                />
            ) : (
                <Placeholder />
            )}
        </div>
    );
}

export default StaticPlotlyChart;