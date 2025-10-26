import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const buttonTheme = cva(
	`
		transition-all duration-150
		px-4 py-1 disabled:shadow-none
		disabled:cursor-not-allowed
		disabled:opacity-70
		focus:outline-none
		active:scale-95
		focus:ring-3
	`,
	{
		variants: {
			variant: {
				primary: `
						rounded-full border border-primary/20 bg-primary
						text-surface-content shadow-xl hover:bg-primary/90
						active:bg-primary/80
						focus:ring-primary/30 disabled:bg-primary/50
					`,
				secondary: `
						rounded-full border border-secondary/20 bg-secondary
						text-surface-content shadow-xl hover:bg-secondary/90
						active:bg-secondary/80
						focus:ring-secondary/30 disabled:bg-secondary/50
					`,
				outline: `
						rounded-full border border-border text-surface-content

						focus:ring-primary/60
					`,
				ghost: "",
				link: "",
				icon: "",
			},
			size: {
				sm: "lg",
				md: "md",
				lg: "xs",
			},
		},
	},
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonTheme> & {
		ref?: React.Ref<HTMLButtonElement>;
	};

const Button = ({
	ref,
	className,
	variant,
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
			className={buttonTheme({ size, variant })}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
