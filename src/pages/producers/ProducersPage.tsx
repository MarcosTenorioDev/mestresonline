// UserForm.tsx
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultImage from "@/assets/images/userImage.png";
import { CameraIcon } from "lucide-react";

const ProducersPage: React.FC = () => {
	const [imagePreview, setImagePreview] = useState();

	const initialValues = {
		email: "",
		name: "",
		imageProfile: "",
		office: "",
	};

	// Validação do formulário com Yup
	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Email inválido")
			.required("Email é obrigatório *"),
		name: Yup.string().required("Nome é obrigatório *"),
		imageProfile: Yup.string(),
		office: Yup.string(),
	});

	const onSubmit = (values: any) => {
        console.log(values)
    };

	return (
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
									<Label htmlFor="imageProfile" className="flex justify-center">
										Adicionar imagem <CameraIcon className="w-5 ml-2" />
									</Label>
								</Button>

								<input
									id="imageProfile"
									name="imageProfile"
									type="file"
									accept="image/*"
									className={cn("hidden")}
									onChange={(event: any) => {
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

						<div className="w-full flex justify-end  border-b-2 pb-8">
							<Button type="submit" className="bg-green-500 hover:bg-green-500/80  w-full md:w-auto">
								Cadastrar novo autor
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ProducersPage;
