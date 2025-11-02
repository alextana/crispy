import type { VariantProps } from "class-variance-authority";
import { buttonTheme, iconTheme } from "./theme";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonTheme> & {
		ref?: React.Ref<HTMLButtonElement>;
		fluid?: boolean;
		icon?: React.ReactNode;
		iconPosition?: "left" | "right";
	};

const Button = ({
	ref,
	className,
	variant = "primary",
	size,
	onClick,
	type,
	children,
	icon,
	iconPosition,
	...props
}: ButtonProps) => {
	return (
		<button
			ref={ref}
			onClick={onClick}
			type={type}
			className={`${className} ${buttonTheme({ size, variant })}`}
			{...props}
		>
			{icon && (
				<span className={iconTheme({ iconPosition })} data-morph="button-icon">
					{icon}
				</span>
			)}
			<span className="block" data-morph="button-label">
				{children}
			</span>
		</button>
	);
};

export default Button;
