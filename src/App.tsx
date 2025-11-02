import Sidebar from "./packages/ui/widgets/sidebar/Sidebar";

function App() {
	return (
		<div className="w-screen h-screen">
			<Sidebar open={true}>Children</Sidebar>
		</div>
	);
}

export default App;
