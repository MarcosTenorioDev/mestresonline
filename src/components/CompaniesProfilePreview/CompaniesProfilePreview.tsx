import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface CompaniesProfilePreviewProps extends ButtonProps {
	name: string;
	description: string;
	banner: string;
	image: string;
	publicCode: string;
	postsCount:number
}

const CompaniesProfilePreview: React.FC<CompaniesProfilePreviewProps> = ({
	name,
	description,
	banner,
	image,
	publicCode,
	postsCount,
	...buttonProps
}) => {
	const navigate = useNavigate()
	return (
		<Button
			{...buttonProps}
			variant={"ghost"}
			className="h-16 flex justify-start space-x-4 p-4"
			onClick={() => navigate(`/${publicCode}`)}
		>
			<Avatar>
				<AvatarImage
					src={image}
					alt={`${name} Profile Image`}
					className="rounded-full w-12 min-w-12 h-12"
				/>
				<AvatarFallback>TP</AvatarFallback>
			</Avatar>

			<div className="flex justify-between w-full items-center">
				<div className="flex flex-col items-start">
					<p className="font-bold text-accent-foreground text-md truncate max-w-[280px]">
						{name}
					</p>
					<p className="text-muted-foreground text-sm truncate max-w-[150px] sm:max-w-[280px]">
						{description}
					</p>
				</div>
				<p className="font-semibold text-md">{postsCount} posts...</p>
			</div>
		</Button>
	);
};

export default CompaniesProfilePreview;
