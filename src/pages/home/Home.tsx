import PostPreview from "@/components/PostPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import ownerImage from "../../assets/images/image 10.png";
import imagePreview from '../../assets/images/mockPreview.jpg'
import ownerImage2 from '../../assets/images/owner2.png'
import imagePreview2 from '../../assets/images/imagepreview2.jpg'

const Home = () => {
  const jsonExample = [
    {
      ownerImage:ownerImage,
      ownerName: "Cleyson Batista Monteiro",
      createdAt: "20/08/2023",
      topic: "Neurociências",
      titlePreview:
        "A importância da prática da atividade física na saúde mental e seu viés neuropsicológico",
      contentPreview:
        "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting...",
      imagePreview:imagePreview
    },
    {
      ownerImage:ownerImage2,
      ownerName: "Marcia Karine Costa",
      createdAt: "20/08/2023",
      topic: "Terapia Cognitivo Comportamental",
      titlePreview:
        "Entenda os fundamentos do método ABA e o que ele pode oferecer para as crianças autistas",
      contentPreview:
        "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting...",
      imagePreview:imagePreview2
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto py-10 min-h-screen px-10">
      <h1 className="text-5xl mb-12">Clínica Ativamente</h1>
      <div className="border-b-2 pb-10">
        <h2 className="text-2xl">Minhas postagens</h2>

        <p className="mt-6 text-xs">Pesquise suas postagens</p>
        <div className="flex">
          <Input
            className=" w-80 h-8 mr-3 border-2"
            placeholder="Pesquise pelo título, autor ou tema"
          />
          <Button className="p-2 h-8">
            <SearchIcon className="w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-16">
        {jsonExample.map((data: any) => (
          <PostPreview
            ownerImage={data.ownerImage}
            ownerName={data.ownerName}
            createdAt={data.createdAt}
            topic={data.topic}
            titlePreview={data.titlePreview}
            contentPreview={data.contentPreview}
            imagePreview={data.imagePreview}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
