"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
	{ month: "1월", userCount: 1800, fill: "var(--color-jan)" },
	{ month: "2월", userCount: 200, fill: "var(--color-feb)" },
	{ month: "3월", userCount: 287, fill: "var(--color-mar)" },
	{ month: "4월", userCount: 173, fill: "var(--color-apr)" },
	{ month: "5월", userCount: 190, fill: "var(--color-may)" },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	jan: {
		label: "1월",
		color: "hsl(var(--chart-1))",
	},
	feb: {
		label: "2월",
		color: "hsl(var(--chart-2))",
	},
	mar: {
		label: "3월",
		color: "hsl(var(--chart-3))",
	},
	apr: {
		label: "4월",
		color: "hsl(var(--chart-4))",
	},
	may: {
		label: "5월",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig;

export default function Page() {
	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.userCount, 0);
	}, []);

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Pie Chart</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="userCount"
							nameKey="month"
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (
										viewBox &&
										"cx" in viewBox &&
										"cy" in viewBox
									) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{`${totalVisitors.toLocaleString()}명`}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													방문
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
