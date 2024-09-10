import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IPublicTopic } from "@/core/interfaces/topic.interface";
import { PublicService } from "@/core/services/public.service";
import { DotFilledIcon } from "@radix-ui/react-icons";
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
	const [topics, setTopics] = useState<IPublicTopic[]>();
	const [posts, setPosts] = useState<any[]>([]); // Adjust the type based on your post data
	const [isLoadingCompanyData, setIsLoadingCompanyData] =
		useState<boolean>(true);
	const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
	const publicService = new PublicService();
	const params = useParams();

	useEffect(() => {
		fetchCompany();
		fetchTopics();
	}, []);

	const fetchCompany = async () => {
		if (params.profile) {
			const company = await publicService.getCompanyByPublicId(params.profile);
			if (company) {
				setCompanyData(company);
				setIsLoadingCompanyData(false);
			}
		}
	};

	const fetchTopics = async () => {
		if (params.profile) {
			const topics = await publicService.getTopicsByPublicId(params.profile);
			if (topics) {
				setTopics(topics);
				// Fetch posts for the default topic
				fetchAllPosts();
			}
		}
	};

	const fetchPosts = async (topicId: string) => {
		setIsLoadingPosts(true);
		if (params.profile) {
			const posts = await publicService.getPublicPostsByTopicId(
				params.profile,
				topicId
			);
			if (posts) {
				setPosts(posts);
				setIsLoadingPosts(false);
			}
		}
	};

	const fetchAllPosts = async () => {
		setIsLoadingPosts(true);
		if (params.profile) {
			const posts = await publicService.getPostsByPublicId(params.profile);
			if (posts) {
				setPosts(posts);
				setIsLoadingPosts(false);
			}
		}
	};

	const handleTabChange = (topicId: string) => {
		if (topicId === "all") {
			fetchAllPosts();
			return;
		}
		fetchPosts(topicId);
	};

	const TopicsLoading = () => {
		return (
			<>
				<div className="flex gap-4 justify-between py-4 px-10">
					<Skeleton className="w-[200px] h-[25px] bg-muted" />
					<Skeleton className="w-[200px] h-[25px] bg-muted" />
					<Skeleton className="w-[200px] h-[25px] bg-muted" />
					<Skeleton className="w-[200px] h-[25px] bg-muted" />
					<Skeleton className="w-[200px] h-[25px] bg-muted" />
				</div>
			</>
		);
	};

	const PostsLoading = () => {
		return (
			<>
				<div className="flex gap-4 justify-between py-4 px-10">
					<Skeleton className="w-[200px] h-[25px] bg-muted" />
					<Skeleton className="w-[200px] h-[25px] bg-muted" />
					<Skeleton className="w-[200px] h-[25px] bg-muted" />
					<Skeleton className="w-[200px] h-[25px] bg-muted" />
					<Skeleton className="w-[200px] h-[25px] bg-muted" />
				</div>
			</>
		);
	};

	return (
		<div>
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
						{topics ? (
							<>
								<Tabs defaultValue="all" onValueChange={handleTabChange}>
									<TabsList
										variant={"underline"}
										className="overflow-x-auto py-10 overflow-y-hidden"
									>
										<TabsTrigger
											variant={"underline"}
											value="all"
											className="font-semibold text-black px-10 py-[29px]"
										>
											Todos
										</TabsTrigger>
										{topics.map((topic: IPublicTopic) => (
											<TabsTrigger
												key={topic.id}
												variant={"underline"}
												value={topic.id}
												className="font-semibold text-black px-10 py-[29px]"
											>
												{topic.description}
											</TabsTrigger>
										))}
									</TabsList>

									{topics.map((topic: IPublicTopic) => (
										<TabsContent key={topic.id} value={topic.id}>
											{isLoadingPosts ? (
												<PostsLoading />
											) : (
												<div className="flex flex-col gap-10 mt-10">
												{posts.map((post) => (
													<Card className="lg:max-w-[1000px] border-2 px-4 sm:px-10 py-6 lg:flex-row items-center justify-between transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
														<div className="flex flex-col xl:flex-row items-center xl:items-start justify-between w-full">
															<div className="mr-6 w-full sm:w-auto sm:mx-0 mx-auto">
																<CardHeader className="flex sm:flex-row sm:gap-3 px-0 xl:p-0">
																	<Avatar className="w-14 h-14 mx-auto sm:mx-0">
																		<AvatarImage
																			src={post.author.imageProfile}
																			alt="Imagem de perfil"
																		/>
																		<AvatarFallback>null</AvatarFallback>
																	</Avatar>
																	<div className="ml-1">
																		<div className="flex flex-col sm:flex-row items-center gap-1">
																			<div className="flex flex-nowrap justify-center items-center">
																				<h4 className="mr-1">
																					{post.author.name}
																				</h4>
																				<p className="text-xs text-muted-foreground">
																					-{" "}
																					{post.author.office &&
																						post.author.office}
																				</p>
																			</div>
																			<i className="flex items-center justify-center">
																				<DotFilledIcon className="w-[10px] text-muted-foreground" />
																			</i>
																			<p className="text-xs text-muted-foreground">
																				{new Date(
																					post.publishedAt
																				).toLocaleDateString()}
																			</p>
																		</div>
																		<div className="flex gap-1 mt-1 flex-wrap justify-center sm:justify-start">
																			{post.topics.reduce(
																				(
																					acc: any[],
																					topic: IPublicTopic,
																				) => {
																					acc.push(
																						<Badge
																						variant={"outline"}
																							key={topic.id}
																						>
																							{topic.description}
																						</Badge>
																					);
																					return acc;
																				},
																				[]
																			)}
																		</div>
																	</div>
																</CardHeader>
																<div>
																	<h2 className="text-md text-center md:text-start sm:text-lg md:text-2xl font-bold mt-4">
																		{post.title}
																	</h2>
																	<h3 className="text-xs text-center md:text-justify sm:text-sm font-normal mt-4">
																		{post.contentPreview}
																	</h3>
																</div>
															</div>
															<div className="md:ml-10 my-auto">
																<img
																	src={post.imagePreview}
																	alt="pré visualização da imagem"
																	className="w-[350px] aspect-video md:min-w-[350px] mt-5 xl:mt-0"
																/>
															</div>
														</div>
													</Card>
												))}
											</div>
											)}
										</TabsContent>
									))}
									<TabsContent value="all">
										{isLoadingPosts ? (
											<PostsLoading />
										) : (
											<div className="flex flex-col gap-10 mt-10">
												{posts.map((post) => (
													<Card className="lg:max-w-[1000px] border-2 px-4 sm:px-10 py-6 lg:flex-row items-center justify-between transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
														<div className="flex flex-col xl:flex-row items-center xl:items-start justify-between w-full">
															<div className="mr-6 w-full sm:w-auto sm:mx-0 mx-auto">
																<CardHeader className="flex sm:flex-row sm:gap-3 px-0 xl:p-0">
																	<Avatar className="w-14 h-14 mx-auto sm:mx-0">
																		<AvatarImage
																			src={post.author.imageProfile}
																			alt="Imagem de perfil"
																		/>
																		<AvatarFallback>null</AvatarFallback>
																	</Avatar>
																	<div className="ml-1">
																		<div className="flex flex-col sm:flex-row items-center gap-1">
																			<div className="flex flex-nowrap justify-center items-center">
																				<h4 className="mr-1">
																					{post.author.name}
																				</h4>
																				<p className="text-xs text-muted-foreground">
																					-{" "}
																					{post.author.office &&
																						post.author.office}
																				</p>
																			</div>
																			<i className="flex items-center justify-center">
																				<DotFilledIcon className="w-[10px] text-muted-foreground" />
																			</i>
																			<p className="text-xs text-muted-foreground">
																				{new Date(
																					post.publishedAt
																				).toLocaleDateString()}
																			</p>
																		</div>
																		<div className="flex gap-1 mt-1 flex-wrap justify-center sm:justify-start">
																			{post.topics.reduce(
																				(
																					acc: any[],
																					topic: IPublicTopic,
																				) => {
																					acc.push(
																						<Badge
																						variant={"outline"}
																							key={topic.id}
																						>
																							{topic.description}
																						</Badge>
																					);
																					return acc;
																				},
																				[]
																			)}
																		</div>
																	</div>
																</CardHeader>
																<div>
																	<h2 className="text-md text-center md:text-start sm:text-lg md:text-2xl font-bold mt-4">
																		{post.title}
																	</h2>
																	<h3 className="text-xs text-center md:text-justify sm:text-sm font-normal mt-4">
																		{post.contentPreview}
																	</h3>
																</div>
															</div>
															<div className="md:ml-10 my-auto">
																<img
																	src={post.imagePreview}
																	alt="pré visualização da imagem"
																	className="w-[350px] aspect-video md:min-w-[350px] mt-5 xl:mt-0"
																/>
															</div>
														</div>
													</Card>
												))}
											</div>
										)}
									</TabsContent>
								</Tabs>
							</>
						) : (
							<TopicsLoading />
						)}
					</div>
				</>
			)}
		</div>
	);
}
