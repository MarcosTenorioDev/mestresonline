import logo from "@/assets/images/logo.png";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
	UserButton,
	useSession,
} from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { UserService } from "@/core/services/user.service";
import { Spinner } from "../ui/loading-spinner";
import { SearchProfileModal } from "../SearchProfileModal/SearchProfileModal";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

/* interface CaptationPageNavbarProps {
	integrationRef?: React.RefObject<HTMLDivElement>;
} */

const CaptationPageNavbar =
	(/* { integrationRef }: CaptationPageNavbarProps */) => {
		const [isOpen, setOpen] = useState(false);
		/* 	const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
		ref.current?.scrollIntoView({ behavior: "smooth" });
	}; */
		const userService = new UserService();
		const [user, setUser] = useState<any>();
		const [loading, setLoading] = useState<boolean>(true);
		const userClerk = useSession();

		const fetchUser = async () => {
			const user = await userService.findByToken();
			setUser(user);
			setLoading(false);
		};

		useEffect(() => {
			if (user) return;
			if (!userClerk || !userClerk.isSignedIn || !userClerk.isLoaded) return;
			fetchUser();
		}, [userClerk]);

		return (
			<div className="fixed bg-white w-full z-[1] shadow-lg">
				<nav className="max-w-7xl flex justify-between items-center font-poppins font-normal text-[#333] mx-auto p-4 px-10 md:px-12 xl:px-0">
					<Link to={'/'}>
						<h1 className="flex items-center justify-center gap-2 text-sm sm:text-xl">
							Mestres_Online <img src={logo} alt="logo" className="w-6 h-6 sm:w-10 sm:h-10" />
						</h1>
					</Link>

					<div className="hidden md:flex justify-end items-center md:ml-10 w-full">
						<div className="w-full">
							<ul className="flex gap-6 justify-end items-center">
								{/* 				<li>
								<Button
									variant={"link"}
									className="text-[#333] text-md"
									onClick={() => integrationRef? scrollToSection(integrationRef) : ''}
								>
									Integração de API
								</Button>
							</li> */}
								<li className="max-w-[400px] w-full">
									<SearchProfileModal />
								</li>
								<li>
									<Link to={"/myProfiles"}>
										<Button variant={"link"} className="text-[#333] text-md">
										Nova Publicação
										</Button>
									</Link>
								</li>
							</ul>
						</div>

						<div className="items-center ml-8">
							<SignedIn>
								<UserButton></UserButton>
							</SignedIn>
							<SignedOut>
								<SignInButton mode="modal">
									<Button variant={"outlineWhite"}>login</Button>
								</SignInButton>
							</SignedOut>
						</div>
					</div>

					<div className="flex justify-center items-center">
						<div className="md:hidden">
							<SearchProfileModal>
								<MagnifyingGlassIcon className="w-10 h-10 mt-2 mr-6" />
							</SearchProfileModal>
						</div>
						<Sheet open={isOpen}>
							<SheetTrigger className="md:hidden">
								<Hamburger
									toggled={isOpen}
									toggle={setOpen}
									color="black"
									rounded={true}
								/>
							</SheetTrigger>
							<SheetContent
								className=""
								closeButton={
									<Hamburger
										toggled={isOpen}
										toggle={setOpen}
										color="black"
										rounded={true}
									/>
								}
							>
								<div className="flex flex-col justify-between items-center h-full">
									<SheetHeader className="w-full">
										<SheetTitle>
											<img src={logo} alt="logo" className="w-10 h-10" />
										</SheetTitle>
										<div className=" w-full">
											<div className=" flex flex-col items-center justify-center border-b-2 pb-2">
												<SignedIn>
													<UserButton showName={true} />
													{loading ? (
														<Spinner size={"small"} />
													) : user ? (
														<p className="text-muted-foreground">
															{user.subscription
																? user.subscription.description
																: "Teste grátis"}
														</p>
													) : (
														<></>
													)}
												</SignedIn>
											</div>
											<ul className="flex flex-col mt-6 gap-6">
												<li>
													<Link to={"/myProfiles"}>
														<Button variant={"default"} className="w-full">
															Nova publicação
														</Button>
													</Link>
												</li>
											</ul>
										</div>
									</SheetHeader>

									<SheetFooter className="w-full flex !flex-col gap-4">
										<SignedIn>
											<SignOutButton>
												<Button
													variant={"outlineWhite"}
													className="w-full"
													onClick={() => {
														setUser(undefined);
														setLoading(false);
													}}
												>
													Sair da conta
												</Button>
											</SignOutButton>
										</SignedIn>
										<SignedOut>
											<SignInButton mode="modal">
												<Button
													variant={"outlineWhite"}
													className="w-full"
													onClick={() => {
														setOpen(false);
													}}
												>
													login
												</Button>
											</SignInButton>
										</SignedOut>
										<p className="text-sm font-semibold text-center text-gray-400">
											<span>© Mestres_Online {new Date().getFullYear()}</span>
										</p>
									</SheetFooter>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</nav>
			</div>
		);
	};

export default CaptationPageNavbar;
