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

interface FeatureProps {
	title: string;
	description: string;
	image: string;
}

const features: FeatureProps[] = [
	{
		title: "Design responsivo",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
		image: userInterface,
	},
	{
		title: "Interface intuitiva",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
		image: handPhone,
	},
	{
		title: "Perfil personalizado",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
		image: brand,
	},
];

const featureList: string[] = [
	"Link para suas redes sociais",
    "Imagens/vídeos/gifs/trechos de sites",
    "Trabalhe a sua imagem profissional",
];

export const Features = () => {
	return (
		<section id="features" className="container py-24 sm:py-32 space-y-8">
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
