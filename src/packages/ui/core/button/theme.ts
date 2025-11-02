import { cva } from "class-variance-authority";

export const buttonTheme = cva(
	"transition-all flex cursor-pointer items-center gap-2 duration-150 disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none active:scale-95 focus-visible:ring-3 rounded-full",
	{
		variants: {
			variant: {
				primary: `px-4 py-1 border inset-shadow-2xs inset-shadow-blue-400 border-primary/20 bg-primary text-surface-content shadow-xl hover:bg-primary/90 active:bg-primary/80 focus-visible:ring-primary/30 disabled:bg-primary/50`,
				secondary: `px-4 py-1 border inset-shadow-2xs inset-shadow-cyan-800 border-secondary/20 bg-secondary text-surface-content shadow-xl hover:bg-secondary/90 active:bg-secondary/80 focus-visible:ring-secondary/30 disabled:bg-secondary/50`,
				outline: `px-4 py-1 border border-border text-surface-content focus-visible:ring-primary/60`,
				ghost:
					"px-4 py-2 hover:bg-neutral-700 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500",
				link: "",
				circle: `rounded-full inset-shadow-2xs inset-shadow-blue-400 p-3 bg-primary text-white shadow-md hover:bg-surface-hover active:bg-surface-active focus-visible:ring-primary/60`,
				circleSecondary: `rounded-full p-3 bg-neutral-900 text-surface-content shadow-md hover:bg-surface-hover active:bg-surface-active focus-visible:ring-outline/60 active:scale-100`,
				icon: "rounded-lg bg-transparent p-1 shadow-none active:scale-95 focus-visible:ring-primary/80",
			},
			width: {
				fluid: "w-full",
			},
			size: {
				sm: "lg",
				md: "md",
				lg: "xs",
			},
		},
	},
);

export const iconTheme = cva("block [&>svg]:w-[18px] [&>svg]:h-[18px]", {
	variants: {
		iconPosition: {
			left: "",
			right: "order-1",
		},
	},
});
