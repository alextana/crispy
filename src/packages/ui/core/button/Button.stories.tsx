import type { Meta, StoryObj } from "@storybook/react-vite";

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
	render: (args) => <Button {...args}>I am a button init</Button>,
};

export const Secondary: Story = {
	args: {
		type: "submit",
		variant: "secondary",
	},
	render: (args) => <Button {...args}>I am a button init</Button>,
};

export const Outline: Story = {
	args: {
		type: "submit",
		variant: "outline",
	},
	render: (args) => <Button {...args}>I am a button init</Button>,
};
