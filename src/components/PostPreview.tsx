import { IPost } from "@/core/interfaces/posts.interface";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardHeader } from "./ui/card";

const PostPreview = ({ post }: { post: IPost }) => {
	console.log(post);
	return (
		<Card className="lg:max-w-[1000px] px-10 py-6 lg:flex-row items-center justify-between">
			<div className="w-full flex justify-end">
				<div className={`${post.isActive ? 'bg-green-500/30 text-green-600':'bg-red-500/30 text-red-600'} py-1 px-6 rounded-full font-semibold`}>
				{post.isActive ? "Ativo" : "inativo"}
				</div>
			</div>
			<div className="flex flex-col lg:flex-row items-center justify-between w-full">
				<div className="max-w-[500px] mr-6">
					<CardHeader className="flex px-0">
						<Avatar className="w-14 h-14 mx-auto sm:mx-0">
							<AvatarImage
								src={post.author.imageProfile}
								alt="Imagem de perfil"
							/>
							<AvatarFallback>null</AvatarFallback>
						</Avatar>
						<div className="ml-1">
							<div className="flex flex-col sm:flex-row items-center gap-1">
								<h4 className="">{post.author.name}</h4>
								<p className="text-xs text-muted-foreground">
									- {post.author.office && post.author.office}
								</p>
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
						<h2 className="text-md sm:text-lg md:text-2xl font-bold mt-4">
							{post.title}
						</h2>
						<h3 className="text-xs sm:text-sm font-normal mt-4">
							{post.contentPreview}
						</h3>
					</div>
				</div>
				<div>
					<img
						src={post.imagePreview}
						alt="pré visualização da imagem"
						className="w-[350px] aspect-video md:min-w-[350px] mt-5 lg:mt-0"
					/>
				</div>
			</div>
		</Card>
	);
};

export default PostPreview;
