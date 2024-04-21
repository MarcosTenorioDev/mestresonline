import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Select, Input } from "@/components/shared/Inputs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
  const [loading, setLoading] = useState(false)

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
      content:[

      ]
    }

    setLoading(false)
  };

  const [imagePreview, setImagePreview] = useState<any>("");

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
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="w-10/12 flex flex-col justify-between border-b-2 mx-auto py-7">
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
                <Input control="topic" />
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
    </div>
  );
};

export default Publication;
