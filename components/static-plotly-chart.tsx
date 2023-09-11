'use client'

import { useEffect, useState, PropsWithChildren } from 'react'
import Plot from 'react-plotly.js'

import axios from 'axios'
import PlotPlaceholder from './plot-placeholder'

type PlotlyData = {
  data: object
  layout: object
}

/**
 *
 * @param {string} filepath
 * @returns
 */
export async function plotlyChartFetch(filepath: string) {
  return await axios({
    headers: {},
    method: 'GET',
    url: '/plotly-charts/' + filepath,
  })
}

function StaticPlotlyChart({
  filepath,
  height,
  width,
  children,
}: PropsWithChildren<{
  filepath: string
  height?: string | number
  width?: string | number
}>) {
  const [plotlyData, setPlotlyData] = useState<PlotlyData | undefined>(
    undefined
  )

  useEffect(() => {
    plotlyChartFetch(filepath).then((data) => setPlotlyData(data.data))
  }, [])

  const staticLayout = plotlyData?.layout || {}

  const layout = {
    ...staticLayout,
  }

  return plotlyData ? (
    <div className="-mx-2 md:-mx-10">
      <div className="border-solid rounded-lg my-4 border-2 p-1.5 bg-white">
        <Plot
          data={plotlyData.data}
          layout={layout}
          useResizeHandler
          style={{
            width: width || '100%',
            height,
          }}
        />
      </div>
      {children && <small>{children}</small>}
    </div>
  ) : (
    <PlotPlaceholder />
  )
}

export default StaticPlotlyChart
