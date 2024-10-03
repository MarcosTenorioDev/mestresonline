import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IRecommendationCard } from "@/core/interfaces/posts.interface";

const RecommendationCard = ({ post }: { post: IRecommendationCard }) => {
	return (
    <div className="w-[300px] h-[400px] flex flex-col gap-2 hover:cursor-pointer" key={post.id} onClick={() => window.location.href = `/${post.company.publicCode}/post/${post.id}`}>
    <img
      src={post.imagePreview}
      alt="Post preview"
      className="mx-auto h-[180px] w-full object-cover"
    />
    <div className="flex items-center gap-2 py-2">
      <Avatar className="w-5 h-5">
        <AvatarImage
          src={post.author.imageProfile || ""}
          alt="Profile Image"
        />
        <AvatarFallback>null</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-1">
        <h4 className="font-medium text-gray-800 text-xs">
          {post.author.name}
        </h4>
        <a
          className="text-xs font-medium text-gray-800 hover:underline"
          href={`/${post.company.publicCode}`}
        >
          <span className="text-xs font-normal text-gray-500">em</span>{" "}
          {post.company.name}
        </a>
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <div>
        <h3 className="line-clamp-2 text-lg font-bold">{post.title}</h3>
      </div>
      <div>
        <h4 className="line-clamp-2 text-sm font-semibold text-gray-400">
          {post.contentPreview}
        </h4>
      </div>
    </div>
  </div>
  
	);
};

export default RecommendationCard;
