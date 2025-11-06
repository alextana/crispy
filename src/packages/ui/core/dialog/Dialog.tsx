import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { motion, spring } from "motion/react";
import { createContext, useContext, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../button/Button";

type DialogContextType = {
	open: boolean;
	setOpen: () => void;
	dialogRef: React.RefObject<HTMLDialogElement | null>;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const useDialogContext = () => {
	const ctx = useContext(DialogContext);
	if (!ctx) {
		throw new Error("Dialog.* components must be used within <Dialog>");
	}
	return ctx;
};

const Dialog = ({
	id,
	children,
}: {
	id?: string | undefined;
	children: React.ReactElement;
	isOpen?: boolean;
	onOpenChange?: (value: boolean) => void;
}) => {
	const dialogId = useId();
	const dialogRef = useRef<HTMLDialogElement>(null);

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		if (!dialogRef.current) return;

		dialogRef.current.showModal();
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const dialogTheme = cva(
		"fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-2xl backdrop:bg-black/40 backdrop:backdrop-blur-xs",
	);

	return (
		<DialogContext.Provider value={{ dialogRef, open }}>
			{createPortal(
				<dialog
					className={dialogTheme()}
					onClose={handleClose}
					ref={dialogRef}
					data-morph="dialog"
					id={id || dialogId}
				>
					{children}
				</dialog>,
				document.body,
			)}

			<Button variant="primary" type="button" onClick={handleClick}>
				Button
			</Button>
		</DialogContext.Provider>
	);
};

export const Content = ({
	children,
	...props
}: {
	children: React.ReactElement;
}) => {
	const { open, dialogRef } = useDialogContext();

	const theme = cva(
		"relative block bg-surface border border-black/10 max-w-[500px] w-[90vw] shadow-lg rounded-2xl text-surface-content",
	);

	const handleClose = () => {
		if (!dialogRef.current) return;

		dialogRef.current.close();
	};

	return (
		<motion.div
			data-morph="dialog-content"
			{...props}
			animate={open ? "open" : "closed"}
			className={theme()}
			initial={{
				opacity: 0,
			}}
			variants={{
				open: {
					opacity: 1,
					scale: 1,
					y: 0,
					transition: { type: spring, bounce: 0.3, duration: 0.8 },
				},
				closed: {
					opacity: 0,
					scale: 0,
					y: 200,
				},
			}}
		>
			<div
				data-morph="dialog-header"
				className="w-full flex justify-between items-center border-b border-white/10 py-2 px-4"
			>
				<div>Header</div>
				<div>
					<Button
						variant="circleSecondary"
						onClick={handleClose}
						className="w-[30px] h-[30px] grid place-content-center"
					>
						<X size="16" />
					</Button>
				</div>
			</div>

			<div className="p-4">{children}</div>
		</motion.div>
	);
};

export const Trigger = ({
	children,
}: {
	children: React.ReactElement | string;
}) => {
	const { dialogRef } = useDialogContext();

	const handleClick = () => {
		if (!dialogRef.current) return;

		dialogRef.current.showModal();
	};
	return (
		<Button data-morph="dialog-trigger" onClick={handleClick}>
			{children}
		</Button>
	);
};

Dialog.Trigger = Trigger;
Dialog.Content = Content;

export default Dialog;
