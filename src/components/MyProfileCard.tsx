import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MyProfileCardProps {
  company: {
    banner?: string;
    image: string;
    name: string;
    description: string;
  };
  placeholder: string;
}

const MyProfileCard: React.FC<MyProfileCardProps> = ({ company, placeholder }) => {
  return (
    <Card className="w-full cursor-pointer">
      <CardContent className="flex flex-col items-center justify-center hover:bg-gray-100 transition duration-300 p-0">
        <div className="relative w-full">
          <img
            src={company.banner ? company.banner : placeholder}
            className="aspect-video w-full h-full object-cover rounded-md"
            alt="banner do perfil"
            style={{
              maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4))",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4))",
            }}
          />

          <div className="flex flex-col items-center justify-center gap-5 absolute top-0 lg:bottom-2 px-4 w-full h-full">
            <div className="relative lg:w-28 lg:h-28 lg:min-w-28 lg:min-h-28 flex justify-center pt-2 md:pt-6 lg:pt-0">
              <img
                src={company.image}
                className="w-4/12 lg:w-28 lg:h-28 lg:min-w-28 lg:min-h-28 rounded-full border-4 bg-gray-300"
                alt="imagem do perfil"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xs sm:text-base text-center lg:text-3xl font-extrabold tracking-tight">
                {company.name}
              </h1>
            </div>
            <p className="text-sm font-semibold hidden lg:block tracking-tight text-center w-full truncate">
              {company.description}
            </p>
          </div>
        </div>
        <div className="p-4 lg:hidden w-full">
          <p className="text-xs font-medium text-muted-foreground lg:hidden tracking-tight text-center w-full truncate">
            {company.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyProfileCard;
