import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { PlusIcon } from "lucide-react";
import * as Yup from "yup";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { Input } from "@/components/shared/Inputs";
import { Button } from "@/components/ui/button";
import CompaniesService from "@/core/services/companies.service";
import {
	CompanyCreate,
	CompanyHomePage,
} from "@/core/interfaces/company.interface";
import defaultImage from "@/assets/images/defaultImage.jpg";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const MyCompanies = () => {
	const initialValues = {
		name: "",
		description: "",
		image: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Nome é obrigatório*"),
		description: Yup.string().required("Descrição é obrigatória*"),
		image: Yup.string().required("Imagem é obrigatória*"),
	});

	const [orientation, setOrientation] = useState<
		"horizontal" | "vertical" | undefined
	>("horizontal");
	const [imagePreview, setImagePreview] = useState<any>("");
	const [hasImage, setHasImage] = useState(false);
	const companiesService = new CompaniesService();
	const [myCompanies, setMyCompanies] = useState<CompanyHomePage[]>([]);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const handleImageChange = (event: any) => {
		const file = event.currentTarget.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
				setHasImage(true);
			};
			reader.readAsDataURL(file);
		}
	};

	const onSubmit = async (values: any) => {
		const { name, description } = values;

		const payload: CompanyCreate = {
			description,
			image: imagePreview,
			name,
		};
		companiesService.createCompany(payload).then(() => {
			getCompanies();
		});
	};

	const handleDialogClose = () => {
		setImagePreview("");
		setHasImage(false);
	};

	useEffect(() => {
		getCompanies();
	}, []);

	const getCompanies = async () => {
		const myCompanies = await companiesService.getCompanies();
		setMyCompanies(myCompanies);
		setIsLoading(false)
        console.log(Array.isArray(myCompanies)); // Deve ser true se myCompanies for uma array
        console.log(myCompanies);
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

	useEffect(() => {
		const updateOrientation = () => {
			if (window.innerWidth >= 700) {
				setOrientation("horizontal");
			} else {
				setOrientation("vertical");
			}
		};

		window.addEventListener("resize", updateOrientation);
		updateOrientation();

		return () => {
			window.removeEventListener("resize", updateOrientation);
		};
	}, []);

	return (
		<div className="max-w-7xl mx-auto px-10 lg:px-0">
			<h1 className="font-semibold text-2xl sm:text-4xl sm:px-14 py-20">
				Minhas Companias
			</h1>
			<Carousel className="w-10/12 mx-auto sm:px-14" orientation={orientation}>
				<CarouselContent>
					{isLoading ? (
						loadingComponent()
					) : (
						<>
							{myCompanies.map((company) => (
								<CarouselItem
									key={company.id}
									className="md:basis-1/2 cursor-pointer "
									onClick={() => navigate(`/company/${company.id}`)}
								>
									<div className="p-1">
										<Card className="w-full cursor-pointer">
											<CardContent className="flex flex-col items-center justify-center p-6 hover:bg-gray-100 transition duration-300">
												<img
													src={company.image || defaultImage}
													alt={company.name}
													className="w-full max-h-48 object-contain mb-4"
												/>
												<h2 className="text-xl font-semibold">
													{company.name}
												</h2>
												<p className="text-gray-500 text-center">
													{company.description}
												</p>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
							<CarouselItem className="md:basis-1/2 lg:basis-1/3">
								<div className="p-1">
									<Dialog onOpenChange={handleDialogClose}>
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
										<DialogContent>
											<DialogHeader>
												<DialogTitle>
													Criar nova companhia para postagens e publicações
												</DialogTitle>
												<div>
													<Formik
														initialValues={initialValues}
														validationSchema={validationSchema}
														onSubmit={onSubmit}
													>
														{({ setFieldValue }) => (
															<Form className="space-y-6">
																<div className="flex flex-col gap-4">
																	<Input control="name" />
																	<Input control="description" />
																	<div>
																		<label
																			htmlFor="image"
																			className="block text-sm font-medium text-gray-700"
																		>
																			Imagem
																		</label>
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
																				setHasImage(false);
																				setFieldValue("image", "");
																			}}
																			className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
																		/>
																		<ErrorMessage
																			name="image"
																			component="div"
																			className="text-red-500 text-sm"
																		/>
																		{hasImage && (
																			<div className="mt-2">
																				<img
																					src={imagePreview}
																					alt="Preview"
																					className="max-w-xs"
																				/>
																			</div>
																		)}
																	</div>
																</div>

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
																	>
																		Criar
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
