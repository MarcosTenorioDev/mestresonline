import { useState } from "react";
import { SideNav } from "@/components/shared/sidebarComponents/Sidenav";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/core/hooks/useSidebar";
import { ArrowLeftCircle as BsArrowLeftShort } from "lucide-react";
import { NavItems } from "@/components/constants/adminNavItems";
import logo from '@/assets/images/logo.png'

interface SidebarProps {
	className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
	const { isOpen, toggle } = useSidebar();
	const [status, setStatus] = useState(false);

	const handleToggle = () => {
		setStatus(true);
		toggle();
		setTimeout(() => setStatus(false), 500);
	};

	return (
		<nav
			className={cn(
				`relative hidden h-screen border-r pt-16 md:flex md:flex-col md:justify-between`,
				status && "duration-500",
				isOpen ? "w-72" : "w-[78px]",
				className
			)}
		>
			<BsArrowLeftShort
				className={cn(
					"absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
					!isOpen && "rotate-180"
				)}
				onClick={handleToggle}
			/>
			<div className="space-y-4 pb-4">
				<div className="px-3 pb-2">
					<div className="mt-3 space-y-1">
						<div className="text-center py-4">
							<img src={logo} alt="logo" className="w-24 mx-auto"/>
						</div>
						<SideNav
							className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
							items={NavItems}
						/>
					</div>
				</div>
			</div>
			<p
				className={`mt-4 py-6 text-sm font-semibold text-center text-gray-400 ${
					isOpen ? "" : "hidden"
				}`}
			>
				<span>
					© Mestres_Online
					{new Date().getFullYear()}
				</span>
			</p>
		</nav>
	);
}
