import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { FormikMultiSelect, TextAreaFormik } from "@/components/shared/Inputs";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, PlusCircle, XIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";
import CompaniesService from "@/core/services/companies.service";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ITopic } from "@/core/interfaces/topic.interface";
import { IProducerCompany } from "@/core/interfaces/producer.interface";
import { PostService } from "@/core/services/post.service";
import ToastService from "@/core/services/toast.service";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
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

const Publication = () => {
	const [hasImage, setHasImage] = useState(false);
	const [showImageValidator, setShowImageValidator] = useState(false);
	const [sending, setIsSending] = useState(false);
	const [loading, setIsLoading] = useState(false);
	const [paragraphs, setParagraphs] = useState([{ type: "text", content: "" }]);
	const [topics, setTopics] = useState<ITopic[]>([]);
	const [selectecTopics, setSelectedTopics] = useState<string[]>([]);
	const [producers, setProducers] = useState<IProducerCompany[]>([]);
	const [contentPreview, setContentPreview] = useState("");
	const [imagePreview, setImagePreview] = useState<any>("");
	const [hasNewImage, setHasNewImage] = useState(false);
	const paragraphInputRefs = useRef<any>([]);
	const titleInputRef = useRef<HTMLInputElement>(null);
	const [focusedInput, setFocusedInput] = useState<number | null>(null);
	const companiesService = new CompaniesService();
	const postService = new PostService();
	const [searchParams] = useSearchParams();
	const postId = searchParams.get("post");
	const params = useParams();
	const [author, setAuthor] = useState<any>();
	const navigate = useNavigate();
	const [isActive, setIsActive] = useState<boolean>(false);

	const initialValues = {
		author: author,
		topic: selectecTopics,
		image: "",
		contentPreview: contentPreview,
	};

	const validationSchema = Yup.object({
		topic: Yup.array().required().min(1, "Tópico da publicação é obrigatório*"),
		image: Yup.string(),
		contentPreview: Yup.string().required(
			"A pré-visualização do conteúdo é obrigatório*"
		),
	});

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			if (params.id) {
				const topics = await companiesService.getAllTopicsByCompanyId(
					params.id
				);
				setTopics([...topics]);

				const producers = await companiesService.getAllProducersByCompanyId(
					params.id
				);
				setProducers([...producers]);

				try {
					if (postId) {
						const result = await postService.getPostById(postId);
						setAuthor(result.author);
						setSelectedTopics(
							result.topics.map((topic: { topic: ITopic }) => topic.topic.id)
						);
						console.log(result)
						setContentPreview(result.contentPreview);
						setImagePreview(result.imagePreview);
						setIsActive(result.isActive);
						if (result.imagePreview) {
							setHasImage(true);
						}
						if (titleInputRef.current) {
							titleInputRef.current.value = result.title;
						}
						setParagraphs(JSON.parse(result.content));
					}
				} catch (err) {
					ToastService.showError(
						"Não foi possível encontrar o respectivo post"
					);
					navigate(`/company/${params.id}`);
				}
			}
		} catch (err) {
			ToastService.showError(
				"Houve algum erro ao processar os dados, por favor, tente novamente"
			);
			navigate(`/`);
		} finally {
			setIsLoading(false);
		}
	};

	const onSubmit = async (values: any) => {
		if (!hasImage) {
			setShowImageValidator(true);
			return;
		}

		if (!titleInputRef?.current?.value) {
			ToastService.showError("O Título da postagem é obrigatório.");
			return;
		}

		let { image, author, topic, contentPreview } = values;
		image = imagePreview;

		if (!author) {
			ToastService.showError("Autor da publicação é obrigatório*");
			return;
		}

		setIsSending(true);

		const formatedParagraphs = await Promise.all(
			paragraphs.map(async (paragraph: any) => {
				if (paragraph.type === "image" && paragraph.content instanceof File) {
					const formData = new FormData();
					formData.append("file", paragraph.content);
					const response = await postService.uploadFile(formData);
					return {
						type: paragraph.type,
						content: response.url,
					};
				}
				return paragraph;
			})
		);

		const formatedImage = async () => {
			if (image instanceof File) {
				const formData = new FormData();
				formData.append("file", image);
				const response = await postService.uploadFile(formData);
				return response.url;
			}
			return image;
		};

		// Aguarde a formatação da imagem
		const formattedImageUrl = await formatedImage();

		const payload = {
			imagePreview: formattedImageUrl,
			contentPreview: contentPreview,
			authorId: author?.id ? author?.id : author,
			topicIds: topic.map((id: string) => ({ topicId: id })),
			companyId: params.id,
			title: titleInputRef?.current?.value,
			content: JSON.stringify(formatedParagraphs),
		};

		try {
			await postService.createPost(payload);
			ToastService.showSuccess("Postagem criada com sucesso");
			navigate(`/company/${params.id}`);
		} catch (error: any) {
			console.error("Erro ao criar o post", error);
			ToastService.showError(`Erro ao criar o post: ${error.message}`);
		} finally {
			setIsSending(false);
		}
	};

	const handleImageChange = (event: any) => {
		const file = event.currentTarget.files[0];
		if (file) {
			setImagePreview(file);
			setHasImage(true);
			setHasNewImage(true);
			setShowImageValidator(false);
		}
	};

	const handleParagraphChange = (index: any, content: any) => {
		const updatedParagraphs = [...paragraphs];
		updatedParagraphs[index].content = content;
		setParagraphs(updatedParagraphs);

		// Verifique se o parágrafo está vazio e remova-o se necessário
		if (content.trim() === "" && paragraphs.length > 1) {
			const newParagraphs = paragraphs.filter((_, idx) => idx !== index);
			setParagraphs(newParagraphs);
		}
	};

	const handleAddParagraph = () => {
		setParagraphs([...paragraphs, { type: "text", content: "" }]);
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLTextAreaElement>,
		index: number
	) => {
		if (e.key === "Enter") {
			e.preventDefault(); // Impede a ação padrão de pressionar Enter

			if (index === paragraphs.length - 1) {
				handleAddParagraph();
			}

			// Encontra o próximo campo de texto disponível
			let nextIndex = index + 1;
			while (
				nextIndex < paragraphs.length &&
				paragraphs[nextIndex].type !== "text"
			) {
				nextIndex++;
			}

			if (nextIndex < paragraphs.length) {
				const nextInputRef = paragraphInputRefs.current[nextIndex];
				nextInputRef.focus();
			} else {
				handleAddParagraph();
			}
		}
	};

	const handleInsertImage = (index: number) => {
		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";
		fileInput.onchange = (e: any) => {
			const file = e.target.files[0];
			if (file) {
				const updatedParagraphs = [...paragraphs];
				updatedParagraphs[index] = {
					type: "image",
					content: file,
				}; // Adiciona imagem
				updatedParagraphs.splice(index + 1, 0, { type: "text", content: "" }); // Adiciona novo parágrafo de texto abaixo da imagem
				setParagraphs(updatedParagraphs);
			}
		};
		fileInput.click();
	};

	const handleRemoveImage = (index: number) => {
		const updatedParagraphs = [...paragraphs];
		updatedParagraphs[index] = { type: "text", content: "" };
		setParagraphs(updatedParagraphs);
	};

	const onTopicsChange = (topicIds: string[]) => {
		setSelectedTopics(topicIds);
	};

	const LoadingSkeleton = () => {
		return (
			<>
				<div className="flex gap-10 mt-10">
					<Skeleton className="w-96 h-40 bg-gray-200"></Skeleton>
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

	const getParagraphImage = (content: any) => {
		// Verifica se o conteúdo é uma string e se parece com uma URL
		const isValidUrl = (string: string) => {
			try {
				new URL(string);
				return true;
			} catch (_) {
				return false;
			}
		};

		// Se o conteúdo for uma string e for uma URL válida, retorne a URL
		if (typeof content === "string" && isValidUrl(content)) {
			return content;
		}

		// Se o conteúdo for uma instância de File, crie um URL usando URL.createObjectURL
		if (content instanceof File) {
			return URL.createObjectURL(content);
		}

		// Se não for nenhum dos casos acima, retorne o conteúdo original
		return content;
	};

	const deletePostById = async (id: string) => {
		try {
			await postService.deletePostById(id);
			ToastService.showSuccess("Postagem excluída com sucesso");
		} catch (error: any) {
			ToastService.showError(
				`Houve um erro ao excluir a respectiva postagem ${error.message}`
			);
		}
	};

	const DeleteDialog = (id: string) => {
		return (
			<AlertDialog>
				<Button asChild variant={"destructive"}>
					<AlertDialogTrigger>Excluir postagem</AlertDialogTrigger>
				</Button>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
						<AlertDialogDescription>
							Essa ação não pode ser desfeita, uma vez que o seu post tenha sido
							excluído, não poderá ser recuperado posteriormente. Caso você
							apenas deseja tirar a visibilidade do post, você pode desativar o
							checkbox 'ativo'
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<Button
							asChild
							variant={"destructive"}
							onClick={() => deletePostById(id)}
						>
							<AlertDialogAction>Confirmar Exclusão</AlertDialogAction>
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	};

	return (
		<div className="max-w-screen-2xl mx-auto px-10 pb-40">
			{loading ? (
				LoadingSkeleton()
			) : (
				<>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
						enableReinitialize={true}
					>
						<Form className="flex flex-col justify-between border-b-2 mx-auto py-7">
							<div className="flex flex-col items-center lg:flex-row text-start my-4 justify-between">
								<h1 className="text-2xl mb-10 w-full text-center lg:text-start">
									{postId ? "Editando publicação de" : "Nova publicação de"}{" "}
									{localStorage.getItem("companyName")}
								</h1>
								<div className="flex flex-col sm:flex-row gap-4 lg:ml-6">
									{postId && (
										<div
											className={`${
												isActive
													? "bg-green-500/30 text-green-600"
													: "bg-red-500/30 text-red-600"
											} py-1 px-6 rounded-full font-semibold mb-4 mt-1 text-center`}
										>
											{isActive ? "Ativo" : "Inativo"}
										</div>
									)}
									<div className="flex gap-4">
										<Button
											variant={"default"}
											type="submit"
											disabled={sending}
										>
											{sending
												? "Enviando..."
												: postId
												? "Salvar alterações"
												: "Publicar"}
										</Button>
										{postId && DeleteDialog(postId)}
									</div>
								</div>
							</div>
							<div className="flex-col flex lg:flex-row lg:gap-32 items-center">
								{" "}
								<div className="w-full lg:w-auto">
									<div className="mb-5">
										<h2>Autor da publicação</h2>
										<Field name="author">
											{({ field, form }: any) => (
												<Select
													value={author?.id}
													onValueChange={(value: any) => {
														form.setFieldValue(field.name, value.id);
														setAuthor(value);
													}}
												>
													<SelectTrigger className="border-2 border-primary rounded-lg focus:ring-0 focus:ring-transparent">
														<SelectValue placeholder="Selecione um autor" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															{producers.map((producer) => (
																<SelectItem
																	key={producer.id}
																	value={producer.id}
																>
																	{producer.name}
																</SelectItem>
															))}
														</SelectGroup>
													</SelectContent>
												</Select>
											)}
										</Field>
									</div>
									<div className="mb-5">
										<h2>Assunto da publicação</h2>
										<FormikMultiSelect
											control="topic"
											options={topics.map((topic: ITopic) => {
												return {
													value: topic.id,
													label: topic.description,
												};
											})}
											placeholder="Selecione os tópicos da publicação"
											variant="inverted"
											defaultValue={selectecTopics}
											animation={0}
											onValueChange={(topicIds: string[]) => {
												onTopicsChange(topicIds);
											}}
										></FormikMultiSelect>
									</div>
									{postId && (
										<div className="flex items-center gap-2">
											<Checkbox
												id="isActive"
												checked={isActive}
												onCheckedChange={() => setIsActive(!isActive)}
											/>
											<label
												htmlFor="isActive"
												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												Ativo
											</label>
										</div>
									)}
								</div>
								<div className="w-full flex flex-col xl:flex-row xl:justify-end xl:items-end items-center">
									<div>
										<h2>Insira a imagem de capa da publicação</h2>
										<input
											type="file"
											id="image"
											name="image"
											className="mb-8 text-xs"
											accept="image/*"
											onChange={handleImageChange}
										/>
										<div>
											{imagePreview ? (
												<img
													src={
														postId && !hasNewImage
															? imagePreview
															: URL.createObjectURL(imagePreview)
													}
													alt="Preview"
													className="w-full lg:max-w-[240px] lg:h-36 mb-2 mx-auto"
												/>
											) : (
												<>
													<label htmlFor="">Pré-visualização da imagem:</label>
													<div className="bg-gray-200 h-36 w-[240px] mb-2 flex justify-center items-center">
														<p className="text-gray-400">
															Selecione uma imagem
														</p>
													</div>
												</>
											)}
										</div>
										{showImageValidator && (
											<>
												<p className="text-red-500 font-medium">
													Imagem é obrigatória
												</p>
											</>
										)}
									</div>
									<TextAreaFormik
										onValueChange={(value: string) => {
											setContentPreview(value);
										}}
										className="text-black font-normal mb-0"
										fieldClassName="lg:mb-2 lg:max-w-[450px]"
										rows={6}
										control="contentPreview"
										placeholder="Insira aqui a pré-visualização do seu conteúdo, coloque uma descrição que chame a atenção das pessoas"
									>
										Pré visualização do conteúdo :
									</TextAreaFormik>
								</div>
							</div>
						</Form>
					</Formik>

					<div className="max-w-screen-xl mx-auto">
						<form>
							<div className="max-w-screen-2xl mt-10">
								<input
									spellCheck={false}
									type="text"
									placeholder="Título..."
									className="border-l-2 pl-4 font-semibold ml-10 text-3xl w-full focus:border-transparent focus:outline-nonefocus:border-transparent focus:outline-none"
									ref={titleInputRef}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											if (paragraphInputRefs.current.length > 0) {
												const firstParagraphInputRef =
													paragraphInputRefs.current[0];
												firstParagraphInputRef.focus();
											}
										}
									}}
								/>
							</div>
							{paragraphs.map((paragraph, index) => (
								<div key={index} className="mt-4 flex ml-10 relative">
									{paragraph.type === "text" ? (
										<textarea
											spellCheck={false}
											placeholder="Insira um novo parágrafo..."
											className="border-l-2 pl-4 w-full resize-none overflow-hidden focus:border-transparent focus:outline-none text-justify"
											value={paragraph.content}
											onChange={(e) =>
												handleParagraphChange(index, e.target.value)
											}
											onKeyDown={(e) => handleKeyDown(e, index)}
											onFocus={() => setFocusedInput(index)}
											ref={(textarea) => {
												if (textarea) {
													paragraphInputRefs.current[index] = textarea;
													textarea.style.height = "auto";
													textarea.style.height = `${textarea.scrollHeight}px`;
												}
											}}
										/>
									) : (
										<div className="relative mx-auto">
											<img
												src={getParagraphImage(paragraph.content)}
												alt={`Image paragraph ${index}`}
												className=""
											/>
											<button
												className="absolute top-0 right-0 mt-1 mr-1 bg-white bg-opacity-50 p-1 rounded-full border-2 border-red-500"
												onClick={() => handleRemoveImage(index)}
											>
												<XIcon className="text-red-500" />
											</button>
										</div>
									)}
									{focusedInput === index && (
										<Menubar>
											<MenubarMenu>
												<MenubarTrigger className="absolute -left-16 -top-1">
													<PlusCircle className="w-8 h-8" />
												</MenubarTrigger>
												<MenubarContent>
													<MenubarItem
														className="cursor-pointer"
														onClick={() => handleInsertImage(index)}
													>
														Inserir imagem{" "}
														<MenubarShortcut>
															<ImageIcon />
														</MenubarShortcut>
													</MenubarItem>
												</MenubarContent>
											</MenubarMenu>
										</Menubar>
									)}
								</div>
							))}
						</form>
					</div>
				</>
			)}
		</div>
	);
};

export default Publication;
