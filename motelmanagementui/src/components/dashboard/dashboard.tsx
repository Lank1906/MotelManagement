import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from '@nivo/pie';
import Search from "../base/search";

export default function Dashboard() {
    const data = [
        { country: 'USA', hotdog: 29, burger: 65 },
        { country: 'France', hotdog: 35, burger: 86 },
        { country: 'Germany', hotdog: 22, burger: 45 },
    ];
    const data2 = [
        { id: 'JavaScript', value: 55 },
        { id: 'Python', value: 35 },
        { id: 'Java', value: 25 },
        { id: 'C#', value: 20 },
    ];

    return (
        <div className="content">
            <div className="top-content">
                <Search />
                <div className="like-search"></div>
            </div>
            <div className="body-content" style={{ height: "100%" }}>
                <ResponsiveBar
                    data={data}
                    keys={['hotdog', 'burger']}
                    indexBy="country"
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
                    borderRadius={6}
                />

                <ResponsivePie
                    data={data2}
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
        </div>
    );
}
