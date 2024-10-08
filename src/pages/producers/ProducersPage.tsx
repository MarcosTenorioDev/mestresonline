import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultImage from "@/assets/images/userImage.png";
import {
	CameraIcon,
	PenBoxIcon,
	SearchIcon,
	Trash2Icon,
	XIcon,
} from "lucide-react";
import {
	Table,
	TableCaption,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { IProducer } from "@/core/interfaces/producer.interface";
import CompaniesService from "@/core/services/companies.service";
import { useParams } from "react-router-dom";
import { PostService } from "@/core/services/post.service";
import { ProducerService } from "@/core/services/producer.service";
import ToastService from "@/core/services/toast.service";

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

const ProducersPage = () => {
	const [imagePreview, setImagePreview] = useState<File | null>(null);
	const companyService = new CompaniesService();
	const postService = new PostService();
	const producerService = new ProducerService();
	const params = useParams();
	const id = params.id;
	const [producers, setProducers] = useState<IProducer[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isSending, setIsSending] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchProducers();
	}, []);

	const fetchProducers = async () => {
		setIsLoading(true);
		if (id) {
			const result = await companyService.getAllProducersByCompanyId(id);
			setProducers(result);
			setIsDeleting(false);
			setIsLoading(false);
		}
		setIsLoading(false);
	};

	const initialValues = {
		email: "",
		name: "",
		imageProfile: "",
		office: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Email inválido")
			.required("Email é obrigatório *"),
		name: Yup.string().required("Nome é obrigatório *"),
		imageProfile: Yup.string(),
		office: Yup.string(),
	});

	const onSubmit = async (
		values: {
			email: string;
			name: string;
			imageProfile: string;
			office: string;
		},
		actions: FormikHelpers<any> // add this parameter
	) => {
		if (id) {
			setIsSending(true);
			const formatedImage = async () => {
				if (imagePreview) {
					const formData = new FormData();
					formData.append("file", imagePreview);
					const response = await postService.uploadFile(formData);
					return response.url;
				}
				return null;
			};

			// Aguarde a formatação da imagem
			const formattedImageUrl = await formatedImage();

			const payload = {
				companyId: id,
				email: values.email,
				name: values.name,
				imageProfile: formattedImageUrl,
				office: values.office,
			};

			try {
				await producerService.PostProducer(payload);
				ToastService.showSuccess("Autor criado com sucesso");
				setImagePreview(null)
				actions.resetForm();
			} catch (error: any) {
			} finally {
				setIsSending(false);
				fetchProducers();
			}
		}
	};

	const filteredProducers = producers.filter((producer) =>
		producer.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const deleteAuthorById = async (id: string) => {
		setIsDeleting(true);
		try {
			await producerService.DeleteProducer(id);
			ToastService.showSuccess("Autor excluído com sucesso");
		} catch (error: any) {
			ToastService.showError(
				`Houve um erro ao excluir o seu author ${error.message}`
			);
		} finally {
			fetchProducers();
		}
	};

	const DeleteDialog = (props: { producer: IProducer }) => {
		const { producer } = props;

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
							Essa ação não pode ser desfeita, uma vez que o autor tenha sido
							excluído, todos os posts criados pelo mesmo também serão.
						</AlertDialogDescription>
						<div className="text-sm text-muted-foreground">
							<div className="flex flex-col justify-center sm:flex-row sm:justify-start">
								<div>
									<p className="mb-4 font-semibold text-black">
										Dados do autor:
									</p>
									<Avatar className="w-14 h-14 mx-auto sm:mx-0">
										<AvatarImage
											src={producer.imageProfile}
											alt="Imagem de perfil"
										/>
										<AvatarFallback>null</AvatarFallback>
									</Avatar>
								</div>

								<div className="pt-8">
									<p>nome: {producer.name}</p>
									<p>email: {producer.email}</p>
									<p>{producer.office ? `cargo: ${producer.office}` : ""}</p>
								</div>
							</div>
						</div>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<Button
							asChild
							variant={"destructive"}
							onClick={() => deleteAuthorById(producer.id)}
						>
							<AlertDialogAction>Confirmar Exclusão</AlertDialogAction>
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	};

	const ProducerUpdateDialog = ({
		producer,
	}: {
		producer: IProducer | null;
	}) => {
		const formatedImage = async (image: File) => {
			if (image) {
				const formData = new FormData();
				formData.append("file", image);
				const response = await postService.uploadFile(formData);
				return response.url;
			}
			ToastService.showError(
				`Erro ao atualizar a imagem do autor, por favor, verifique o tipo do arquivo da imagem`
			);
			return null;
		};
		const [newImage, setNewImage] = useState<File>();

		const initialValues = {
			UpdatedEmail: producer ? producer.email : "",
			UpdatedName: producer ? producer.name : "",
			UpdatedImageProfile: producer ? producer.imageProfile : "",
			UpdatedOffice: producer ? producer.office : "",
			UpdatedCompanyId: producer!.companyId!,
		};

		const validationSchema = Yup.object({
			UpdatedEmail: Yup.string()
				.email("Email inválido")
				.required("Email é obrigatório *"),
			UpdatedName: Yup.string().required("Nome é obrigatório *"),
			UpdatedOffice: Yup.string(),
		});

		const onSubmit = async (values: {
			UpdatedEmail: string;
			UpdatedName: string;
			UpdatedImageProfile: string;
			UpdatedOffice: string;
			UpdatedCompanyId: string;
		}) => {
			const payload = {
				id: producer?.id || "",
				email: values.UpdatedEmail,
				name: values.UpdatedName,
				imageProfile: newImage
					? await formatedImage(newImage)
					: values.UpdatedImageProfile,
				office: values.UpdatedOffice,
				companyId: values.UpdatedCompanyId,
			};
			setIsLoading(true);
			try {
				await producerService.UpdateProducer(payload);
				ToastService.showSuccess("Autor atualizado com sucesso");
			} catch (error: any) {
			} finally {
				fetchProducers();
			}
		};

		return (
			<AlertDialog>
				<Button asChild variant="outlineWhite">
					<AlertDialogTrigger>
						<PenBoxIcon />
					</AlertDialogTrigger>
				</Button>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-2xl font-semibold">
							Editando autor
						</AlertDialogTitle>
					</AlertDialogHeader>
					<div>
						<Formik
							initialValues={initialValues}
							onSubmit={onSubmit}
							validationSchema={validationSchema}
						>
							{({ setFieldValue }) => (
								<Form>
									<div className="flex flex-col justify-center items-center lg:items-start">
										<div className="flex flex-col justify-center mx-auto">
											<Avatar className="w-24 h-24 lg:w-32 lg:h-32 mx-auto rounded-full">
												<AvatarImage
													src={
														newImage
															? URL.createObjectURL(newImage)
															: producer?.imageProfile || ""
													}
													alt="Imagem de perfil"
												/>
												<AvatarFallback>null</AvatarFallback>
											</Avatar>

											<Button
												asChild
												variant={"default"}
												className="mx-auto mb-4 mt-4 cursor-pointer"
											>
												<Label
													htmlFor="UpdatedImageProfile"
													className="flex justify-center"
												>
													Adicionar imagem <CameraIcon className="w-5 ml-2" />
												</Label>
											</Button>

											<input
												id="UpdatedImageProfile"
												name="UpdatedImageProfile"
												type="file"
												accept="image/*"
												className="hidden"
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) => {
													const file = event.currentTarget.files?.[0] || null;
													if (file) {
														setFieldValue(
															"UpdatedImageProfile",
															URL.createObjectURL(file)
														);
														setNewImage(file);
													}
												}}
											/>
										</div>
										<div className="w-full">
											<div className="flex flex-col sm:flex-row sm:gap-4">
												<div className="w-full">
													<Label htmlFor="UpdatedEmail">Email</Label>
													<Field
														id="UpdatedEmail"
														name="UpdatedEmail"
														as={Input}
														className="mt-1 w-full"
													/>
													<ErrorMessage
														name="UpdatedEmail"
														component="div"
														className="text-red-500 mt-1"
													/>
												</div>

												<div className="w-full">
													<Label htmlFor="UpdatedName">Nome</Label>
													<Field
														id="UpdatedName"
														name="UpdatedName"
														as={Input}
														className="w-full mt-1"
													/>
													<ErrorMessage
														name="UpdatedName"
														component="div"
														className="text-red-500 mt-1"
													/>
												</div>
											</div>

											<div>
												<Label htmlFor="UpdatedOffice">Cargo (opcional)</Label>
												<Field
													id="UpdatedOffice"
													name="UpdatedOffice"
													as={Input}
													className="mt-1 w-full"
												/>
												<ErrorMessage
													name="UpdatedOffice"
													component="div"
													className="text-red-500 mt-1"
												/>
											</div>
										</div>
									</div>

									<AlertDialogFooter className="mt-10">
										<AlertDialogCancel>Cancelar</AlertDialogCancel>
										<Button asChild variant={"default"} type="submit">
											<AlertDialogAction>Editar</AlertDialogAction>
										</Button>
									</AlertDialogFooter>
								</Form>
							)}
						</Formik>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		);
	};

	const SkeletonLoading = () => {
		return (
			<>
				{Array.from({ length: 4 }).map((_, index) => (
					<TableRow key={index}>
						{Array.from({ length: 6 }).map((_, index) => (
							<TableCell key={index}>
								<div
									className={
										index === 0
											? "animate-pulse w-14 h-14 bg-gray-200 rounded-full"
											: "animate-pulse h-6 bg-gray-200 rounded"
									}
								></div>
							</TableCell>
						))}
					</TableRow>
				))}
			</>
		);
	};

	return (
		<>
			<div className="container mx-auto p-4 px-8 lg:p-10">
				<h1 className="text-4xl font-bold mb-4">Cadastrar novo autor</h1>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{() => (
						<Form className="space-y-4 mt-10">
							<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start">
								<div className="w-72 flex flex-col justify-center">
									<img
										className="w-48 h-48 mx-auto rounded-full"
										src={
											imagePreview
												? URL.createObjectURL(imagePreview)
												: defaultImage
										}
										alt="Imagem de perfil"
									/>

									<Button
										asChild
										variant={"default"}
										className="mx-auto mb-10 mt-4 cursor-pointer"
									>
										<Label
											htmlFor="imageProfile"
											className="flex justify-center"
										>
											Adicionar imagem <CameraIcon className="w-5 ml-2" />
										</Label>
									</Button>

									<input
										id="imageProfile"
										name="imageProfile"
										type="file"
										accept="image/*"
										className={cn("hidden")}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
											const file = event.currentTarget.files?.[0] || null;
											setImagePreview(file);
										}}
									/>
								</div>
								<div className="w-full lg:px-10">
									<div className="flex flex-col sm:flex-row sm:gap-4 lg:gap-14">
										<div className="w-full">
											<Label htmlFor="email">Email</Label>
											<Field
												id="email"
												name="email"
												as={Input}
												className={cn("mt-1", "w-full")}
											/>
											<ErrorMessage
												name="email"
												component="div"
												className="text-red-500 mt-1"
											/>
										</div>

										<div className="w-full">
											<Label htmlFor="name">Nome</Label>
											<Field
												id="name"
												name="name"
												as={Input}
												className={cn("w-full mt-1")}
											/>
											<ErrorMessage
												name="name"
												component="div"
												className="text-red-500 mt-1"
											/>
										</div>
									</div>

									<div>
										<Label htmlFor="office">Cargo (opcional)</Label>
										<Field
											id="office"
											name="office"
											as={Input}
											className={cn("mt-1", "w-full")}
										/>
										<ErrorMessage
											name="office"
											component="div"
											className="text-red-500 mt-1"
										/>
									</div>
								</div>
							</div>

							<div className="w-full flex justify-end border-b-2 pb-8">
								<Button
									type="submit"
									className="bg-green-500 hover:bg-green-500/80 w-full md:w-auto"
									disabled={isSending}
								>
									{isSending ? "Criando..." : "Cadastrar novo autor"}
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className="container">
				<div className="flex flex-col sm:flex-row justify-between items-center sm:gap-10">
					<h2 className="text-2xl font-bold mb-4 text-nowrap">
						Lista de autores
					</h2>
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
				</div>
				<Table>
					<TableCaption>
						A Lista de autores - {localStorage.getItem("companyName")}
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Imagem</TableHead>
							<TableHead>Nome</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Cargo</TableHead>
							<TableHead>Editar</TableHead>
							<TableHead>Excluir</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading
							? SkeletonLoading()
							: filteredProducers.map((producer: IProducer) => (
									<TableRow key={producer.id}>
										<TableCell className="font-medium">
											<Avatar className="w-14 h-14 mx-auto">
												<AvatarImage
													src={producer.imageProfile}
													alt="Imagem de perfil"
												/>
												<AvatarFallback>null</AvatarFallback>
											</Avatar>
										</TableCell>
										<TableCell>{producer.name}</TableCell>
										<TableCell>{producer.email}</TableCell>
										<TableCell>{producer.office}</TableCell>
										<TableCell className="w-20">
											<ProducerUpdateDialog
												producer={producer}
												key={producer.id}
											/>
										</TableCell>
										<TableCell className="w-20">
											<DeleteDialog producer={producer} />
										</TableCell>
									</TableRow>
							  ))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default ProducersPage;
