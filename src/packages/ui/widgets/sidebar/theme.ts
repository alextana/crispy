import { cva } from "class-variance-authority";

export const sidebarTheme = cva(
	`relative w-[200px] h-[calc(100vh-16px)] rounded-[15px] translate-2 border border-border bg-surface/80 backdrop-blur-md text-surface-content shadow-lg flex flex-col items-center transition-all duration-300`,
	{
		variants: {
			variant: {
				expanded: ``,
				collapsed: `w-16`,
			},
		},
	},
);

export const expandCollapseButtonTheme = cva(
	"transition-all duration-600 absolute top-2",
	{
		variants: {
			variant: {
				expanded: "right-2",
				collapsed: "right-1/2 translate-x-1/2",
			},
		},
	},
);
