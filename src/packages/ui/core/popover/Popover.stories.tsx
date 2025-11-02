import type { Meta, StoryObj } from "@storybook/react-vite";
import Popover from "./Popover";

const meta = {
	component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

const actions = [
	{
		label: "An action",
		id: 0,
	},
	{
		label: "An action",
		id: 1,
	},
	{
		label: "An action",
		id: 2,
	},
	{
		label: "An action",
		id: 3,
	},
	{
		label: "An action",
		id: 4,
	},
	{
		label: "An action",
		id: 5,
	},
	{
		label: "An action",
		id: 6,
	},
	{
		label: "An action",
		id: 7,
	},
	{
		label: "An action",
		id: 8,
	},
];

export const Primary: Story = {
	args: {
		children: <></>,
		width: 200,
	},
	render: () => {
		const handleAction = () => {
			console.log("action!");
		};
		return (
			<div className="w-screen h-screen">
				<Popover>
					<Popover.Content>
						{actions.map((action) => (
							<Popover.Action key={action.id} onClick={handleAction}>
								{action.label}
							</Popover.Action>
						))}
					</Popover.Content>
				</Popover>
			</div>
		);
	},
};

export const Right: Story = {
	args: {
		children: <></>,
		width: 200,
	},
	render: () => (
		<div className="fixed right-5 top-5">
			<Popover>
				<Popover.Content>
					{actions.map((action) => (
						<Popover.Action key={action.id}>{action.label}</Popover.Action>
					))}
				</Popover.Content>
			</Popover>
		</div>
	),
};

export const BottomRight: Story = {
	args: {
		children: <></>,
		width: 200,
	},
	render: () => (
		<div className="fixed bottom-5 right-5">
			<Popover>
				<Popover.Content>
					{actions.map((action) => (
						<Popover.Action key={action.id}>{action.label}</Popover.Action>
					))}
				</Popover.Content>
			</Popover>
		</div>
	),
};

export const BottomLeft: Story = {
	args: {
		children: <></>,
		width: 200,
	},
	render: () => (
		<div className="fixed bottom-5 left-5">
			<Popover>
				<Popover.Content>
					{actions.map((action) => (
						<Popover.Action key={action.id}>{action.label}</Popover.Action>
					))}
				</Popover.Content>
			</Popover>
		</div>
	),
};
