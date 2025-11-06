import type { Meta, StoryObj } from "@storybook/react-vite";
import Dialog from "./Dialog";

const meta = {
	component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: <></>,
	},
	render: () => {
		return (
			<div className="w-screen h-screen">
				<Dialog>
					<Dialog.Content>
						<>This is a dialog</>
					</Dialog.Content>
				</Dialog>
			</div>
		);
	},
};
