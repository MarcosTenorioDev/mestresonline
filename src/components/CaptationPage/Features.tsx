import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import brand from "@/assets/images/branding_6980738.png";
import handPhone from "@/assets/images/hand-phone_103674.png"
import userInterface from "@/assets/images/user-interface_10401429.png"
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
		title: "Design Responsivo",
		description:
			"Experiência perfeita em qualquer dispositivo. Nosso design responsivo ajusta seu conteúdo para uma navegação fluida, seja no desktop ou smartphone.",
		image: userInterface,
	},
	{
		title: "Interface Intuitiva",
		description:
			"Facilidade de uso com uma interface clara e acessível. Interaja rapidamente com elementos bem posicionados, ideal para quem busca simplicidade.",
		image: handPhone,
	},
	{
		title: "Perfil Personalizado",
		description:
			"Personalize seu perfil adicionando suas redes sociais, imagens, arquivos e gerencie diferentes tópicos para refletir verdadeiramente sua personalidade.",
		image: brand,
	},
];



const featureList: string[] = [
	"Link para suas redes sociais",
    "Imagens/vídeos/gifs/trechos de sites",
    "Trabalhe a sua imagem profissional",
	"Anexo de arquivos públicos"
];

export const Features = () => {

	useEffect(() => {
		AOS.init({ duration: 1200 });
	});

	return (
		<section id="features" className="container py-24 sm:py-32 space-y-8" data-aos="fade-up">
			<h2 className="text-3xl lg:text-4xl font-bold md:text-center">
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					Publique{" "}
				</span>
				O seu trabalho 
			</h2>

			<div className="flex flex-wrap md:justify-center gap-4">
				{featureList.map((feature: string) => (
					<div key={feature}>
						<Badge variant="secondary" className="text-sm">
							{feature}
						</Badge>
					</div>
				))}
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{features.map(({ title, description, image }: FeatureProps) => (
					<Card key={title}>
						<CardHeader className="flex flex-row items-center gap-4">
							<CardTitle>{title}</CardTitle>
                            <img src={image} alt="Card icon" className="w-10 h-10" />
						</CardHeader>

						<CardContent>{description}</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
};
