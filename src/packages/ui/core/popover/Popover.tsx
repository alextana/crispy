import { Plus } from "lucide-react";
import { motion, spring } from "motion/react";
import { createContext, useContext, useId, useRef, useState } from "react";
import Button from "../button/Button";
import { useBestDirection } from "./hooks/useBestDirection";
import { ANIMATION_VARS, containerTheme } from "./theme";

const POPOVER_WIDTH = 210;
const POPOVER_HEIGHT = 380;

const MotionButton = motion.create(Button);
const MotionIcon = motion.create(Plus);

type PopoverContextType = {
	open: boolean;
	setOpen: (value: boolean) => void;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

export const usePopoverContext = () => {
	const ctx = useContext(PopoverContext);
	if (!ctx) {
		throw new Error("Popover.* components must be used within <Popover>");
	}
	return ctx;
};

type PopoverProps = {
	isOpen?: boolean;
	onOpenChange?: (value: boolean) => void;
	children: React.ReactNode;
	icon?: React.ReactNode;
	width?: number;
	label?: string;
};

const Popover = ({
	isOpen,
	width = POPOVER_WIDTH,
	onOpenChange,
	children,
	icon = false,
	label = "Popover",
}: PopoverProps) => {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
	const open = isOpen ?? uncontrolledOpen;
	const setOpen = onOpenChange ?? setUncontrolledOpen;

	const popoverId = `popover-${useId()}`;
	const ref = useRef(null);

	const direction = useBestDirection(ref);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<PopoverContext.Provider value={{ open, setOpen }}>
			<div data-popover className="relative w-max" ref={ref}>
				{direction && (
					<div data-slot="trigger" data-test="popover-trigger">
						<div className="relative trigger z-[2]" aria-controls={popoverId}>
							{/**
							 * Trigger
							 */}
							<MotionButton
								animate={open ? "open" : "closed"}
								initial={{
									width: "50px",
									height: "50px",
									transform: "translate(0px, 0px)",
								}}
								variants={{
									open: {
										transform:
											ANIMATION_VARS[direction]?.triggerAnimation || "",
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
								variant={open ? "circleSecondary" : "circle"}
								aria-label={open ? `Close ${label}` : `Open ${label}`}
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
							animate={open ? "open" : "closed"}
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
							{open && label && (
								<span
									data-morph="popover-label"
									className="absolute top-4 text-sm uppercase font-bold left-5 z-[3]"
								>
									{label}
								</span>
							)}

							<motion.div
								animate={open ? "open" : "closed"}
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
		</PopoverContext.Provider>
	);
};

const Content = ({ children }: { children: React.ReactNode }) => {
	return <div data-popover="content">{children}</div>;
};

const Action = ({
	children,
	onClick,
	closeOnAction = false,
	icon = false,
}: {
	closeOnAction?: boolean;
	children: React.ReactNode;
	onClick?: () => void;
	icon: React.ReactNode;
}) => {
	const { setOpen } = usePopoverContext();

	const handleClick = () => {
		onClick?.();

		if (!closeOnAction) return;

		setOpen(false);
	};

	return (
		<Button
			type="button"
			variant="ghost"
			icon={icon}
			className="w-full block mb-2 text-left cursor-pointer"
			onClick={handleClick}
		>
			{children}
		</Button>
	);
};

Popover.Content = Content;
Popover.Action = Action;

export default Popover;
