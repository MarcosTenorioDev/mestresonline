import { DotFilledIcon } from "@radix-ui/react-icons";
const PostPreview = (props: any) => {
  return (
    <div className="flex items-center">
      <div className="max-w-[500px] mr-6">
        <div className="flex">
          <img src={props.ownerImage} alt="foto do usuário" className="w-12"/>
          <div className="ml-4">
            <div className="flex items-center gap-1">
              <h4 className="">{props.ownerName}</h4>
              <i className="flex items-center justify-center">
                <DotFilledIcon className="w-[10px] text-muted-foreground" />
              </i>
              <p className="text-xs text-muted-foreground">{props.createdAt}</p>
            </div>
            <p className="text-muted-foreground text-xs">{props.topic}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mt-4">{props.titlePreview}</h2>
          <h3 className="text-sm font-normal mt-4">{props.contentPreview}</h3>
        </div>
      </div>
      <div>
        <img
          src={props.imagePreview}
          alt="pré visualização da imagem"
          className="w-[250px] border-[1px]"
        />
      </div>
    </div>
  );
};

export default PostPreview;
