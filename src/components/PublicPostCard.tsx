import { DotFilledIcon } from "@radix-ui/react-icons";
import { Card, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface PublicPostCardProps {
  post: {
    author: {
      imageProfile: string;
      name: string;
      office?: string;
    };
    publishedAt: string;
    title: string;
    contentPreview: string;
    imagePreview: string;
    topics: {
      id: string;
      description: string;
    }[];
  };
}

const PublicPostCard: React.FC<PublicPostCardProps> = ({ post }) => {
  return (
    <Card className="lg:max-w-[1000px] border-2 px-4 sm:px-10 py-6 lg:flex-row items-center w-full justify-between transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
      <div className="flex flex-col xl:flex-row items-center xl:items-start justify-between w-full">
        {/* Informação principal do post */}
        <div className="mr-6 w-full sm:w-auto sm:mx-0 mx-auto">
          <CardHeader className="flex sm:flex-row sm:gap-3 px-0 xl:p-0">
            {/* Avatar do autor */}
            <Avatar className="w-14 h-14 mx-auto sm:mx-0">
              <AvatarImage src={post.author.imageProfile} alt="Imagem de perfil" />
              <AvatarFallback>null</AvatarFallback>
            </Avatar>
            
            {/* Detalhes do autor */}
            <div className="ml-1">
              <div className="flex flex-col sm:flex-row items-center gap-1">
                <div className="flex flex-nowrap justify-center items-center">
                  <h4 className="mr-1">{post.author.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    - {post.author.office && post.author.office}
                  </p>
                </div>
                <i className="flex items-center justify-center">
                  <DotFilledIcon className="w-[10px] text-muted-foreground" />
                </i>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>

              {/* Tópicos associados ao post */}
              <div className="flex gap-1 mt-1 flex-wrap justify-center sm:justify-start">
                {post.topics.map((topic) => (
                  <Badge variant={"outline"} key={topic.id}>
                    {topic.description}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>

          {/* Título e prévia do conteúdo */}
          <div>
            <h2 className="text-md text-center md:text-start sm:text-lg md:text-2xl font-bold mt-4">
              {post.title}
            </h2>
            <h3 className="text-xs text-center md:text-justify sm:text-sm font-normal mt-4">
              {post.contentPreview}
            </h3>
          </div>
        </div>

        {/* Imagem de pré-visualização */}
        <div className="md:ml-10 my-auto">
          <img
            src={post.imagePreview}
            alt="pré visualização da imagem"
            className="w-[350px] aspect-video md:min-w-[350px] mt-5 xl:mt-0"
          />
        </div>
      </div>
    </Card>
  );
};

export default PublicPostCard;
