import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { dropTargetForExternal } from "@atlaskit/pragmatic-drag-and-drop/external/adapter";
import type React from "react";
import { useEffect, useRef } from "react";

const Dropzone = ({
	children,
	className,
	canDrop,
	canDropExternal,
}: {
	children: React.ReactElement;
	className: string;
	canDrop?: boolean;
	canDropExternal?: boolean;
}) => {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const el = ref.current;

		if (!el) {
			throw new Error("ref not set correctly");
		}

		const cleanup = combine(
			dropTargetForElements({
				element: el,
				canDrop: () => canDrop || true,
			}),
			dropTargetForExternal({
				element: el,
				canDrop: () => canDropExternal || true,
			}),
		);

		return cleanup;
	}, [canDrop, canDropExternal]);

	return (
		<div ref={ref} data-morph="dropzone" className={className}>
			{children}
		</div>
	);
};

const Draggable = () => {
	return <div></div>;
};

Dropzone.Draggable = Draggable;

export default Dropzone;
