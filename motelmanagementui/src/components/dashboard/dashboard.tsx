import { ResponsiveBar } from "@nivo/bar";
import Search from "../base/search";

export default function Dashboard() {
    const data = [
        { country: 'USA', hotdog: 29, burger: 65 },
        { country: 'France', hotdog: 35, burger: 86 },
        { country: 'Germany', hotdog: 22, burger: 45 },
    ];

    return (
        <div className="content">
            <div className="top-content">
                <Search />
                <div className="like-search"></div>
            </div>
            <div className="body-content">
                <ResponsiveBar
                    data={data}
                    keys={['hotdog', 'burger']}
                    indexBy="country"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Country',
                        legendPosition: 'middle',
                        legendOffset: 32,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Food Count',
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
                    borderRadius={6} // Đặt borderRadius để tạo cột tròn ở cạnh trên
                />

            </div>
        </div>
    )
}