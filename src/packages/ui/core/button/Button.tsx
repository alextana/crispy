import type { VariantProps } from "class-variance-authority";
import { buttonTheme } from "./theme";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonTheme> & {
		ref?: React.Ref<HTMLButtonElement>;
		fluid?: boolean;
	};

const Button = ({
	ref,
	className,
	variant = "primary",
	size,
	onClick,
	type,
	children,
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
			{children}
		</button>
	);
};

export default Button;
