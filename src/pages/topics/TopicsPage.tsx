import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableCaption,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { ITopic } from "@/core/interfaces/topic.interface";
import CompaniesService from "@/core/services/companies.service";
import ToastService from "@/core/services/toast.service";
import { TopicService } from "@/core/services/topic.service";
import { PenBoxIcon, SearchIcon, Trash2Icon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TopicsPage = () => {
	const params = useParams();
	const id = params.id;
	const companyServices = new CompaniesService();
	const [topics, setTopics] = useState<ITopic[]>([]);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
    const topicService = new TopicService()

	useEffect(() => {
		fetchTopics();
	}, []);

	const fetchTopics = async () => {
		if (id) {
			const data = await companyServices.getAllTopicsByCompanyId(id);
			setTopics(data);
		}
	};

	const filteredTopic = topics.filter((topic: ITopic) =>
		topic.description.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const deleteTopicById = async (id: string) => {
        setIsDeleting(true)
		try {
            await topicService.deleteTopicById(id)
            ToastService.showSuccess("Tópico excluído com sucesso")
		} catch (error:any) {
			ToastService.showError(
				`Houve um erro ao excluir o respectivo tópico ${error.message}`
			);
		}finally{
            setIsDeleting(false)
        }
	};

	const DeleteDialog = (props: { topic: ITopic }) => {
		const { topic } = props;

		return (
			<AlertDialog>
				<Button asChild variant={"destructive"} disabled={isDeleting}>
					<AlertDialogTrigger>
						<Trash2Icon />
					</AlertDialogTrigger>
				</Button>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
						<AlertDialogDescription>
							Essa ação não pode ser desfeita, uma vez que o tópico tenha sido
							excluído, deverá ser criado novamente um novo tópico.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<Button
							asChild
							variant={"destructive"}
							onClick={() => deleteTopicById(topic.id)}
						>
							<AlertDialogAction>Confirmar Exclusão</AlertDialogAction>
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	};

	return (
		<div className="max-w-screen-2xl mx-auto p-10 pb-40">
			<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Cadastrar novo Tópico</h1>
			<div className="relative flex w-full max-w-lg items-center space-x-2">
				<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 ml-2" />
				<Input
					className="max-w-xl border-primary w-full py-2 pl-12 pr-16 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
					placeholder="Pesquisar autores..."
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
			<Table>
				<TableCaption>A Lista tópicos da Clinica Ativamente</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Nome</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredTopic.map((topic: ITopic) => (
						<TableRow key={topic.id}>
							<TableCell>{topic.description}</TableCell>
							<TableCell className="w-20">
								<Button variant={"outlineWhite"}>
									<PenBoxIcon />
								</Button>
							</TableCell>
							<TableCell className="w-20">
								<DeleteDialog topic={topic} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default TopicsPage;
