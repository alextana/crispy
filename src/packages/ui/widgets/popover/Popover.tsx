import { cva } from "class-variance-authority";
import { atom, useAtom } from "jotai";
import { Plus } from "lucide-react";
import { motion, spring } from "motion/react";
import { useId, useRef } from "react";
import Button from "../../core/button/Button";
import { useBestDirection } from "./hooks/useBestDirection";

const isPopOverOpenAtom = atom(false);
const POPOVER_WIDTH = 210;
const POPOVER_HEIGHT = 380;

const ANIMATION_VARS = {
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

const Popover = ({
	width = POPOVER_WIDTH,
	children,
	icon = false,
	label = "Popover",
}: {
	children: React.ReactNode;
	width?: number;
	icon?: boolean;
	label?: string;
}) => {
	const [openAtom, setOpenAtom] = useAtom(isPopOverOpenAtom);
	const popoverId = `popover-${useId()}`;
	const ref = useRef(null);

	const containerTheme = cva(
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

	const direction = useBestDirection(ref);

	const handleClick = () => {
		setOpenAtom(!openAtom);
	};

	return (
		<div data-popover className="relative w-max" ref={ref}>
			{direction && (
				<div data-slot="trigger" data-test="popover-trigger">
					<div className="relative trigger z-[2]" aria-controls={popoverId}>
						{/**
						 * Trigger
						 */}
						<MotionButton
							animate={openAtom ? "open" : "closed"}
							initial={{
								width: "50px",
								height: "50px",
								transform: "translate(0px, 0px)",
							}}
							variants={{
								open: {
									transform: ANIMATION_VARS[direction]?.triggerAnimation || "",
									width: "30px",
									height: "30px",
								},
								closed: {
									width: "50px",
									height: "50px",
									transform: "translate(0px, 0px)",
								},
							}}
							transition={{
								duration: 0,
								ease: "easeInOut",
							}}
							className="grid cursor-pointer place-content-center rounded-full px-3 py-3"
							onClick={handleClick}
							variant={openAtom ? "circleSecondary" : "circle"}
							aria-label={openAtom ? `Close ${label}` : `Open ${label}`}
						>
							{icon ? (
								icon
							) : (
								<MotionIcon
									initial={{
										transform: "rotate(0deg)",
									}}
									variants={{
										open: {
											transform: "rotate(45deg)",
										},
										closed: {
											transform: "rotate(0deg)",
										},
									}}
									transition={{
										duration: 0.4,
										ease: "easeInOut",
									}}
								/>
							)}
						</MotionButton>
					</div>

					<motion.div
						id={popoverId}
						animate={openAtom ? "open" : "closed"}
						initial={{ scale: 0 }}
						variants={{
							open: {
								scale: 1,
								opacity: 1,
								transition: { type: spring, bounce: 0.3, duration: 0.5 },
							},
							closed: {
								scale: 0,
								opacity: 0,
								x: ANIMATION_VARS[direction].x,
								y: ANIMATION_VARS[direction].y,
							},
						}}
						className={containerTheme({
							origin: direction,
						})}
						style={{
							width: `${width}px`,
							maxHeight: POPOVER_HEIGHT,
						}}
					>
						<motion.div
							animate={openAtom ? "open" : "closed"}
							data-slot="default"
							className="overflow-y-scroll py-2 px-1"
							style={{ maxHeight: POPOVER_HEIGHT - 60 }}
							initial={{
								opacity: 0,
							}}
							variants={{
								open: {
									opacity: 1,
									transition: {
										duration: 0.6,
										ease: "easeOut",
									},
								},
								closed: {
									opacity: 0,
									transition: {
										duration: 0,
									},
								},
							}}
						>
							{children}
						</motion.div>
					</motion.div>
				</div>
			)}
		</div>
	);
};

const MotionButton = motion.create(Button);
const MotionIcon = motion.create(Plus);

const Content = ({ children }: { children: React.ReactNode }) => {
	return <div data-popover="content">{children}</div>;
};

const Action = ({ children }: { children: React.ReactNode }) => {
	const [_, setOpenAtom] = useAtom(isPopOverOpenAtom);

	return (
		<Button
			type="button"
			variant="ghost"
			className="w-full block mb-2 text-left cursor-pointer"
			onClick={() => setOpenAtom(false)}
		>
			{children}
		</Button>
	);
};

Popover.Content = Content;
Popover.Action = Action;

export default Popover;
