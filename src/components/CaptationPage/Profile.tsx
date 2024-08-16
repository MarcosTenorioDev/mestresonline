import { useEffect } from "react";
import * as AOS from "aos";

export const Profile = () => {
	useEffect(() => {
		AOS.init({ duration: 1200 });
	});

	return (
		<section
			id="Profile"
			className="container py-24 sm:py-32 space-y-8"
			data-aos="fade-up"
		>
			<h2 className="text-3xl lg:text-4xl font-bold md:text-center">
				Gerencie o seu{" "}
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					Perfil
				</span>
			</h2>
			<p className="mt-3 text-xl text-muted-foreground text-center">
				Na página inicial da aplicação, você pode visualizar suas postagens,
				acessá-las facilmente, encontrar o link para o seu perfil
				público e também editá-lo conforme necessário.
			</p>

			<img
				src="https://mestres-online-develop.s3.us-east-2.amazonaws.com/banner.png"
				alt="Imagem do menu mestres_Online"
				className="border border-primary rounded-md mb-auto mx-auto shadow-xl"
			/>
		</section>
	);
};
