'use client';

import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

import { getPorfolioHistory, PortfolioHistory } from "lib/api/portfolioHistory";
import dayjs from 'dayjs';


export default function PortfolioSummary() {

    const [portfolioHistory, setPortfolioHistory] = useState<PortfolioHistory[]>([]);

    useEffect(() => {
        getPorfolioHistory().then(history => setPortfolioHistory(history));
    }, [])

    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart data={portfolioHistory}>
                <XAxis
                    dataKey="timestamp"
                    domain={["auto", "auto"]}
                    name="Date"
                    tickFormatter={unixTime => dayjs.unix(unixTime).format("YYYY-MM-DD")}
                    type="number"
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Line type="monotone" dataKey="usdTotalValue" stroke="blue" />
                <Line type="monotone" dataKey="benchmarkPortfolioEthValue" stroke="green" />
                <Line type="monotone" dataKey="benchmarkPortfolioBtcValue" stroke="red" />
                <YAxis domain={["auto", "auto"]} dataKey="usdTotalValue" name="Value" />
            </LineChart>
        </ResponsiveContainer>
    );
}