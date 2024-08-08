import { Features } from "@/components/CaptationPage/Features";
import HeroSectionComponent from "@/components/CaptationPage/HeroSectionCaptationPage";
import { Services } from "@/components/CaptationPage/Services";
import StripePricingTable from "@/components/Stripe/StripePricingTable";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const CaptationPage = () => {
	useEffect(() => {
		AOS.init({ duration: 1200 });
	});

	return (
		<div>
			<div data-aos="fade-up">
				<HeroSectionComponent />
			</div>
			<Features />
			<Services />
			<StripePricingTable />
		</div>
	);
};

export default CaptationPage;
