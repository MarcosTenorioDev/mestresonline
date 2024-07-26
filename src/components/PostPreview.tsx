import { IPost } from "@/core/interfaces/posts.interface";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardHeader } from "./ui/card";

const PostPreview = ({ post }: { post: IPost }) => {
	return (
		<Card className="flex flex-col w-full lg:max-w-[1000px] px-10 py-6 lg:flex-row items-center justify-between">
			<div className="max-w-[500px] mr-6">
				<CardHeader className="flex px-0">
					<Avatar className="w-14 h-14">
						<AvatarImage
							src={post.author.imageProfile}
							alt="Imagem de perfil"
						/>
						<AvatarFallback>null</AvatarFallback>
					</Avatar>
					<div className="ml-1">
						<div className="flex items-center gap-1">
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
						<div className="flex gap-1">
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
					className="w-[350px] md:min-w-[350px] mt-5 lg:mt-0"
				/>
			</div>
		</Card>
	);
};

export default PostPreview;
