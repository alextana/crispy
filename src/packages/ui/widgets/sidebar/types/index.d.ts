export type SidebarProps = React.BaseHTMLAttributes<HTMLElement> &
	VariantProps<typeof sidebarTheme> & {
		ref?: React.Ref<HTMLElement>;
		open?: boolean;
		expandIcon?: React.ReactNode;
	};

export type SidebarContextProps = {
	state: "expanded" | "collapsed";
	open: boolean;
	toggle: () => void;
};
