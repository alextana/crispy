import { PanelLeft } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../core/button/Button";
import { expandCollapseButtonTheme, sidebarTheme } from "./theme";
import type { SidebarProps } from "./types";

// const Context = createContext<SidebarContextProps | null>(null);

const Sidebar = ({ open = true, expandIcon }: SidebarProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(open);

	const handleState = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const sidebarVariant = sidebarOpen ? "expanded" : "collapsed";

	return (
		<aside
			id="sidebar"
			className={twMerge(
				sidebarTheme({
					variant: sidebarVariant,
				}),
			)}
		>
			<div
				className={expandCollapseButtonTheme({
					variant: sidebarVariant,
				})}
			>
				<Button
					onClick={handleState}
					variant="icon"
					aria-controls="sidebar"
					aria-pressed={sidebarOpen}
					aria-label="Toggle sidebar"
				>
					{expandIcon ? expandIcon : <PanelLeft />}
				</Button>
			</div>
		</aside>
	);
};

export default Sidebar;
