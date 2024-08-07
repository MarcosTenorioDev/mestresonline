import { useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import PlanCard from "../PlanCards";

const plans = [
  {
    link: import.meta.env.VITE_LINK_MONTHLY,
    priceId: import.meta.env.VITE_PRICE_ID_MONTHLY,
    price: 35,
    duration: "/month",
    mostEconomic: false,
    cardTitle: "Mensal",
    description: "Tenha acesso agora a suas postagens e integre-as em qualquer sistema",
    features: ["Até 100 postagens", "Equipe de suporte disponível 24hrs", "Endpoint de API único para você", "Integração em qualquer sistema"],
    monthly: true
  },
  {
    link: import.meta.env.VITE_LINK_YEARLY,
    priceId: import.meta.env.VITE_PRICE_ID_YEARLY,
    price: 300,
    duration: "/year",
    mostEconomic: true,
    cardTitle: "Anual",
    description: "(ou, 25 reais por mês)",
    features: ["Até 100 postagens", "Equipe de suporte disponível 24hrs", "Endpoint de API único para você", "Integração em qualquer sistema"],
    monthly: false
  }
];

export default function PricingSectionCards() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <>
      <div className="container py-24 lg:py-32">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Planos
          </h2>
          <p className="mt-1 text-muted-foreground">
            Escolha o melhor plano para você
          </p>
        </div>

        <div className="flex justify-center items-center">
          <Label htmlFor="payment-schedule" className="me-3">
            Plano mensal
          </Label>
          <Switch
            id="payment-schedule"
            onCheckedChange={(checked:boolean) => setIsAnnual(checked)}
          />
          <Label htmlFor="payment-schedule" className="relative ms-3">
            Plano anual
            <span className="absolute -top-10 start-auto -end-28">
              <span className="flex items-center">
                <svg
                  className="w-14 h-8 -me-6"
                  width={45}
                  height={25}
                  viewBox="0 0 45 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                </svg>
                <Badge className="mt-3 uppercase">Desconto de 20%</Badge>
              </span>
            </span>
          </Label>
        </div>

        <div className="mt-12 flex w-full gap-6 lg:items-center">
          {plans
            .filter((plan) => plan.monthly !== isAnnual)
            .map((plan, index) => (
              <PlanCard key={index} plan={plan} isAnnual={isAnnual} />
            ))}
        </div>
      </div>
    </>
  );
}
