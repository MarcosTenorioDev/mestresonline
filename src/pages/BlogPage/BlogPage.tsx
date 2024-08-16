import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/* const LoadingSkeleton = () => {
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
	</div>;
}; */

export default function Component() {
	return (
		<>
			<div
				className="w-full bg-cover bg-center"
				style={{ backgroundImage: "url('https://salvus-image-database.s3.amazonaws.com/asset-2024-08-12T23:08:27.383Z.dc64f5ee-d1bc-475d-8515-cc9780333124.image/jpeg')" }}
			>
				<div className="flex flex-col items-center p-6 space-y-4 text-white bg-gradient-to-t from-black/90 via-black/70 to-transparent">
					<Avatar className="w-32 h-32 border-4 border-white rounded-full">
						<AvatarImage src="/placeholder-user.jpg" alt="Profile Image" />
						<AvatarFallback>TP</AvatarFallback>
					</Avatar>
					<div className="text-center">
						<h1 className="text-2xl font-bold">@thatpetra</h1>
						<p className="text-sm">Sweden | USA | @thatpetra</p>
					</div>
					<div className="flex flex-col items-center space-y-2">
					
						<div className="text-center">
							<p className="text-sm">
								Hi, my name is Petra! I'm a 26-year-old Swede who recently moved
								to the USA. You can find me posting about gaming, tech, and
								lifestyle content all over my social media accounts.
							</p>
							<p className="text-sm">
								I have been doing this for over 4 years now, and have had the
								pleasure to work with some of the biggest brands in gaming.
							</p>
						</div>
					</div>
					<div className="flex flex-wrap justify-center space-x-4">
						<PlayIcon className="w-12 h-12 text-white" />
						<XIcon className="w-12 h-12 text-white" />
						<YoutubeIcon className="w-12 h-12 text-white" />
						<TwitchIcon className="w-12 h-12 text-white" />
						<InstagramIcon className="w-12 h-12 text-white" />
					</div>
				</div>
			</div>
		</>
	);
}

function InstagramIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
			<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
		</svg>
	);
}

function PlayIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polygon points="6 3 20 12 6 21 6 3" />
		</svg>
	);
}

function TwitchIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
		</svg>
	);
}

function XIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	);
}

function YoutubeIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
			<path d="m10 15 5-3-5-3z" />
		</svg>
	);
}
