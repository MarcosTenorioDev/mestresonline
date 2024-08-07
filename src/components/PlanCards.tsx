import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const PlanCard = ({ plan }: any) => {
	const { link, price, cardTitle, features } = plan;

	return (
		<Card className="border-primary w-full max-w-[400px] mx-auto">
			<CardHeader className="text-center pb-2">
				{plan.mostEconomic && (
					<Badge className="uppercase w-max self-center mb-3">
						Mais econômico
					</Badge>
				)}
				<CardTitle className="!mb-7">{cardTitle}</CardTitle>
				<span className="font-bold text-5xl">R${price}</span>
			</CardHeader>
			<CardDescription className="text-center w-11/12 mx-auto">
				{plan.description}
			</CardDescription>
			<CardContent>
				<ul className="mt-7 space-y-2.5 text-sm">
					{features.map((feature: any, index: number) => (
						<li key={index} className="flex space-x-2">
							<CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
							<span className="text-muted-foreground">{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter>
				<Link to={link} className="w-full">
					<Button className="w-full">
						Assinar agora
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};

export default PlanCard;
