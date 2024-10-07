import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { PlusIcon, UploadIcon } from "lucide-react";
import * as Yup from "yup";
import placeholder from "@/assets/images/placeholder.png";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { Input, TextAreaFormik } from "@/components/shared/Inputs";
import { Button } from "@/components/ui/button";
import CompaniesService from "@/core/services/companies.service";
import {
	CompanyCreate,
	CompanyHomePage,
} from "@/core/interfaces/company.interface";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { PostService } from "@/core/services/post.service";
import MyProfileCard from "@/components/MyProfileCard";
import { UserService } from "@/core/services/user.service";
import ToastService from "@/core/services/toast.service";

const MyCompanies = () => {
	const initialValues = {
		name: "",
		description: "",
		image: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string()
			.required("Nome é obrigatório*")
			.max(70, "No máximo 70 caracteres*"),
		description: Yup.string().required("Descrição é obrigatória*"),
		image: Yup.string().required("Imagem de perfil é obrigatória*"),
	});

	const [imagePreview, setImagePreview] = useState<any>("");
	const [bannerPreview, setBannerPreview] = useState<File>();
	const companiesService = new CompaniesService();
	const [myCompanies, setMyCompanies] = useState<CompanyHomePage[]>([]);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const postService = new PostService();
	const userService = new UserService();
	const [open, setOpen] = useState<boolean>(false)

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

	const onSubmit = async (values: any) => {
		setOpen(false)
		const { name, description } = values;

		const formatedImage = async (file: File) => {
			const formData = new FormData();
			formData.append("file", file);
			const response = await postService.uploadFile(formData);
			return response.url;
		};

		const payload: CompanyCreate = {
			description,
			image: await formatedImage(imagePreview),
			banner: bannerPreview ? await formatedImage(bannerPreview) : "",
			name,
		};
		companiesService.createCompany(payload).then(() => {
			getCompanies();
			ToastService.showSuccess("Perfil criado com sucesso.")
		});
	};

	const handleDialogClose = () => {
		setImagePreview("");
		setBannerPreview(undefined);
	};

	useEffect(() => {
		getCompanies();
	}, []);

	const getCompanies = async () => {
		const myCompanies = await companiesService.getCompanies();
		setMyCompanies(myCompanies);
		setIsLoading(false);
	};

	const loadingComponent = () => {
		return (
			<>
				<CarouselItem className="cursor-pointer lg:basis-1/4">
					<Skeleton className="bg-gray-200 h-60" />
				</CarouselItem>
				<CarouselItem className="cursor-pointer lg:basis-1/4">
					<Skeleton className="bg-gray-200 h-60" />
				</CarouselItem>

				<CarouselItem className="cursor-pointer lg:basis-1/4">
					<Skeleton className="bg-gray-200 h-60" />
				</CarouselItem>

				<CarouselItem className="cursor-pointer lg:basis-1/4">
					<Skeleton className="bg-gray-200 h-60" />
				</CarouselItem>
			</>
		);
	};

	const [user, setUser] = useState<any>();

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		const user = await userService.findByToken();
		setUser(user);
	};

	const verifyValiditySubscription = (): boolean => {
		if (!user) {
			return false;
		}
		if (myCompanies.length === 0) {
			return true;
		}
		if (user.subscription) {
			return user.subscription.canHaveManyProfiles;
		}

		return false;
	};

	return (
		<div className="max-w-7xl mx-auto px-10 lg:px-0">
			<h1 className="font-semibold text-2xl sm:text-4xl sm:px-14 py-20">
				Meus Perfis
			</h1>
			<Carousel className="w-10/12 mx-auto sm:px-14">
				<CarouselContent>
					{isLoading ? (
						loadingComponent()
					) : (
						<>
							{myCompanies.map((company) => (
								<CarouselItem
									key={company.id}
									className="lg:basis-[80%] xl:basis-[60%] cursor-pointer "
									onClick={() => {
										navigate(`/profile/${company.id}`);
										localStorage.setItem("companyName", company.name);
									}}
								>
									<div className="">
										<MyProfileCard
											company={company}
											placeholder={placeholder}
											key={company.id}
										/>
									</div>
								</CarouselItem>
							))}
							<CarouselItem className="lg:basis-1/2 xl:basis-1/3">
								<div className="p-1">
									<Dialog onOpenChange={() => {
										handleDialogClose();
										setOpen(!open)
									}} open={open} defaultOpen={open}>
										<DialogTrigger className="w-full h-full">
											<Card>
												<CardContent className="flex aspect-square items-center justify-center p-6 hover:bg-gray-400/10">
													<PlusIcon
														className="w-full h-full text-gray-400"
														strokeWidth={1}
													/>
												</CardContent>
											</Card>
										</DialogTrigger>
										<DialogContent className="overflow-y-auto max-h-screen sm:max-h-[90%] overflow-x-hidden">
											<DialogHeader>
												<DialogTitle>
													Criar novo perfil para postagens e publicações
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
																		onValueChange={(value: string) => {
																			setFieldValue("description", value);
																		}}
																		rows={6}
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
																						? URL.createObjectURL(bannerPreview)
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
																					<div className="flex flex-col justify-center pb-16 items-center absolute inset-0 cursor-pointer opacity-0 hover:opacity-100">
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

																			<div className="flex flex-col sm:flex-row items-center gap-5 absolute bottom-2  px-4">
																				<div className="relative w-28 h-28 min-w-28 min-h-28">
																					{imagePreview ? (
																						<img
																							src={URL.createObjectURL(
																								imagePreview
																							)}
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

																<div>
																	<div className="flex justify-end">
																		<DialogClose
																			type="submit"
																			className="bg-gray-200 hover:bg-gray-200/60 text-black mr-4 py-2 px-4 rounded-md"
																		>
																			Cancelar
																		</DialogClose>
																		<Button
																			type="submit"
																			className="bg-indigo-600 text-white py-2 px-4 rounded-md"
																			disabled={!verifyValiditySubscription()}
																		>
																			Criar
																		</Button>
																	</div>
																	{/* If has user and this user dont have a subscriptionId and his had one or more profiles, show the message. */}
																	{!verifyValiditySubscription() && (
																		<p className="text-xs text-center font-semibold text-red-500 pt-4">
																			{user?.subscriptionId
																				? "Faça o upgrade do plano básico para obter acesso a criação diversos perfís"
																				: "Faça o upgrade do plano gratuito para obter acesso a criação diversos perfís"}
																		</p>
																	)}
																</div>
															</Form>
														)}
													</Formik>
												</div>
											</DialogHeader>
										</DialogContent>
									</Dialog>
								</div>
							</CarouselItem>
						</>
					)}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
};

export default MyCompanies;
