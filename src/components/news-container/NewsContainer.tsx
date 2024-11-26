import { useEffect, useRef, useState } from "react";
import { News } from "../../App";
import NewsModal from "../news-modal/NewsModal";

export type NewsContainerProps = {
  item: News;
};

const NewsContainer = (props: NewsContainerProps) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpenModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setOpenModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpenModal]);

  return (
    <>
      <div
        onClick={() => setOpenModal(!isOpenModal)}
        className="cursor-pointer hover:bg-blue-200 bg-white shadow-md rounded-lg p-6 flex flex-col justify-between transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        <p className="text-sm text-gray-500 font-medium mb-2">
          {props.item.source.name || "Unknown Source"}
        </p>
        <h2 className="text-lg text-gray-900 font-semibold mb-4 line-clamp-2">
          {props.item.title}
        </h2>
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
          {props.item.content || "No content available."}
        </p>
        <p className="text-xs text-gray-400 font-medium">
          {props.item.author || "Unknown Author"}
        </p>
      </div>
      {isOpenModal && <NewsModal modalRef={modalRef} item={props.item} />}
    </>
  );
};

export default NewsContainer;
