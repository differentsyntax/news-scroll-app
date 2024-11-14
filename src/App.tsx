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
  const [newsData, setNewsData] = useState<News[] | null>(null);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const res = await data.json();
      if (res.status === "ok") {
        setNewsData(res.articles);
      }

      console.log(newsData);
    } catch (err) {
      console.log("Error fetching news data", err);
      setError(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      <div className="fixed top-0 bg-black h-20 w-full flex justify-center items-center">
        <h1 className="text-white text-lg font-semibold">
          Latest in the United States
        </h1>
      </div>
      <div className="flex items-center justify-center w-full my-32 mx-40">
        {error && <h1>Error fetching data!</h1>}
        {!error &&
          (loading ? (
            <h1>loading...</h1>
          ) : !newsData ? (
            <h1>Nothing to display...</h1>
          ) : (
            <ul>
              {newsData.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-center items-center w-md m-4"
                >
                  <NewsContainer item={item} />
                </li>
              ))}
            </ul>
          ))}
      </div>
    </div>
  );
};

export default App;
