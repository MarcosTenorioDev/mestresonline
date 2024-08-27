import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import CompaniesService from "@/core/services/companies.service";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/loading-spinner";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { UserService } from "@/core/services/user.service";

interface EditPublicCodeButtonProps {
	publicCode: string;
	onSubmit: (values: { UpdatedPublicCode: string }) => void;
}

const EditPublicCodeButton: React.FC<EditPublicCodeButtonProps> = ({
	publicCode,
	onSubmit,
}) => {
	const fixedUrl = "https://mestresonline.vercel.app/";
	const companyService = new CompaniesService();
	const userService = new UserService();
	const [loading, setIsLoading] = useState(true);
	const [verifiyingValidity, setVerifiyingValidity] = useState<
		"verifiying" | "true" | "false"
	>("true");
	const [isPaidSubscription, setIsPaidSubscription] = useState<
		boolean | undefined
	>(undefined);

	useEffect(() => {
		fetchUserInfo();
	}, []);

	const fetchUserInfo = async () => {
		const user = await userService.findByToken();
		setIsPaidSubscription(!!user.subscriptionId);
		setIsLoading(false);
	};

	const initialValues = {
		UpdatedPublicCode: publicCode,
	};

	const validatePublicCode = async (publicCode: string) => {
		setVerifiyingValidity("verifiying");
		const result = await companyService.isValidPublicCode(publicCode);
		setVerifiyingValidity(result.toString());
	};

	const validationSchema = Yup.object().shape({
		UpdatedPublicCode: Yup.string()
			.required("URL pública é obrigatório*")
			.matches(/^\S*$/, "A URL pública não pode conter espaços vazios*")
			.test(
				"is-valid-public-code",
				"URL pública já existente, por favor, tente outro nome.*",
				() =>
					verifiyingValidity.toString() === "true" ||
					verifiyingValidity.toString() === "verifiying"
			),
	});

	return (
		<AlertDialog>
			{loading ? (
				<Spinner size="small" className=" ml-2" />
			) : isPaidSubscription ? (
				<Button variant={"link"} className="p-0 my-2 w-auto h-auto text-wrap">
					<AlertDialogTrigger className="font-semibold underline hover:underline cursor-pointer">
						Editar link acima - Edite agora a URL de seu perfil público
					</AlertDialogTrigger>
				</Button>
			) : (
				<p className="font-semibold cursor-default">
					<Button
						variant={"link"}
						disabled={true}
						className="p-0 my-4 mr-2 w-auto h-auto text-muted-foreground text-wrap"
					>
						Editar link acima{" "}
						{!isPaidSubscription &&
							"(Recurso indisponível para usuários em teste grátis)"}
					</Button>
				</p>
			)}

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-2xl font-semibold">
						Editando URL Pública
					</AlertDialogTitle>
				</AlertDialogHeader>
				<div>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={validationSchema}
						validateOnChange={true}
						validateOnBlur={true}
					>
						{({ isValid, errors, setFieldValue }) => (
							<Form>
								<div className="flex flex-col justify-center items-center lg:items-start">
									<div className="w-full text-center sm:text-start">
										<Label htmlFor="UpdatedPublicCode">URL Pública</Label>
										<div className="flex flex-col sm:flex-row gap-4 items-center mt-1">
											<span className="mr-2 text-gray-600">{fixedUrl}</span>
											<div className="w-full flex items-center">
												<Field
													id="UpdatedPublicCode"
													name="UpdatedPublicCode"
													as={Input}
													className="w-full"
													control="UpdatedPublicCode"
													placeholder="Digite o código público"
													onChange={(input: any) => {
														const value = input.target.value;
														setFieldValue("UpdatedPublicCode", value);
														validatePublicCode(value);
													}}
												/>
												{verifiyingValidity === "verifiying" && (
													<Spinner size="small" className=" ml-2" />
												)}
												{verifiyingValidity === "true" && (
													<CheckCircle2Icon className="w-6 h-6 text-green-500 ml-2" />
												)}
												{verifiyingValidity === "false" && (
													<XCircleIcon className="w-6 h-6 text-red-500 ml-2" />
												)}
											</div>
										</div>
										{!isValid && (
											<div className="text-red-500 mt-1">
												{errors.UpdatedPublicCode}
											</div>
										)}
									</div>
								</div>

								<AlertDialogFooter className="mt-10">
									<AlertDialogCancel>Cancelar</AlertDialogCancel>
									<Button
										asChild
										variant={"default"}
										type="submit"
										disabled={
											!isValid ||
											verifiyingValidity === "verifiying" ||
											verifiyingValidity === "false"
										} // Botão desabilitado quando o formulário não for válido
									>
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

export default EditPublicCodeButton;
