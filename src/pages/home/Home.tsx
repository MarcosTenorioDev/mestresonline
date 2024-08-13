import PostPreview from "@/components/PostPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompaniesService from "@/core/services/companies.service";
import ToastService from "@/core/services/toast.service";
import { Skeleton } from "@/components/ui/skeleton";
import { ICompany } from "@/core/interfaces/company.interface";
import { IPost } from "@/core/interfaces/posts.interface";
import placeholder from "@/assets/images/placeholder.png";
import EditCompanyButton from "@/components/EditCompanyButton";
import EditPublicCodeButton from "@/components/EditPublicCodeButton";

const Home = () => {
	const params = useParams();
	const id = params.id;
	const [company, setCompany] = useState<ICompany | null>(null);
	const [posts, setPosts] = useState([]);
	const companyService = new CompaniesService();
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState<string>("");

	const filteredPosts = posts.filter((post: IPost) =>
		post.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		fetchAgency();
	}, []);

	const fetchAgency = async () => {
		if (id) {
			setLoading(true);
			try {
				const result = await companyService.getCompanyById(id);
				setCompany(result);
				setPosts(result.posts);
				setLoading(false);
			} catch (error: any) {
				ToastService.showError(`Houve um erro ao abrir a seguradora`);
				setTimeout(() => {
					navigate("/myProfiles");
				}, 2000);
			}
		}
	};

	const updatePublicCode = async (values:any) =>{
		try{
			const payload = {
				companyId:id!,
				publicCode:values.UpdatedPublicCode
			}
			await companyService.updatePublicCode(payload)
			ToastService.showSuccess("URL pública alterada com sucesso!")
			fetchAgency()
		}catch(err){
			ToastService.showError("Houve um erro ao editar a URL pública do perfil, por favor contate o suporte técnico")
		}
	}

	const LoadingSkeleton = () => {
		return (
			<div className="p-10">
				<div className="flex gap-10">
					<Skeleton className="w-40 h-40 bg-gray-200 rounded-full"></Skeleton>
					<div className="flex flex-col gap-5 w-full">
						<Skeleton className="h-8 bg-gray-200 w-full"></Skeleton>
						<Skeleton className="h-8 bg-gray-200 w-full"></Skeleton>
						<Skeleton className="h-8 bg-gray-200 w-full"></Skeleton>
					</div>
				</div>
				<Skeleton className="h-2 bg-gray-200 w-full my-10"></Skeleton>
				<div className="flex flex-col gap-12 flex-1">
					<Skeleton className="h-28 bg-gray-200 rounded w-full"></Skeleton>
					<Skeleton className="h-28 bg-gray-200 rounded w-full"></Skeleton>
					<Skeleton className="h-28 bg-gray-200 rounded w-full"></Skeleton>
					<Skeleton className="h-28 bg-gray-200 rounded w-full"></Skeleton>
				</div>
			</div>
		);
	};

	return (
		<div className="mx-auto pb-10 min-h-screen">
			{loading ? (
				<LoadingSkeleton />
			) : (
				<>
					{company && (
						<>
							<div className="relative w-full h-[500px]">
								<img
									src={company.banner ? company.banner : placeholder}
									className="aspect-video w-full h-full object-cover"
									alt="banner do perfil"
									style={{
										maskImage:
											"linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
										WebkitMaskImage:
											"linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
									}}
								/>
								<div className="w-full flex flex-col sm:flex-row items-center gap-10 absolute bottom-2 px-4 sm:px-10">
									<img
										src={company.image}
										className="w-40 h-40 rounded-full"
										alt="imagem do perfil"
									/>
									<div className="flex gap-2">
										<h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
											{company.name}
										</h1>
										<EditCompanyButton company={company} />
									</div>
								</div>
							</div>

							<div className="border-b-2 pb-10 px-4 sm:px-10">
								<p className="text-xl tracking-tight my-4">
									URL para perfil público:{" "}
									<a
										className="text-sm hover:underline font-semibold"
										href={`https://mestresonline.vercel.app/${company.publicCode}`}
										target="blank"
									>
										https://mestresonline.vercel.app/{company.publicCode}
									</a>
									<div
										id="alert-5"
										className="flex items-center rounded-lg"
										role="alert"
									>
										<svg
											className="flex-shrink-0 w-4 h-4"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="gray"
											viewBox="0 0 20 20"
										>
											<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
										</svg>
										<span className="sr-only">Info</span>
										<div className="ms-3 text-sm font-medium text-muted-foreground">
											<EditPublicCodeButton publicCode={company.publicCode} onSubmit={(values:any) => updatePublicCode(values)} isPaidSubscription={company.isPaidSubscription}/>
										</div>
									</div>
								</p>

								<h3 className="text-sm font-normal tracking-tight">
									{company.description}
								</h3>
								<h2 className="text-2xl mt-5">Minhas postagens</h2>

								<p className="mt-6 text-sm font-semibold mb-2">
									Pesquise suas postagens
								</p>
								<div className="relative flex w-full max-w-lg items-center">
									<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 ml-2" />
									<Input
										className="max-w-xl border-primary w-full py-2 pl-12 pr-16 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
										placeholder="Pesquisar tópicos..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className={`absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 ${
											searchTerm ? "" : "hidden"
										}`}
										onClick={() => setSearchTerm("")}
									>
										<XIcon className="h-4 w-4" />
										<span className="sr-only">Clear</span>
									</Button>
								</div>
							</div>

							<div className="mt-8 flex flex-col gap-16 px-4 sm:px-10">
								{filteredPosts.map((post: any) => (
									<PostPreview key={post.id} post={post} />
								))}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Home;
