import { Features } from "@/components/CaptationPage/Features";
import HeroSectionComponent from "@/components/CaptationPage/HeroSectionCaptationPage";
import { Post } from "@/components/CaptationPage/Post";
import { Profile } from "@/components/CaptationPage/Profile";
import { Services } from "@/components/CaptationPage/Services";
import TopicsAndAuthors from "@/components/CaptationPage/TopicsAndAuthors";
import CaptationPageNavbar from "@/components/shared/CaptationPageNavbar";
import { FooterSection } from "@/components/shared/Footer";
import StripePricingTable from "@/components/Stripe/StripePricingTable";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef } from "react";

const CaptationPage = () => {
	const integrationRef = useRef<HTMLDivElement>(null);
	const aboutRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		AOS.init({ duration: 1200 });
	}, []);

	return (
		<div>
			<CaptationPageNavbar integrationRef={integrationRef} />
			<div data-aos="fade-down">
				<HeroSectionComponent aboutRef={aboutRef} />
			</div>
			<div ref={aboutRef}>
				<Features />
				<Post />
				<TopicsAndAuthors />
				<Profile />
			</div>

			<div ref={integrationRef}>
				<Services />
			</div>
			<StripePricingTable />
			<FooterSection />
		</div>
	);
};

export default CaptationPage;
