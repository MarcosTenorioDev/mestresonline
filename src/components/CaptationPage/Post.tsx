import { useEffect } from "react";
import * as AOS from "aos";

export const Post = () => {
    useEffect(() => {
		AOS.init({ duration: 1200 });
	});
	return (
		<section id="Post" className="container py-24 sm:py-32 space-y-8" data-aos="fade-up">
			<h2 className="text-3xl lg:text-4xl font-bold md:text-center">
				Faça agora sua primeira{" "}
				<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
					postagem
				</span>
			</h2>
			<p className="mt-3 text-xl text-muted-foreground text-center">
				Na página de edição de postagem você pode criar a sua postagem, editar, gerênciar sua visibilidade, adicionar imagens, vídeos, gifs, e muito mais...
			</p>

			<img
				src="https://mestres-online-develop.s3.us-east-2.amazonaws.com/post.png"
				alt="Editor de posts mestres_Online"
				className="border border-primary rounded-md mb-auto mx-auto shadow-xl"
			/>
		</section>
	);
};
