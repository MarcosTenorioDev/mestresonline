import PostPreview from "@/components/PostPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompaniesService from "@/core/services/companies.service";
import ToastService from "@/core/services/toast.service";
import { Skeleton } from "@/components/ui/skeleton";
import { ICompany } from "@/core/interfaces/company.interface";

const Home = () => {
	const params = useParams();
	const id = params.id;
	const [company, setCompany] = useState<ICompany | null>(null);
	const [posts, setPosts] = useState([]);
	const companyService = new CompaniesService();
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

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
				ToastService.showError(
					`Houve um erro ao abrir a seguradora`
				);
				setTimeout(() => {
					navigate("/");
				}, 2000);
			}
		}
	};

	const LoadingSkeleton = () => {
		return (
			<>
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
			</>
		);
	};

	return (
		<div className="max-w-screen-2xl mx-auto py-10 min-h-screen px-4 sm:px-10">
			{loading ? (
				<LoadingSkeleton />
			) : (
				<>
					{company && (
						<>
							<div className="flex flex-col sm:flex-row items-center gap-10">
								<img
									src={company.image}
									className="w-40 h-40 rounded-full"
									alt="imagem da compania"
								/>
								<h1 className="text-5xl mb-12">{company.name}</h1>
							</div>
							<div className="border-b-2 pb-10">
								<h2 className="text-2xl mt-5">Minhas postagens</h2>

								<p className="mt-6 text-xs">Pesquise suas postagens</p>
								<div className="flex">
									<Input
										className=" w-80 h-8 mr-3 border-2"
										placeholder="Pesquise pelo título, autor ou tema"
									/>
									<Button className="p-2 h-8">
										<SearchIcon className="w-4" />
									</Button>
								</div>
							</div>

							<div className="mt-8 flex flex-col gap-16">
								{posts.map((post: any) => (
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
