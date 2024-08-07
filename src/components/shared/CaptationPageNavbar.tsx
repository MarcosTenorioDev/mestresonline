import logo from "@/assets/images/logo.png";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from "@clerk/clerk-react";
import { Button } from "../ui/button";

const CaptationPageNavbar = () => {
	return (
		<div>
			<nav className="max-w-7xl flex justify-between items-center font-poppins font-normal text-[#333] mx-auto p-4">
				<div>
					<h1 className="flex items-center justify-center gap-2 text-xl">
						Mestres_Online <img src={logo} alt="logo" className="w-10 h-10" />
					</h1>
				</div>

				<div>
					<ul className="flex gap-6">
						<li>
							<Button variant={"link"} className="text-[#333] text-md">Home</Button>
						</li>

						<li>
							<Button variant={"link"} className="text-[#333] text-md">Plans</Button>
						</li>
						<li>
							<Button variant={"link"} className="text-[#333] text-md">API Docs</Button>
						</li>
						<SignedIn>
							<li>
								{" "}
								<li>
									<Button variant={"link"} className="text-[#333] text-md">My Plan</Button>
								</li>
							</li>
						</SignedIn>
					</ul>
				</div>

				<div className="flex items-center">
					<SignedIn>
						<UserButton></UserButton>
					</SignedIn>
					<SignedOut>
						<SignInButton mode="modal">
							<Button variant={"outlineWhite"}>login</Button>
						</SignInButton>
					</SignedOut>
				</div>
			</nav>
		</div>
	);
};

export default CaptationPageNavbar;
