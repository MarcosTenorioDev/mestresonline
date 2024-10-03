import RecommendationCard from "@/components/RecommendationCard";
import CaptationPageNavbar from "@/components/shared/CaptationPageNavbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Post,
	IParagraph,
	IRecommendationCard,
} from "@/core/interfaces/posts.interface";
import { IPublicTopic } from "@/core/interfaces/topic.interface";
import { PublicService } from "@/core/services/public.service";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

const PostPage = () => {
	const publicService = new PublicService();
	const params = useParams();
	const postId = params.postId;
	const publicCode = params.publicCode;
	const [post, setPost] = useState<Post | null>(null);
	const [recommendationPost, setRecommendationPost] = useState<
		IRecommendationCard[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [loadingRecommendations, setLoadingRecommendations] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const fetchedPost = await publicService.getPublicPostsById(
					publicCode!,
					postId!
				);
				setPost(fetchedPost);
			} catch (err) {
				console.error("Erro ao buscar o post:", err);
				setError("Erro ao carregar o post. Tente novamente mais tarde.");
			} finally {
				setLoading(false);
			}
		};
		const fetchRecomendations = async () => {
			try {
				const postRecommendations = await publicService.getRecomendations(
					postId!
				);
				setRecommendationPost(postRecommendations);
			} finally {
				setLoadingRecommendations(false);
			}
		};
		fetchRecomendations();
		fetchPost();
	}, [publicCode, postId]);

	const renderParagraph = (paragraph: IParagraph, index: number) => {
		if (paragraph.type === "text") {
			return (
				<p
					key={index}
					className="text-sm sm:text-base font-semibold text-gray-500 leading-relaxed sm:leading-loose text-justify mb-4"
				>
					{paragraph.content}
				</p>
			);
		}
		if (paragraph.type === "image") {
			return (
				<img
					key={index}
					src={paragraph.content}
					alt="preview"
					className="max-h-[420px]"
				/>
			);
		}
	};

	if (loading) {
		return (
			<div className="">
				<div className="mx-auto flex flex-col items-center max-w-2xl mb-10 pb-16 px-10 md:px-0 py-14">
					<div className="flex flex-col gap-4 w-full">
						<Skeleton className="w-full h-[35px] rounded-md bg-slate-200" />
						<Skeleton className="w-full h-[35px] rounded-md bg-slate-200" />
					</div>

					<div className="w-full flex mt-4">
						<div className="w-6/12 flex justify-evenly flex-wrap gap-4">
							<Skeleton className="w-[90px] h-[25px] rounded-md bg-slate-200" />
							<Skeleton className="w-[90px] h-[25px] rounded-md bg-slate-200" />
						</div>
						<div className="w-6/12 flex justify-evenly flex-wrap gap-4">
							<Skeleton className="w-[90px] h-[25px] rounded-md bg-slate-200" />
							<Skeleton className="w-[90px] h-[25px] rounded-md bg-slate-200" />
						</div>
					</div>
					<div className="flex items-center space-x-4 w-full mt-10">
						<Skeleton className="h-12 w-12 min-w-12 min-h-12 rounded-full bg-slate-200" />
						<div className="space-y-2 w-full">
							<Skeleton className="h-4 max-w-[250px] bg-slate-200" />
							<Skeleton className="h-4 max-w-[200px] bg-slate-200" />
						</div>
					</div>
					<div className="w-full mt-8 pb-14 border-b-4">
						<Skeleton className="w-full h-[300px] rounded-md bg-slate-200" />
					</div>

					<div className="w-full mt-8 flex flex-col gap-2">
						<Skeleton className="w-full h-[20px] rounded-md bg-slate-200" />
						<Skeleton className="w-full h-[20px] rounded-md bg-slate-200" />
						<Skeleton className="w-full h-[20px] rounded-md bg-slate-200" />
						<Skeleton className="w-[80%] h-[20px] rounded-md bg-slate-200" />
					</div>
					<div className="w-full mt-8 flex flex-col gap-2">
						<Skeleton className="w-full h-[20px] rounded-md bg-slate-200" />
						<Skeleton className="w-full h-[20px] rounded-md bg-slate-200" />
						<Skeleton className="w-full h-[20px] rounded-md bg-slate-200" />
						<Skeleton className="w-[80%] h-[20px] rounded-md bg-slate-200" />
					</div>
					<div className="w-full mt-8 flex flex-col gap-2">
						<Skeleton className="w-full h-[20px] rounded-md bg-slate-200" />
						<Skeleton className="w-full h-[20px] rounded-md bg-slate-200" />
						<Skeleton className="w-full h-[20px] rounded-md bg-slate-200" />
						<Skeleton className="w-[80%] h-[20px] rounded-md bg-slate-200" />
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return <NotFound backUrl={`/${publicCode}`} buttonText="voltar para o perfil" message=" Oops! Parece que não foi possível encontrar essa postagem" statusCode="404"/>;
	}

	if (!post) {
		return null;
	}

	return (
		<div>
			<div className="pb-28">
				<CaptationPageNavbar />
			</div>

			<div className="mx-auto flex flex-col items-center max-w-2xl border-b-4 mb-10 pb-16 px-10 md:px-0">
				<h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight leading-tight sm:leading-snug lg:leading-relaxed w-full">
					{post.title}
				</h1>
				<div className="flex flex-wrap gap-2 w-full">
					{post.topics.map((topic: IPublicTopic) => (
						<Badge
							key={topic.id}
							variant={"outline"}
							className="border-primary text-primary text-nowrap my-2"
						>
							{topic.description}
						</Badge>
					))}
				</div>
				<div className="flex items-center justify-start w-full my-2">
					<Avatar className="w-14 h-14">
						<AvatarImage
							src={post.author.imageProfile}
							alt="Imagem de perfil"
						/>
						<AvatarFallback>null</AvatarFallback>
					</Avatar>
					<div className="ml-3">
						<div className="flex flex-wrap flex-row items-center gap-2">
							<div className="flex flex-wrap items-center">
								<h4 className="mr-2 font-medium text-gray-800 text-sm pb-1">
									Publicado por {post.author.name}
								</h4>
								<p className="text-xs text-gray-500">
									{post.author.office && ` ${post.author.office}`}
								</p>
							</div>
							<i className="flex items-center justify-center">
								<DotFilledIcon className="w-[6px] text-gray-400" />
							</i>
							<p className="text-xs text-gray-500">
								{new Date(post.publishedAt).toLocaleDateString()}
							</p>
						</div>
						<a
							className="mr-2 text-xs font-medium text-gray-500 hover:underline"
							href={`/${publicCode}`}
						>
							Em {post.company.name}
						</a>
					</div>
				</div>
				<h3 className="text-sm sm:text-base font-semibold text-gray-500 leading-relaxed sm:leading-loose text-justify mb-8">
					{post.contentPreview}
				</h3>
				<img src={post.imagePreview} alt="preview" className="aspect-video" />
			</div>

			<div className="mx-auto flex flex-col gap-4 items-center max-w-2xl px-10 md:px-0">
				{typeof post.content === "string" &&
					JSON.parse(post.content).map(
						(paragraph: IParagraph, index: number) => {
							return renderParagraph(paragraph, index);
						}
					)}
			</div>
			{loadingRecommendations ? (
				<p>carregando recomendações</p>
			) : (
				<div className="bg-muted p-10 md:px-0">
					<div className="mx-auto flex flex-col gap-4 max-w-2xl">
						<div className="border-b pb-4">
							<Avatar className="w-14 h-14">
								<AvatarImage
									src={post.author.imageProfile}
									alt="Imagem de perfil"
								/>
								<AvatarFallback>null</AvatarFallback>
							</Avatar>
							<p className="text-lg sm:text-xl font-semibold text-gray-900 leading-relaxed sm:leading-loose text-justify">
								Escrito por {post.author.name} em{" "}
								<a className="hover:underline" href={`/${publicCode}`}>
									{post.company.name}
								</a>
							</p>
						</div>
						<div>
							<p className="text-sm sm:text-base font-semibold text-gray-700 leading-relaxed sm:leading-loose text-justify mb-10">
								Veja mais postagens em {post.company.name} :
							</p>
							<div className="flex flex-wrap gap-10">
								{recommendationPost.map((r: IRecommendationCard) => (
									<RecommendationCard post={r} key={r.id} />
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostPage;
