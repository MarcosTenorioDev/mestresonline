import React from "react";
import Header from "@/components/shared/sidebarComponents/Header";
import Sidebar from "@/components/shared/sidebarComponents/Sidebar";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Auth } from "@/pages/auth/Auth";

export const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<SignedIn>
				<Header />
				<div className="flex h-screen border-collapse overflow-hidden">
					<Sidebar />
					<main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary/10 pb-1">
						{children}
					</main>
				</div>
			</SignedIn>
			<SignedOut>
			<Auth />
			</SignedOut>
		</>
	);
};
