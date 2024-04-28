import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Select, Input } from "@/components/shared/Inputs";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, PlusCircle, XIcon } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const Publication = () => {
  const initialValues = {
    author: "",
    topic: "",
    image: "",
  };

  const validationSchema = Yup.object({
    author: Yup.string().required("Autor da publicação é obrigatório*"),
    topic: Yup.string().required("Insira o tópico da publicação*"),
    image: Yup.string(),
  });

  const [hasImage, setHasImage] = useState(false);
  const [showImageValidator, setShowImageValidator] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paragraphs, setParagraphs] = useState([{ type: "text", content: "" }]);
  const [imagePreview, setImagePreview] = useState<any>("");
  const paragraphInputRefs = useRef<any>([]);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [focusedInput, setFocusedInput] = useState<number | null>(null); // Estado para controlar qual input está focado

  const onSubmit = async (values: any) => {
    if (!hasImage) {
      setShowImageValidator(true);
      return;
    }
    setLoading(true);
    let { image, ...rest } = values;
    image = imagePreview;

    const payload = {
      info: {
        image,
        ...rest,
      },
      content: paragraphs,
    };

    console.log(payload);
    setLoading(false);
  };

  const handleImageChange = (event: any) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setHasImage(true);
        setShowImageValidator(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleParagraphChange = (index: any, content: any) => {
    const updatedParagraphs = [...paragraphs];
    updatedParagraphs[index].content = content;
    setParagraphs(updatedParagraphs);

    // Verifique se o parágrafo está vazio e remova-o se necessário
    if (content.trim() === "" && paragraphs.length > 1) {
      const newParagraphs = paragraphs.filter((_, idx) => idx !== index);
      setParagraphs(newParagraphs);
    }
  };

  const handleAddParagraph = () => {
    setParagraphs([...paragraphs, { type: "text", content: "" }]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(paragraphs);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Impede a ação padrão de pressionar Enter
  
      if (index === paragraphs.length - 1) {
        handleAddParagraph();
      }
  
      // Encontra o próximo campo de texto disponível
      let nextIndex = index + 1;
      while (nextIndex < paragraphs.length && paragraphs[nextIndex].type !== "text") {
        nextIndex++;
      }
  
      if (nextIndex < paragraphs.length) {
        const nextInputRef = paragraphInputRefs.current[nextIndex];
        nextInputRef.focus();
      } else {
        handleAddParagraph();
      }
    }
  };
  

  const handleInsertImage = (index: number) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const updatedParagraphs = [...paragraphs];
          updatedParagraphs[index] = { type: "image", content: reader.result as string }; // Adiciona imagem
          updatedParagraphs.splice(index + 1, 0, { type: "text", content: "" }); // Adiciona novo parágrafo de texto abaixo da imagem
          setParagraphs(updatedParagraphs);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedParagraphs = [...paragraphs];
    updatedParagraphs[index] = { type: "text", content: "" };
    setParagraphs(updatedParagraphs);
  };
  

  return (
    <div className="max-w-screen-2xl mx-auto px-10 pb-40">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col justify-between border-b-2 mx-auto py-7">
          <div className="flex justify-between">
            <h1 className="text-2xl mb-10">
              Nova publicação em Clinica Ativamente
            </h1>
            <Button variant={"default"} type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Publicar"}
            </Button>
          </div>
          <div className="flex-col flex sm:flex-row sm:gap-32 md:gap-48 items-center">
            {" "}
            <div className="w-full sm:w-auto">
              <div className="mb-5">
                <h2>Autor da publicação</h2>
                <Select
                  control="author"
                  options={[
                    { value: "", label: "Selecione um autor" },
                    {
                      value: "Cleyson Batista Monteiro",
                      label: "Cleyson Batista Monteiro",
                    },
                    {
                      value: "Marcia Karine Costa",
                      label: "Marcia Karine Costa",
                    },
                  ]}
                ></Select>
              </div>
              <div className="mb-5">
                <h2>Assunto da publicação</h2>
                <Input control="topic" fieldClassName="px-2" />
              </div>
            </div>
            <div>
              <h2>Insira a imagem de capa da publicação</h2>
              <input
                type="file"
                id="image"
                name="image"
                className="mb-8 text-xs"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-[240px] h-36 mb-2 mx-auto"
                  />
                ) : (
                  <>
                    <label htmlFor="">Pré-visualização :</label>
                    <div className="bg-gray-200 h-36 w-[240px] mb-2 flex justify-center items-center">
                      <p className="text-gray-400">Selecione uma imagem</p>
                    </div>
                  </>
                )}
              </div>
              {showImageValidator && (
                <>
                  <p className="text-red-500 font-medium">
                    Imagem é obrigatória
                  </p>
                </>
              )}
            </div>
          </div>
        </Form>
      </Formik>

      <div className="max-w-screen-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="max-w-screen-2xl mt-10">
            <input
              type="text"
              placeholder="TITLE..."
              className="border-l-2 pl-4 ml-10 text-3xl w-full focus:border-transparent focus:outline-nonefocus:border-transparent focus:outline-none"
              ref={titleInputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (paragraphInputRefs.current.length > 0) {
                    const firstParagraphInputRef =
                      paragraphInputRefs.current[0];
                    firstParagraphInputRef.focus();
                  }
                }
              }}
            />
          </div>
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="mt-4 flex ml-10 relative">
              {paragraph.type === "text" ? (
                <input
                  type="text"
                  placeholder="Enter paragraph..."
                  className="border-l-2 pl-4 w-full h-auto focus:border-transparent focus:outline-nonefocus:border-transparent focus:outline-none"
                  value={paragraph.content}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={() => setFocusedInput(index)}
                  ref={(input) => {
                    paragraphInputRefs.current[index] = input;
                  }}
                />
              ) : (
                <div className="relative">
                  <img
                    src={paragraph.content}
                    alt={`Image paragraph ${index}`}
                    className=""
                  />
                  <button
                    className="absolute top-0 right-0 mt-1 mr-1 bg-white bg-opacity-50 p-1 rounded-full border-2 border-red-500"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <XIcon className="text-red-500"/>
                  </button>
                </div>
              )}
              {focusedInput === index && (
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="absolute -left-16 -top-1">
                      <PlusCircle className="w-8 h-8" />
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem
                        className="cursor-pointer"
                        onClick={() => handleInsertImage(index)}
                      >
                        Inserir imagem{" "}
                        <MenubarShortcut>
                          <ImageIcon />
                        </MenubarShortcut>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              )}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default Publication;
