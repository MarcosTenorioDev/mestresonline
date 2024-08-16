import { Features } from "@/components/CaptationPage/Features";
import HeroSectionComponent from "@/components/CaptationPage/HeroSectionCaptationPage";
import { Services } from "@/components/CaptationPage/Services";
import CaptationPageNavbar from "@/components/shared/CaptationPageNavbar";
import { FooterSection } from "@/components/shared/Footer";
import StripePricingTable from "@/components/Stripe/StripePricingTable";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef } from "react";

const CaptationPage = () => {
	const pricingRef = useRef<HTMLDivElement>(null);
	const aboutRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		AOS.init({ duration: 1200 });
	}, []);

	return (
		<div>
			<CaptationPageNavbar pricingRef={pricingRef} />
			<div data-aos="fade-up">
				<HeroSectionComponent aboutRef={aboutRef} />
			</div>
			<div ref={aboutRef}>
				<Features />
			</div>

			<Services />
			<div ref={pricingRef}>
				<StripePricingTable />
			</div>
			<FooterSection />
		</div>
	);
};

export default CaptationPage;
