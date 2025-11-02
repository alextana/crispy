import { cva } from "class-variance-authority";

export const ANIMATION_VARS = {
	"top-left": {
		triggerAnimation: "translate(-10px, -340px)",
		x: -5,
		y: -5,
	},
	"top-right": {
		triggerAnimation: "translate(170px, -340px)",
		x: 5,
		y: -5,
	},
	"bottom-left": {
		triggerAnimation: "translate(-10px, 10px)",
		x: 5,
		y: 5,
	},
	"bottom-right": {
		triggerAnimation: "translate(170px, 10px)",
		x: -5,
		y: 5,
	},
};

export const containerTheme = cva(
	"absolute top-0 z-[1] min-h-[150px] transform rounded-[25px] border border-neutral-800 bg-surface px-2 pt-[45px] pb-4 text-surface-content shadow-md inset-shadow-2xs inset-shadow-neutral-600",
	{
		variants: {
			origin: {
				"bottom-right": "origin-top-left top-0",
				"bottom-left": "origin-top-right right-0",
				"top-left": "origin-bottom-right right-0 bottom-0 top-[unset]",
				"top-right": "origin-bottom-left left-0 bottom-0 top-[unset]",
			},
		},
	},
);
