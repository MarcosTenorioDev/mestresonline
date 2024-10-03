import { Button } from '@/components/ui/button'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // If using React Router
import notFoundImage from '@/assets/images/notFoundImage.png'; // Add your image path here

interface NotFoundProps 
{
    message:string, 
    statusCode:string, 
    backUrl:string, 
    buttonText:string 
}
const NotFound = (props: NotFoundProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <img 
          src={notFoundImage} 
          alt="Page not found" 
          className="mx-auto mb-6 w-64 h-auto" 
        />
        <h1 className="text-6xl font-bold text-gray-800">{props.statusCode}</h1>
        <p className="mt-4 text-lg text-gray-600">
         {props.message}
        </p>
        <Button className="mt-6" onClick={() => navigate(props.backUrl)}>
          {props.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
