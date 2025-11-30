import { Link } from 'react-router'; 

export default function ErrorPage() {
  return (
    <div className=" font-[Chalkduster] min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8">
      <div className="mb-6">
       <img src="/images/камни.png" alt="Лес" />
      </div>

      <h1 className="text-5xl font-bold text-emerald-200 mb-4">Страница не найдена</h1>
      <p className="text-gray-500 text-center max-w-md mb-8">
      К сожалению, запрошенная вами страница не найдена.
 <br />
       Пожалуйста, вернитесь на главную страницу.
      </p>

   
      <Link
        to="/"
        className="text-[#9be7d09b] font-semibold hover:text-[#ffffff] transition-colors text-lg  px-8 py-3 rounded-lg transform hover:scale-105 inline-block"
      >
        НА ГЛАВНУЮ
      </Link>
    </div>
  );
}