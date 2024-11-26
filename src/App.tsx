import { useEffect, useState } from "react";
import { API_KEY } from "./config";
import NewsContainer from "./components/news-container/NewsContainer";

type Source = {
  id: number | null;
  name: string;
};

export type News = {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
};

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newsData, setNewsData] = useState<News[] | []>([]);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const pageSize = 10;

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading
      ) {
        setPage((prevState) => prevState + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const fetchData = async () => {
    try {
      const data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const res = await data.json();
      if (res.status === "ok") {
        setNewsData((prevData) => [...prevData, ...res.articles]);
      }
    } catch (err) {
      console.log("Error fetching news data", err);
      setError(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full bg-black fixed top-0 h-20 flex items-center justify-center shadow-md z-10">
        <h1 className="text-white text-lg font-semibold">
          Latest in the United States
        </h1>
      </header>

      <main className="flex flex-col items-center w-full px-4 mt-24">
        {error ? (
          <h1 className="text-red-500 text-xl font-bold">
            Error fetching data!
          </h1>
        ) : loading ? (
          <h1 className="text-gray-500 text-xl font-medium">Loading...</h1>
        ) : newsData.length === 0 ? (
          <h1 className="text-gray-700 text-lg font-medium">
            Nothing to display...
          </h1>
        ) : (
          <ul className="grid gap-4 w-full max-w-screen-lg">
            {newsData.map((item, index) => (
              <li key={index} className="bg-white rounded-lg shadow-md p-4">
                <NewsContainer item={item} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default App;
