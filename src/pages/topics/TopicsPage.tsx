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
import { Input as FormikInput } from "@/components/shared/Inputs";
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
import { Form, Formik } from "formik";
import { PlusIcon } from "lucide-react";
import { PenBoxIcon, SearchIcon, Trash2Icon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const TopicsPage = () => {
	const params = useParams();
	const id = params.id;
	const companyServices = new CompaniesService();
	const [topics, setTopics] = useState<ITopic[]>([]);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const topicService = new TopicService();

	useEffect(() => {
		fetchTopics();
	}, []);

	const fetchTopics = async () => {
		if (id) {
			const data = await companyServices.getAllTopicsByCompanyId(id);
			setTopics(data);
			setIsDeleting(false);
			return;
		}
		setIsDeleting(false);
	};

	const filteredTopic = topics.filter((topic: ITopic) =>
		topic.description.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const deleteTopicById = async (id: string) => {
		setIsDeleting(true);
		try {
			await topicService.deleteTopicById(id);
			ToastService.showSuccess("Tópico excluído com sucesso");
		} catch (error: any) {
			ToastService.showError(
				`Houve um erro ao excluir o respectivo tópico ${error.message}`
			);
		} finally {
			fetchTopics();
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

	const TopicDialog = (props?: { topic: ITopic | null }) => {
		const initialValues = {
			id: props?.topic?.id || params.id,
			companyId: props?.topic?.companyId || "",
			description: props?.topic?.description || "",
		};

		const validationSchema = Yup.object({
			id: Yup.string(),
			companyId: Yup.string(),
			description: Yup.string().required(
				"É obrigatório uma descrição do tópico"
			),
		});

		const onSubmit = async (values: any) => {
			const { id, companyId, description } = values;

			try {
				if(props?.topic){
					const payload = {
						id,
						companyId,
						description,
					};
					await topicService.updateTopic(payload)
					ToastService.showSuccess(`Tópico editado com sucesso`);
					return
				}
				const payload = {
					companyId:id,
					description,
				};
				await topicService.createTopic(payload)
				ToastService.showSuccess(`Tópico criado com sucesso`);
				return
			} catch (err) {
				ToastService.showError(`Houve um erro ao ${props?.topic ? "editar" : "criar"} o Tópico`);
			}finally{
				fetchTopics()
			}
			return;
		};

		return (
			<AlertDialog>
				<Button
					asChild
					variant={props?.topic ? "outlineWhite" : "default"}
					className={props?.topic ? "" : "mb-4"}
				>
					<AlertDialogTrigger>
						{props?.topic ? (
							<PenBoxIcon />
						) : (
							<>
								Criar novo tópico <PlusIcon />
							</>
						)}
					</AlertDialogTrigger>
				</Button>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-2xl font-semibold">
							{props?.topic?.id ? "Editando tópico" : "Criar novo tópico"}
						</AlertDialogTitle>
					</AlertDialogHeader>
					<div >
						<Formik
							initialValues={initialValues}
							onSubmit={onSubmit}
							validationSchema={validationSchema}
						>
							<Form>
								<FormikInput
									control="description"
									placeholder="Insira a descrição do tópico"
								>
									Descrição do tópico
								</FormikInput>

								<AlertDialogFooter className="mt-10">
									<AlertDialogCancel>Cancelar</AlertDialogCancel>
									<Button
										asChild
										variant={"default"}
										type="submit"
										onClick={() => {}}
									>
										<AlertDialogAction>{props?.topic?.id ? "Editar" : "Criar"}</AlertDialogAction>
									</Button>
								</AlertDialogFooter>
							</Form>
						</Formik>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		);
	};

	return (
		<div className="max-w-screen-2xl mx-auto p-10 pb-40">
			<div className="flex flex-col sm:flex-row justify-between items-center">
				<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
					Cadastrar novo Tópico
				</h1>
				<TopicDialog topic={null} />
			</div>
			<div className="relative flex w-full max-w-lg items-center space-x-2">
				<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 ml-2" />
				<Input
					className="max-w-xl border-primary w-full py-2 pl-12 pr-16 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
					placeholder="Pesquisar tópicos..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<AlertDialog></AlertDialog>
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
			<Table className="mt-4">
				<TableCaption>A Lista tópicos da Clinica Ativamente</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Nome</TableHead>
						<TableHead>Editar</TableHead>
						<TableHead>Excluir</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredTopic.map((topic: ITopic) => (
						<TableRow key={topic.id}>
							<TableCell>{topic.description}</TableCell>
							<TableCell className="w-20">
								<TopicDialog topic={topic} />
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
