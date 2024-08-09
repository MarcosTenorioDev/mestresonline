import { NavItem } from "@/core/interfaces/navbarTypes";
import { Building2, FileEditIcon, UserCheck2, Pilcrow } from "lucide-react";

export const NavItems: NavItem[] = [
    {
      title: "Meus perfis",
      icon: Building2,
      href: "/",
      color: "text-primary",
    },  
    {
      title: "Nova publicação",
      icon: FileEditIcon,
      href: "/publication",
      color: "text-primary",
      protected: true
    },  
    {
      title: "Criar novo tópico",
      icon: Pilcrow,
      href: "/topics",
      color: "text-primary",
      protected: true
    }, 
    {
      title: "Criar novo autor",
      icon: UserCheck2,
      href: "/author",
      color: "text-primary",
      protected: true
    },   
];

/*   {
      title: "eventos",
      icon: HomeIcon,
      href: "/managment/events",
      color: "text-orange-500",
      isChidren: true,
      children: [
        {
          title: "eventos-01",
          icon: HomeIcon,
          color: "text-red-500",
          href: "/",
        },
        {
          title: "Example-02",
          icon: HomeIcon,
          color: "text-red-500",
          href: "/",
        },
        {
          title: "eventos-03",
          icon: HomeIcon,
          color: "text-red-500",
          href: "/",
        },
      ],
    }, */