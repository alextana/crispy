import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";
import Button from "./Button";

const meta = {
	component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		type: "submit",
		variant: "primary",
	},
	render: (args) => <Button {...args}>Primary button</Button>,
};

export const Secondary: Story = {
	args: {
		type: "submit",
		variant: "secondary",
	},
	render: (args) => <Button {...args}>Secondary button</Button>,
};

export const SecondaryWithIcon: Story = {
	render: () => (
		<div className="flex flex-wrap gap-3">
			<Button variant="secondary" icon={<Plus />} iconPosition="left">
				Button with icon left
			</Button>
			<Button variant="primary" icon={<Plus />} iconPosition="right">
				Button with icon right
			</Button>
		</div>
	),
};

export const Outline: Story = {
	args: {
		type: "submit",
		variant: "outline",
	},
	render: (args) => <Button {...args}>Outline button</Button>,
};
