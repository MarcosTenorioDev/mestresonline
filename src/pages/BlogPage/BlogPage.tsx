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
			<div className="relative w-full h-[400px]">
				<img src="https://salvus-image-database.s3.amazonaws.com/asset-2024-08-12T23:08:27.383Z.dc64f5ee-d1bc-475d-8515-cc9780333124.image/jpeg" alt="Banner" className="object-cover w-full h-full" />
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex items-end p-6">
					<div className="max-w-7xl w-full mx-auto">
						<div className="w-full mx-auto sm:mx-0 sm:w-auto max-w-7xl">
							<div className="flex items-center flex-col sm:flex-row sm:mx-0 mx-auto text-center">
								<Avatar className="w-36 h-36 min-w-36 min-h-36 sm:mr-8">
									<AvatarImage src="/placeholder-user.jpg" alt="Profile" />
									<AvatarFallback>Nome do perfil</AvatarFallback>
								</Avatar>
								<div className="text-white">
									<h2 className="text-2xl font-bold">@thatpetra</h2>
									<p className="text-sm">Sweden | USA</p>
									<p className="text-sm">@thatpetra</p>
								</div>
							</div>
							<div className="flex flex-wrap justify-center sm:justify-start space-x-4 mt-4">
								<PlayIcon className="sm:w-12 sm:h-12 text-white" />
								<XIcon className="sm:w-12 sm:h-12 text-white" />
								<YoutubeIcon className="sm:w-12 sm:h-12 text-white" />
								<TwitchIcon className="sm:w-12 sm:h-12 text-white" />
								<InstagramIcon className="sm:w-12 sm:h-12 text-white" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="p-6 max-w-7xl mx-auto">
				<p className="">
					Hi, my name is Petra! I'm a 26-year-old Swede who recently moved to
					the USA. You can find me posting about gaming, tech, and lifestyle
					content all over my social media accounts.
					<br />
					I've been doing this for over 4 years now, and have had the pleasure
					to work with some of the biggest brands in gaming.
				</p>
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
