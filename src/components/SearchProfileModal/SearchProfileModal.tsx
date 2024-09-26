import { useState, useEffect } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import SearchInput from "../shared/SearchInput";
import CompaniesService from "@/core/services/companies.service";
import { CompanySearch } from "@/core/interfaces/company.interface";
import CompaniesProfilePreview from "../CompaniesProfilePreview/CompaniesProfilePreview";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Spinner } from "../ui/loading-spinner";

export function SearchProfileModal({ children }:any) {
	const companyService = new CompaniesService();
	const [searchTerm, setSearchTerm] = useState("");
	const [companies, setCompanies] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const debounceTimeout = setTimeout(async () => {
			if (searchTerm.trim() !== "") {
				try {
					setLoading(true);
					const result = await companyService.getCompanyByName(searchTerm);
					setCompanies(result);
				} catch (error) {
				} finally {
					setLoading(false);
				}
				return;
			}
			setCompanies([]);
		}, 500);

		return () => clearTimeout(debounceTimeout);
	}, [searchTerm]);

	return (
		<Dialog>
			<DialogTrigger className="w-full">
				{children ?? (
					<SearchInput
						placeholder="Pesquisar perfil ou publicação"
						className="border"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				)}
			</DialogTrigger>
			<DialogContent
				className="p-0 gap-0 h-full w-full max-w-full sm:max-w-[600px] sm:h-[500px] overflow-auto flex flex-col"
				hiddenCloseBtn={true}
			>
				<DialogHeader className="flex flex-row">
					<SearchInput
						placeholder="Pesquisar perfil ou publicação"
						className="border-0 border-b rounded-none shadow-none bg-transparent p-7 pl-12"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					{loading && (
						<div className="border-b flex items-center justify-center">
							<Spinner size="small" className=" mr-4 text-muted-foreground" />
						</div>
					)}
					<DialogClose className="sm:hidden border-b pr-6 font-semibold">
						Cancelar
					</DialogClose>
				</DialogHeader>
				<div className="flex flex-col h-[400px]">
					{companies.length ? (
						companies.map((company: CompanySearch) => (
							<CompaniesProfilePreview
								postsCount={company._count.posts}
								banner={company.banner}
								description={company.description}
								image={company.image}
								name={company.name}
								publicCode={company.publicCode}
							/>
						))
					) : (
						<div className="w-full h-full flex flex-col justify-center items-center">
							<MagnifyingGlassIcon className="w-10 h-10 text-muted-foreground" />
							<p className="text-muted-foreground">Busque os mestres online</p>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
