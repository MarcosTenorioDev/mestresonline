import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	useSession,
} from "@clerk/clerk-react";
import { Spinner } from "./ui/loading-spinner";
import { useEffect, useState } from "react";
import { UserService } from "@/core/services/user.service";
import { IUser } from "@/core/interfaces/user.interface";

const PlanCard = ({ plan }: any) => {
	const { link, price, cardTitle, features } = plan;
	const [user, setUser] = useState<IUser | undefined>(undefined);
	const userService = new UserService();
	const userClerk = useSession()

	useEffect(() => {
		if(user) return
		if(!userClerk || !userClerk.isSignedIn || !userClerk.isLoaded) return
		fetchUser();
	}, [userClerk]);

	const fetchUser = async () => {
		const userData = await userService.findByToken();
		setUser(userData);
	};

	return (
		<Card className="border-primary flex flex-col justify-between w-full mx-auto">
			<div>
				<CardHeader className="text-center pb-2">
					{plan.badge && (
						<Badge className="uppercase w-max self-center mb-3 cursor-default">
							{plan.badge}
						</Badge>
					)}
					<CardTitle>{cardTitle}</CardTitle>
					<span className="font-bold text-5xl">R${price}</span>
				</CardHeader>
				<CardDescription className="text-center w-11/12 mx-auto">
					{plan.description}
				</CardDescription>
				<CardContent>
					<ul className="mt-7 space-y-2.5 text-sm">
						{features.map((feature: any, index: number) => (
							<li key={index} className="flex space-x-2">
								{feature.checked ? (
									<CheckIcon className="flex-shrink-0 mt-0.5 h-5 w-5 text-green-500" />
								) : (
									<XIcon className="flex-shrink-0 mt-0.5 h-5 w-5 text-red-500" />
								)}
								<span className="text-muted-foreground">
									{feature.description}
								</span>
							</li>
						))}
					</ul>
				</CardContent>
			</div>
			<CardFooter>
				<SignedIn>
					{user ? (
						<Link
							to={`${link}?client_reference_id=${user.id}&prefilled_email=${user.email}`}
							className="w-full"
						>
							<Button className="w-full">Assinar agora</Button>
						</Link>
					) : (
						<Button disabled={true} className="w-full">
							Carregando informações{" "}
							<Spinner className="ml-4 w-5 h-5 text-white" />
						</Button>
					)}
				</SignedIn>
				<SignedOut>
					<SignInButton mode="modal" forceRedirectUrl={"/"} signUpForceRedirectUrl={"/"}>
						<Button className="w-full">Assinar agora</Button>
					</SignInButton>
				</SignedOut>
			</CardFooter>
		</Card>
	);
};

export default PlanCard;
