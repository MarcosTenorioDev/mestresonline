import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Select, Input } from "@/components/shared/Inputs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Publication = () => {
/*   const initialValues = {
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
  const [paragraphs, setParagraphs] = useState([{ type: 'text', content: '' }]);
  const [imagePreview, setImagePreview] = useState<any>("");
  const paragraphInputRefs = useRef<any>([]);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (values: any) => {
    if (!hasImage) {
      setShowImageValidator(true)
      return
    }
    setLoading(true)
    let {image, ...rest} = values
    image = imagePreview;

    const payload = {
      info: {
        image,
        ...rest
      },
      content: paragraphs
    }

    console.log(payload)
    setLoading(false)
  };

  const handleImageChange = (event: any) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setHasImage(true);
        setShowImageValidator(false)
      };
      reader.readAsDataURL(file);
    }
  }; */

/*   const handleParagraphChange = (index:any, content:any) => {
    const updatedParagraphs = [...paragraphs];
    updatedParagraphs[index].content = content;
    setParagraphs(updatedParagraphs);

    // Verifique se o parágrafo está vazio e remova-o se necessário
    if (content.trim() === '' && paragraphs.length > 1) {
      const newParagraphs = paragraphs.filter((_, idx) => idx !== index);
      setParagraphs(newParagraphs);
    }
  }; */

/*   const handleAddParagraph = () => {
    setParagraphs([...paragraphs, { type: 'text', content: '' }]);
  }; */

/*   const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(paragraphs);
  }; */

/*   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      if (index === paragraphs.length - 1) {
        handleAddParagraph();
      }
      if (index < paragraphInputRefs.current.length - 1) {
        const nextInputRef = paragraphInputRefs.current[index + 1];
        nextInputRef.focus();
      }
    }
  }; */

  return (
    <div className="max-w-screen-2xl mx-auto px-10">
      <h1>publication</h1>
      {/* <Formik
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
                <Input control="topic" fieldClassName='px-2'/>
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
      </Formik> */}

      {/* <div className="max-w-screen-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="max-w-screen-2xl mt-10">
            <input type="text" placeholder="TITLE..." className="border-l-2 pl-4 text-3xl w-full focus:border-transparent focus:outline-nonefocus:border-transparent focus:outline-none" ref={titleInputRef} />
          </div>
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="mt-4">
              <input
                type="text"
                placeholder="Enter paragraph..."
                className="border-l-2 pl-4 w-full h-auto focus:border-transparent focus:outline-nonefocus:border-transparent focus:outline-none"
                value={paragraph.content}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(input) => {
                  paragraphInputRefs.current[index] = input;
                }}
              />
            </div>
          ))}
        </form>
      </div> */}
    </div>
  );
};

export default Publication;
