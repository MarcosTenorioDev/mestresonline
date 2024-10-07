import { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideNav } from "@/components/shared/sidebarComponents/Sidenav";
import { NavItems } from "@/components/constants/adminNavItems";
import { SignOutButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/images/logo.png";
import { Spinner } from "@/components/ui/loading-spinner";
import { UserService } from "@/core/services/user.service";
import { SearchProfileModal } from "@/components/SearchProfileModal/SearchProfileModal";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export const MobileSidebar = () => {
	const [open, setOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const userService = new UserService();
	const [user, setUser] = useState<any>();
	const [loading, setLoading] = useState<boolean>(true);

	const fetchUser = async () => {
		const user = await userService.findByToken();
		setUser(user);
		setLoading(false);
	};

	useEffect(() => {
		setIsMounted(true);
		fetchUser();
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<div className="flex items-center justify-between gap-2">
						<MenuIcon className="cursor-pointer" />
					</div>
				</SheetTrigger>
				<div className="flex items-center w-full justify-end">
					<div className="md:hidden mr-3">
						<SearchProfileModal>
							<MagnifyingGlassIcon className="w-7 h-7 mt-2 mr-1" />
						</SearchProfileModal>
					</div>
					<h1 className="text-lg font-semibold flex items-center justify-center">
						Mestres_Online
						<img src={logo} alt="logo" className="w-10 ml-5" />
					</h1>
				</div>
				<SheetContent
					side="left"
					className="w-72 flex flex-col justify-between"
				>
					<div>
						<div className="text-center">
							<h2
								className={`text-primary font-bold text-2xl
								`}
							>
								Mestres_Online
							</h2>
						</div>
						<div className=" flex flex-col items-center justify-center mt-6 border-b-2 pb-6">
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
						</div>
						<div className="px-1 py-6 ">
							<SideNav items={NavItems} setOpen={setOpen} />
						</div>
					</div>

					<div className="flex flex-col w-full gap-6">
						<SignOutButton>
							<Button variant={"default"} className="w-full">
								Sair da conta
							</Button>
						</SignOutButton>
						<p className="text-sm font-semibold text-center text-gray-400">
							<span>© Mestres_Online {new Date().getFullYear()}</span>
						</p>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};
