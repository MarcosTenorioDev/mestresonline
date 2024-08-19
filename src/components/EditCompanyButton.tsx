import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog";
import { Formik, ErrorMessage, Form } from "formik";
import { PenBoxIcon, UploadIcon } from "lucide-react";
import { Input, TextAreaFormik } from "./shared/Inputs";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { DialogHeader } from "./ui/dialog";
import {
	CompanyHomePage,
	CompanyUpdate,
	ICompany,
} from "@/core/interfaces/company.interface";
import * as Yup from "yup";
import { useState } from "react";
import placeholder from "@/assets/images/placeholder.png";
import { PostService } from "@/core/services/post.service";
import CompaniesService from "@/core/services/companies.service";
import ToastService from "@/core/services/toast.service";
import { useNavigate } from "react-router-dom";

const EditCompanyButton = (props: { company: ICompany }) => {
	const { company } = props;
	const [imagePreview, setImagePreview] = useState<any>(company.image);
	const [bannerPreview, setBannerPreview] = useState<any>(company.banner);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const postService = new PostService();
	const companiesService = new CompaniesService();
	const navigate = useNavigate();

	const initialValues: CompanyHomePage = {
		id: company.id,
		banner: company.banner,
		description: company.description,
		image: company.image,
		name: company.name,
		ownerId: company.ownerId,
	};

	const validationSchema = Yup.object({
		name: Yup.string()
			.required("Nome é obrigatório*")
			.max(70, "No máximo 70 caracteres*"),
		description: Yup.string().required("Descrição é obrigatória*"),
		image: Yup.string().required("Imagem de perfil é obrigatória*"),
	});

	const onSubmit = async (values: CompanyHomePage) => {
		const { name, description, id } = values;

		const formatedImage = async (file: File | string) => {
			if (file instanceof File) {
				const formData = new FormData();
				formData.append("file", file);
				const response = await postService.uploadFile(formData);
				return response.url;
			}
			return file;
		};

		const payload: CompanyUpdate = {
			id,
			description,
			image: await formatedImage(imagePreview),
			banner: bannerPreview ? await formatedImage(bannerPreview) : "",
			name,
			ownerId: company.ownerId,
		};

		try {
			setIsLoading(true);
			await companiesService.updateCompany(payload);
			ToastService.showSuccess("Perfil editado com sucesso!");
			navigate("/myProfiles");
		} catch (err) {
			
		} finally {
			setIsLoading(false);
		}
	};

	const handleImageChange = (event: any) => {
		const file = event.currentTarget.files[0];
		if (file) {
			setImagePreview(file);
		}
	};

	const handleBannerChange = (event: any) => {
		const file = event.currentTarget.files[0];
		if (file) {
			setBannerPreview(file);
		}
	};

	const isFile = (image: File | string) => {
		return image instanceof File;
	};

	return (
		<div>
			<Dialog>
				<DialogTrigger className="w-full h-full">
					<Card className="p-2 hover:bg-gray-400/40 font-semibold text-black flex gap-2">
						<PenBoxIcon className="" strokeWidth={1} />
					</Card>
				</DialogTrigger>
				<DialogContent className="overflow-y-auto max-h-screen sm:max-h-[90%] overflow-x-hidden">
					<DialogHeader>
						<DialogTitle className="w-full text-center text-2xl">
							Editar perfil
						</DialogTitle>
						<div>
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
							>
								{({ setFieldValue, values }) => (
									<Form className="space-y-6">
										<div className="flex flex-col gap-4 mt-10">
											<Input control="name">Nome do perfil</Input>
											<TextAreaFormik
												control="description"
												rows={6}
												onValueChange={(value: any) => {
													setFieldValue("description", value);
												}}
											>
												Descrição do perfil
											</TextAreaFormik>
											<div>
												<input
													id="image"
													name="image"
													type="file"
													accept="image/*"
													onChange={(event: any) => {
														if (event.currentTarget.files[0]) {
															handleImageChange(event);
															setFieldValue(
																"image",
																event.currentTarget.files[0]
															);
															return;
														}
														setFieldValue("image", "");
													}}
													className="mt-1 hidden w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
												/>
												<ErrorMessage
													name="image"
													component="div"
													className="text-red-500 text-md font-semibold"
												/>

												<input
													id="banner"
													name="banner"
													type="file"
													accept="image/*"
													onChange={(event: any) => {
														if (event.currentTarget.files[0]) {
															handleBannerChange(event);
															setFieldValue(
																"banner",
																event.currentTarget.files[0]
															);
															return;
														}
														setFieldValue("banner", "");
													}}
													className="mt-1 hidden w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
												/>
												<div className="relative w-full h-[300px] sm:h-[200px]">
													<img
														src={
															bannerPreview
																? isFile(bannerPreview)
																	? URL.createObjectURL(bannerPreview)
																	: bannerPreview
																: placeholder
														}
														className="aspect-video w-full h-full object-cover"
														alt="banner do perfil"
														style={{
															maskImage:
																"linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4))",
															WebkitMaskImage:
																"linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4))",
														}}
													/>

													{bannerPreview ? (
														<label
															htmlFor="banner"
															className="block text-sm font-medium"
														>
															<div className="flex flex-col sm:justify-center pb-16 items-center justify-start absolute top-0 w-full h-full cursor-pointer sm:opacity-0 hover:opacity-100">
																<div className="hover:bg-gray-200 p-3 rounded-full">
																	<UploadIcon
																		className="size-6 text-black"
																		aria-hidden="true"
																	/>
																</div>

																<p className="font-medium text-base text-black text-center">
																	Alterar imagem
																</p>
															</div>
														</label>
													) : (
														<label
															htmlFor="banner"
															className="block text-sm font-medium text-gray-700"
														>
															<div className="flex flex-col justify-center pb-16 items-center absolute inset-0 hover:scale-125 cursor-pointer">
																<UploadIcon
																	className="size-4 text-muted-foreground"
																	aria-hidden="true"
																/>
																<p className="font-medium text-xs text-muted-foreground">
																	Inserir imagem (opcional)
																</p>
															</div>
														</label>
													)}

													<div className="flex flex-col mx-auto sm:flex-row items-center gap-5 absolute bottom-2 w-full px-4">
														<div className="relative w-28 h-28 min-w-28 min-h-28">
															{imagePreview ? (
																<img
																	src={
																		isFile(imagePreview)
																			? URL.createObjectURL(imagePreview)
																			: imagePreview
																	}
																	className="w-28 h-28 min-w-28 min-h-28 rounded-full border-4 bg-gray-300"
																	alt="imagem do perfil"
																/>
															) : (
																<label
																	htmlFor="image"
																	className="block text-sm font-medium text-gray-700 cursor-pointer"
																>
																	<div className="absolute inset-0 flex flex-col items-center justify-center rounded-full border-4 bg-gray-300">
																		<div className="rounded-full border border-dashed p-3 hover:bg-gray-200">
																			<UploadIcon
																				className="size-4 text-muted-foreground"
																				aria-hidden="true"
																			/>
																		</div>
																		<p className="font-medium text-xs text-muted-foreground">
																			Inserir imagem
																		</p>
																	</div>
																</label>
															)}
															{imagePreview && (
																<label
																	htmlFor="image"
																	className="block text-sm cursor-pointer font-medium text-gray-700"
																>
																	<div className="absolute inset-0 flex flex-col items-center justify-center rounded-full border-4 bg-gray-300 opacity-0 hover:opacity-80 transition-opacity">
																		<div className="rounded-full hover:bg-gray-200 border border-dashed p-3">
																			<UploadIcon
																				className="size-4 text-muted-foreground"
																				aria-hidden="true"
																			/>
																		</div>
																		<p className="font-medium text-xs text-muted-foreground">
																			Alterar imagem
																		</p>
																	</div>
																</label>
															)}
														</div>
														<h1 className="text-3xl font-extrabold tracking-tight">
															{values.name}
														</h1>
													</div>
												</div>
											</div>
										</div>

										<div className="flex justify-end">
											<DialogClose className="bg-gray-200 hover:bg-gray-200/60 text-black mr-4 py-2 px-4 rounded-md">
												Cancelar
											</DialogClose>
											<Button
												type="submit"
												className="bg-indigo-600 text-white py-2 px-4 rounded-md"
												disabled={isLoading}
											>
												{isLoading ? "Carregando..." : "Editar"}
											</Button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default EditCompanyButton;
