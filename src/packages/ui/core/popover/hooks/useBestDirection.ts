import { useLayoutEffect, useState } from "react";

/**
 * Calculate where is best to render the popover by checking
 * the position of the trigger in the window
 *
 * The popover can either go down or up from the button - but could go either
 * left or right
 */
export type Direction =
	| "top-left"
	| "top-right"
	| "bottom-left"
	| "bottom-right";

export function useBestDirection(ref: React.RefObject<HTMLElement | null>) {
	const [direction, setDirection] = useState<Direction | undefined>(undefined);
	useLayoutEffect(() => {
		if (!ref || !ref.current) return;

		const { innerHeight, innerWidth } = window;
		const rect = ref.current.getBoundingClientRect();
		const { x, y } = rect;

		const space: Record<Direction, number> = {
			"top-left": x * y,
			"top-right": (innerWidth - x) * y,
			"bottom-left": x * (innerHeight - y),
			"bottom-right": (innerWidth - x) * (innerHeight - y),
		};

		const [bestDirection] = Object.entries(space).sort(
			(a, b) => b[1] - a[1],
		)[0];
		setDirection(bestDirection as Direction);
	}, [ref]);

	return direction;
}
