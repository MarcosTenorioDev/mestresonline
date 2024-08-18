import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import apiIcon from "@/assets/gifs/dedicated-server_15713163.gif";
import securityIcon from "@/assets/images/lock_15120215.png";
import documentIcon from "@/assets/images/doc-file-format_2889438.png";
import endpointIcon from "@/assets/images/api_3234053.png";
import { Button } from "../ui/button";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

interface FeatureProps {
	title: string;
	description: string;
	image: string;
}

const features: FeatureProps[] = [
	{
		title: "Endpoint Disponibilizado",
		description:
			"Acesse facilmente nossos endpoints prontos para integração, otimizando seu desenvolvimento e acelerando o acesso aos dados.",
		image: endpointIcon,
	},
	{
		title: "Documentação de API",
		description:
			"Consulte nossa documentação clara e detalhada para uma integração sem esforço. Encontre exemplos e guias para aproveitar ao máximo nossa API.",
		image: documentIcon,
	},
	{
		title: "Segurança",
		description:
			"Garanta a proteção dos seus dados com nossos protocolos de segurança avançados. Confiança e segurança são prioridades para nós.",
		image: securityIcon,
	},
];


export const Services = () => {
	useEffect(() => {
		AOS.init({ duration: 1200 });
	});

	return (
		<section className="container py-24 sm:py-32" data-aos="zoom-in">
			<div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
				<div className="flex flex-col justify-between">
					<h2 className="text-3xl lg:text-4xl font-bold">
						<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
							Integre{" "}
						</span>
						suas publicações em qualquer sistema
					</h2>

					<p className="text-muted-foreground text-xl mt-4 mb-8 ">
						Leia a nossa documentação de API e utilize nossos endpoints para integrar as postagens em qualquer sistema
					</p>
					<div className="flex flex-col gap-8 mt-10 lg:mt-4">
						{features.map(({ image, title, description }: FeatureProps) => (
							<Card key={title}>
								<CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
									<img
										src={image}
										alt="Card icon"
										className="w-12 h-12 bg-primary/20 p-1 rounded-2xl"
									/>

									<div>
										<CardTitle>{title}</CardTitle>
										<CardDescription className="text-md mt-2">
											{description}
										</CardDescription>
									</div>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>

				<div className="flex flex-col justify-between lg:pb-2">
					<img
						src={apiIcon}
						className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
						alt="About services"
					/>
					<Button variant={"outlineWhite"} size={"lg"}>
						Mais informações
					</Button>
				</div>
			</div>
		</section>
	);
};
