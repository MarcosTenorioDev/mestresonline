import { CheckCheckIcon, CheckIcon, Pilcrow, UserCheck2 } from "lucide-react";
import { Card, CardTitle } from "../ui/card";

const TopicsAndAuthors = () => {
	return (
		<section
			id="TopicsAndAuthors"
			className="container py-24 sm:py-32 space-y-8"
			data-aos="fade-up"
		>
			<h2 className="text-3xl lg:text-4xl font-bold md:text-center">
				Personalize suas postagens ao{" "}
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					máximo
				</span>
			</h2>
			<p className="mt-3 text-xl text-muted-foreground text-center">
				Com a possibilidade de criar e organizar diferentes autores e tópicos.
			</p>

			<div className="space-y-16">
				<Card className="bg-gradient-to-b from-primary/60 to-primary  flex flex-col lg:flex-row p-4 sm:p-6 rounded-sm shadow-xl">
					<div className="flex flex-col lg:w-6/12 p-4 items-center">
						<Card className="rounded-full w-fit p-5">
							<CardTitle className="flex items-center gap-2">
								<Pilcrow className="w-10 h-10 text-primary" />
								<h3 >Crie diferentes tópicos</h3>
							</CardTitle>
						</Card>
						<div className=" py-4 sm:p-4 lg:max-w-[550px]">
							<p className="text-muted font-semibold sm:text-start text-sm sm:text-lg text-justify">
								Na plataforma Mestres_Online você pode criar os seus próprios
								tópicos, quantos você quiser e os anexar às suas postagens. Tudo
								isso para auxiliar no processo de filtragem de postagens para
								quem visitar o seu perfil
							</p>
						</div>
					</div>
					<img
						src="https://mestres-online-develop.s3.us-east-2.amazonaws.com/topic.png"
						alt="Imagem do menu mestres_Online"
						className="border border-primary rounded-md shadow-xl lg:w-6/12 -order-1 lg:order-1"
					/>
				</Card>
				<Card className="bg-gradient-to-b from-primary/60 to-primary  flex flex-col lg:flex-row p-4 sm:p-6 rounded-sm shadow-xl">
					<img
						src="https://mestres-online-develop.s3.us-east-2.amazonaws.com/author.png"
						alt="Imagem do menu mestres_Online"
						className="border border-primary rounded-md shadow-xl lg:w-6/12"
					/>
					<div className="flex flex-col lg:w-6/12 p-4 items-center">
						<Card className="rounded-full w-fit p-5 flex">
							<CardTitle className="flex items-center gap-2">
								<UserCheck2 className="w-10 h-10 text-primary" />
								<h3 className="">Crie diferentes autores</h3>
							</CardTitle>
						</Card>
						<div className=" py-4 sm:p-4 lg:max-w-[550px]">
							<p className="text-muted font-semibold text-justify sm:text-start text-sm sm:text-lg">
								Monte uma coleção de autores para suas publicações, ideal para
								perfis de empresas, clínicas, escolas e outras organizações que
								possuem vários criadores de conteúdo. Isso permite com que cada
								um contribua com suas postagens e especialidades.{" "}
							</p>
						</div>
					</div>
				</Card>
			</div>
		</section>
	);
};

export default TopicsAndAuthors;
