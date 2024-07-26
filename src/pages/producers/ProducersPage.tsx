import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultImage from "@/assets/images/userImage.png";
import { CameraIcon, SearchIcon, XIcon } from "lucide-react";
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

const ProducersPage = () => {
	const [imagePreview, setImagePreview] = useState<File | null>(null);
	const companyService = new CompaniesService();
	const params = useParams();
	const id = params.id;
	const [producers, setProducers] = useState<IProducer[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");

	useEffect(() => {
		fetchProducers();
	}, []);

	const fetchProducers = async () => {
		if (id) {
			const result = await companyService.getAllProducersByCompanyId(id);
			setProducers(result);
		}
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

	const onSubmit = (values: any) => {
		console.log(values);
	};

	const filteredProducers = producers.filter((producer) =>
		producer.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

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
									<Avatar className="w-52 h-52 mx-auto">
										<AvatarImage
											src={
												imagePreview
													? URL.createObjectURL(imagePreview)
													: defaultImage
											}
										/>
										<AvatarFallback>
											<img
												src={
													imagePreview
														? URL.createObjectURL(imagePreview)
														: defaultImage
												}
												alt="Imagem de perfil"
											/>
										</AvatarFallback>
									</Avatar>

									<Button
										asChild
										variant={"default"}
										className="mx-auto mb-10 mt-4"
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
								>
									Cadastrar novo autor
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className="container">
				<div className="flex flex-col sm:flex-row justify-between items-center sm:gap-10">
					<h2 className="text-2xl font-bold mb-4 text-nowrap">Lista de autores</h2>
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
					<TableCaption>A Lista de autores da Clinica ativamente</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Imagem</TableHead>
							<TableHead>Nome</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Cargo</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredProducers.map((producer: IProducer) => (
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
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default ProducersPage;
