import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/shared/sidebarComponents/Mobile-sidebar";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function Header() {
	return (
		<div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
			<nav className="flex h-16 items-center justify-between px-10">
				<Link
					to={"/managment"}
					className="hidden items-center justify-between gap-2 md:flex"
				>
					<h1 className="text-lg font-semibold">Mestres_Online</h1>
				</Link>
				<div className={cn("md:!hidden w-full flex")}>
					<MobileSidebar />
				</div>
				<div className="flex items-center justify-center gap-10">
					<div className="hidden md:block">
						<UserButton />
					</div>
				</div>
			</nav>
		</div>
	);
}
