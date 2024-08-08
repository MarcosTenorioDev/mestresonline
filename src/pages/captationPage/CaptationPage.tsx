import { Features } from "@/components/CaptationPage/Features";
import HeroSectionComponent from "@/components/CaptationPage/HeroSectionCaptationPage";
import { Services } from "@/components/CaptationPage/Services";
import  StripePricingTable  from "@/components/Stripe/StripePricingTable";
const CaptationPage = () => {
	return (
		<div>
			<HeroSectionComponent />
			<Features />
			<Services />
			<StripePricingTable />
		</div>
	);
};

export default CaptationPage;
