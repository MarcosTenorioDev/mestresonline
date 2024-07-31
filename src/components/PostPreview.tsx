import { IPost } from "@/core/interfaces/posts.interface";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardHeader } from "./ui/card";
import { useNavigate } from "react-router-dom";

const PostPreview = ({ post }: { post: IPost }) => {
	const navigate = useNavigate();
	return (
		<Card
			className="lg:max-w-[1000px] px-4 sm:px-10 py-6 lg:flex-row items-center justify-between transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
			onClick={() => navigate(`/publication/${post.companyId}?post=${post.id}`)}
		>
			<div className="w-full flex justify-end">
				<div
					className={`${
						post.isActive
							? "bg-green-500/30 text-green-600"
							: "bg-red-500/30 text-red-600"
					} py-1 px-6 rounded-full font-semibold mb-4`}
				>
					{post.isActive ? "Ativo" : "Inativo"}
				</div>
			</div>
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
									<h4 className="mr-1">{post.author.name}</h4>
									<p className="text-xs text-muted-foreground">
										- {post.author.office && post.author.office}
									</p>
								</div>
								<i className="flex items-center justify-center">
									<DotFilledIcon className="w-[10px] text-muted-foreground" />
								</i>
								<p className="text-xs text-muted-foreground">
									{new Date(post.publishedAt).toLocaleDateString()}
								</p>
							</div>
							<div className="flex gap-1 flex-wrap justify-center sm:justify-start">
								{post.topics.reduce((acc: any[], topic: any, index: number) => {
									if (index > 0) {
										acc.push(
											<span
												key={`separator-${index}`}
												className="text-muted-foreground text-xs"
											>
												-
											</span>
										);
									}
									acc.push(
										<p
											key={topic.topic.id}
											className="text-muted-foreground text-xs"
										>
											{topic.topic.description}
										</p>
									);
									return acc;
								}, [])}
							</div>
						</div>
					</CardHeader>
					<div>
						<h2 className="text-md text-center md:text-start sm:text-lg md:text-2xl font-bold mt-4">
							{post.title}
						</h2>
						<h3 className="text-xs text-center md:text-start sm:text-sm font-normal mt-4">
							{post.contentPreview}
						</h3>
					</div>
				</div>
				<div>
					<img
						src={post.imagePreview}
						alt="pré visualização da imagem"
						className="w-[350px] aspect-video md:min-w-[350px] mt-5 xl:mt-0"
					/>
				</div>
			</div>
		</Card>
	);
};

export default PostPreview;
