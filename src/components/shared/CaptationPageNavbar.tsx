import logo from "@/assets/images/logo.png";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface CaptationPageNavbarProps {
	pricingRef: React.RefObject<HTMLDivElement>;
}

const CaptationPageNavbar = ({ pricingRef }: CaptationPageNavbarProps) => {
	const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
		ref.current?.scrollIntoView({ behavior: "smooth" });
	};

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
							<Button
								variant={"link"}
								className="text-[#333] text-md"
								onClick={() => scrollToSection(pricingRef)}
							>
								Planos para integração
							</Button>
						</li>
						<li>
							<Button variant={"link"} disabled={true} className="text-[#333] text-md">
								Documentação de API
							</Button>
						</li>
						<SignedIn>
							<li>
								<Button variant={"link"} disabled={true} className="text-[#333] text-md">
									Meu plano
								</Button>
							</li>
							<li>
								<Link to={"/myProfiles"}>
									<Button variant={"link"} className="text-[#333] text-md">
										Minhas postagens
									</Button>
								</Link>
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
