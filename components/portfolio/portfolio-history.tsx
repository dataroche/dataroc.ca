'use client';

import React, { useState, useEffect } from 'react';
import { Line } from '@nivo/line'

// import { ResponsiveContainer, LineChart, Line, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

import { getPorfolioHistory, PortfolioHistory } from "lib/api/portfolioHistory";

import colors from 'tailwindcss/colors';

const NIVO_THEME = {
    axis: {
        ticks: {
            line: {
                strokeWidth: 0
            },
            text: {
                fill: colors.gray["300"]
            }
        },
        legend: {
            text: {
                fill: colors.gray["300"]
            }
        }

    },
}

export default function PortfolioHistory() {

    const [portfolioHistory, setPortfolioHistory] = useState<PortfolioHistory[]>([]);

    useEffect(() => {
        getPorfolioHistory().then(history => setPortfolioHistory(history));
    }, [])

    const tooltipFormatter = ({ slice }) => {
        const date = slice.points[0].data.xFormatted;
        return (
            <div className="flex flex-col bg-white w-72 highlight-box">
                <div className="flex-1">{date}</div>
                {slice.points.map((point) => (
                    <div className="flex flex-row justify-between gap-5" style={{ color: point.serieColor }}>
                        <div>{point.serieId}</div>
                        <div>${point.data.yFormatted}</div>
                    </div>
                ))}
            </div>
        )
    }

    const usdTotalValue = portfolioHistory.map(entry => ({ x: entry.dateStr, y: entry.usdTotalValue.toFixed(0) }));
    const benchmarkPortfolioBtcValue = portfolioHistory.map(entry => ({ x: entry.dateStr, y: entry.benchmarkPortfolioBtcValue.toFixed(0) }));
    const benchmarkPortfolioEthValue = portfolioHistory.map(entry => ({ x: entry.dateStr, y: entry.benchmarkPortfolioEthValue.toFixed(0) }));

    const Chart = () => {
        return (
            <Line
                theme={NIVO_THEME}
                margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
                width={600}
                height={500}
                data={[
                    {
                        id: 'BTC Benchmark',
                        data: benchmarkPortfolioBtcValue,
                    },
                    {
                        id: 'ETH Benchmark',
                        data: benchmarkPortfolioEthValue,
                    },
                    {
                        id: 'Portfolio Value',
                        data: usdTotalValue,
                    },
                ]}
                xScale={{
                    type: 'time',
                    format: '%Y-%m-%d',
                    useUTC: false,
                    precision: 'day',
                    nice: true
                }}
                xFormat="time:%Y-%m-%d"
                yScale={{
                    type: 'linear',
                    min: "auto",
                    max: "auto"
                }}
                axisLeft={{
                    legend: '$USD',
                    legendOffset: -55,
                }}
                axisBottom={{
                    format: '%b %Y',
                    tickValues: 'every 2 months',
                    legend: 'Date',
                    legendOffset: 35,
                }}
                useMesh={true}
                enableSlices="x"
                colors={{ scheme: "category10" }}
                sliceTooltip={tooltipFormatter}
            />
        )
    }

    return (
        <Chart />
    )

    // return (
    //     <ResponsiveContainer width="100%" height={500}>
    //         <LineChart data={portfolioHistory} title="">
    //             <XAxis
    //                 dataKey="timestamp"
    //                 domain={["auto", "auto"]}
    //                 name="Date"
    //                 tickFormatter={unixTime => dayjs.unix(unixTime).format("YYYY-MM-DD")}
    //                 type="number"
    //                 stroke="white"
    //             />
    //             <Tooltip cursor={{ strokeDasharray: '3 3' }} tickFormatter={labelFormatter} formatter={valueFormatter} />
    //             <Line type="monotone" dataKey="benchmarkPortfolioEthValue" stroke="green" dot={false} name="ETH Benchmark" unit="$" />
    //             <Line type="monotone" dataKey="benchmarkPortfolioBtcValue" stroke="red" dot={false} name="BTC Benchmark" unit="$" />
    //             <Line type="monotone" dataKey="usdTotalValue" strokeWidth={3} stroke="blue" dot={false} name="Portfolio" unit="$" />
    //             <YAxis domain={["auto", "auto"]} axisLine={false} stroke="white" />
    //             <CartesianGrid />
    //         </LineChart>
    //     </ResponsiveContainer>
    // );
}