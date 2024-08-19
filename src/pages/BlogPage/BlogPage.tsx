import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublicService } from "@/core/services/public.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LoadingSkeleton = () => {
	return (
		<div className=" text-white bg-gradient-to-b from-gray-400/90 via-from-gray-400/60 to-transparent h-screen">
			<div className="w-full max-w-7xl flex flex-col items-center p-6 space-y-10 mx-auto">
				<div className="flex items-center space-x-4 w-full">
					<Skeleton className="h-32 w-32 min-h-32 min-w-32 rounded-full" />
					<div className="space-y-4 w-full">
						<Skeleton className="h-8 w-full" />
						<Skeleton className="h-8  w-full" />
					</div>
				</div>
				<div className="space-y-2 w-full">
					<Skeleton className="h-20 w-full" />
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
				</div>
				<div className="flex items-center space-x-4 w-full">
					<div className="space-y-2 w-full">
						<Skeleton className="h-6 w-full" />
						<Skeleton className="h-6 w-full" />
					</div>
					<div className="grid grid-cols-4 gap-[5%] w-full">
						<Skeleton className="h-6 w-full" />
						<Skeleton className="h-6 w-full" />
						<Skeleton className="h-6 w-full" />
						<Skeleton className="h-6 w-full" />
					</div>
				</div>
				<div className="space-y-2 w-full">
					<Skeleton className="h-16 w-full" />
					<Skeleton className="h-16 w-full" />
				</div>
			</div>
		</div>
	);
};
interface ICompanyData {
	name: string;
	image: string;
	description: string;
	publicCode: string;
	banner: string;
}
export default function Component() {
	const [companyData, setCompanyData] = useState<ICompanyData>();
	const [isLoadingCompanyData, setIsLoadingCompanyData] =
		useState<boolean>(true);
	const publicService = new PublicService();
	const params = useParams();

	useEffect(() => {
		fetchCompany();
	}, []);

	const fetchCompany = async () => {
		if (params.profile) {
			const company = await publicService.getCompanyByPublicId(params.profile);
			if (company) {
				setIsLoadingCompanyData(false);
			}
			console.log(company);
			setCompanyData(company);
		}
	};
	return (
		<>
			{isLoadingCompanyData && companyData ? (
				<LoadingSkeleton />
			) : (
				<>
					<div
						className="w-full bg-cover bg-center"
						style={{
							backgroundImage: `url(${companyData?.banner})`,
						}}
					>
						<div className="flex flex-col items-center p-6 space-y-4 text-white bg-gradient-to-t from-black/90 via-black/70 to-transparent">
							<Avatar className="w-32 h-32 border-4 border-white rounded-full">
								<AvatarImage src={companyData?.image} alt="Profile Image" />
								<AvatarFallback>TP</AvatarFallback>
							</Avatar>
							<div className="text-center">
								<h1 className="text-2xl font-bold">{companyData?.name}</h1>
								{/* 							<p className="text-sm">Sweden | USA | @thatpetra</p>
								 */}{" "}
							</div>
							<div className="flex flex-col items-center space-y-2">
								<div className="text-center">
									<p className="text-md font-semibold leading-relaxed max-w-6xl mx-auto px-4">
										{companyData?.description}
									</p>
								</div>
							</div>
							{/* <div className="flex flex-wrap justify-center space-x-4">
							<PlayIcon className="w-12 h-12 text-white" />
							<XIcon className="w-12 h-12 text-white" />
							<YoutubeIcon className="w-12 h-12 text-white" />
							<TwitchIcon className="w-12 h-12 text-white" />
							<InstagramIcon className="w-12 h-12 text-white" />
						</div> */}
						</div>
					</div>

					<div className="w-full mx-auto max-w-7xl">
					<Tabs defaultValue="account" className="w-[400px]">
						<TabsList>
							<TabsTrigger value="account">Account</TabsTrigger>
							<TabsTrigger value="password">Password</TabsTrigger>
						</TabsList>
						<TabsContent value="account">
							Make changes to your account here.
						</TabsContent>
						<TabsContent value="password">
							Change your password here.
						</TabsContent>
					</Tabs>
					</div>
				</>
			)}
		</>
	);
}