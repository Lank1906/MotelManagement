import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from "@nivo/line";
import Search from "../base/search";
import { useContext, useEffect, useState } from "react";
import { GetFetch } from "../../libs/fetch";
import { MyContext } from "../../libs/context";

export default function Dashboard() {
    const [fill, setFill] = useState<any[]>();
    const [revenue, setRevenue] = useState<any[]>();
    const [all, setAll] = useState<any[]>();
    const context = useContext(MyContext);
    const [highlightedSerie, setHighlightedSerie] = useState<string | number | null>(null);

    useEffect(() => {
        GetFetch('history/fill', (data: any) => {
            let temp = Object.entries(data).map(([key, value]) => ({
                id: key,
                value: value,
            }));
            setFill(temp)
        }, context?.data, (data: any) => {
            console.log(data)
        })

        GetFetch('history/revenue', (data: any[]) => {
            setRevenue(data)
        }, context?.data, (data: any) => {
            console.log(data)
        })

        GetFetch('history', (data: any[]) => {
            setAll(data)
        }, context?.data, (data: any) => {
            console.log(data)
        })
    }, [])
    
    return (
        <div className="content">
            <div className="top-content">
                <Search />
                <div className="like-search"></div>
            </div>
            <div className="body-content display-grid" style={{ height: "100%" }}>
                <div style={{ height: '400px', width: '740px', margin: '12px auto' }}>
                    <ResponsiveBar
                        data={revenue || []}
                        keys={['tong']}
                        indexBy="thang"
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.3}
                        colors={{ scheme: 'paired' }}
                        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Time',
                            legendPosition: 'middle',
                            legendOffset: 32,
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legendPosition: 'middle',
                            legendOffset: -40,
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                            },
                        ]}
                        animate={true}
                        borderRadius={6}
                    />
                </div>

                <div style={{ width: '400px', height: '400px', margin: '12px auto' }}>
                    <ResponsivePie
                        data={fill || []}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5} // Tạo biểu đồ Donut
                        padAngle={0.7} // Khoảng cách giữa các phần
                        cornerRadius={3} // Bo góc
                        colors={{ scheme: 'paired' }} // Sử dụng bảng màu Nivo
                        borderWidth={1} // Độ rộng viền
                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }} // Màu viền đậm hơn
                        arcLabelsSkipAngle={10} // Bỏ qua nhãn với góc nhỏ hơn 10
                        arcLabelsTextColor="#333333" // Màu chữ nhãn
                        legends={[
                            {
                                anchor: 'bottom', // Vị trí chú thích
                                direction: 'row', // Chú thích nằm ngang
                                justify: false,
                                translateX: 0,
                                translateY: 56, // Dịch chuyển xuống dưới
                                itemsSpacing: 0,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999', // Màu chữ của chú thích
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: 'circle', // Biểu tượng hình tròn
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000', // Đổi màu khi hover
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                </div>

                <div style={{ height: '300px', width: '740px', margin: '12px auto' }}>
                    <ResponsiveLine
                        data={all || []}
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        xScale={{ type: "point" }}
                        yScale={{
                            type: "linear",
                            min: "auto",
                            max: "auto",
                            stacked: false,
                            reverse: false,
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Tháng",
                            legendOffset: 36,
                            legendPosition: "middle",
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Giá trị",
                            legendOffset: -40,
                            legendPosition: "middle",
                        }}
                        colors={{ scheme: "paired" }}
                        pointSize={6}
                        pointColor={{ theme: "background" }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[
                            {
                                anchor: "bottom-right",
                                direction: "column",
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: "left-to-right",
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 4,
                                symbolShape: "square",
                                symbolBorderColor: "rgba(0, 0, 0, .5)",
                                effects: [
                                    {
                                        on: "hover",
                                        style: {
                                            itemBackground: "rgba(0, 0, 0, .03)",
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                                onClick: (serie) => {
                                    setHighlightedSerie((prev) => (prev === serie.id ? null : serie.id));
                                },
                            },
                        ]}
                        layers={[
                            "grid",
                            "markers",
                            "axes",
                            ({ series, lineGenerator, xScale, yScale }) => {
                                // Khai báo kiểu cụ thể
                                const xScaleFn = xScale as (value: string | number) => number;
                                const yScaleFn = yScale as (value: number) => number;

                                return (
                                    <g key="lines">
                                        {series.map(({ id, data, color }) => (
                                            <path
                                                key={id}
                                                d={
                                                    lineGenerator(
                                                        data.map((d) => ({
                                                            x: xScaleFn(d.data.x as string | number),
                                                            y: yScaleFn(d.data.y as number),
                                                        }))
                                                    ) || "" // Tránh null
                                                }
                                                fill="none"
                                                stroke={color}
                                                strokeWidth={
                                                    highlightedSerie === null || highlightedSerie === id ? 3 : 1
                                                }
                                                opacity={
                                                    highlightedSerie === null || highlightedSerie === id ? 1 : 0.2
                                                }
                                                style={{
                                                    transition: "all 0.3s ease-in-out",
                                                }}
                                            />
                                        ))}
                                    </g>
                                );
                            },
                            "legends",
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
