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
        className="cursor-pointer hover:bg-blue-300 bg-blue-100 p-4 flex flex-col justify-center text-md text-gray-800 border rounded-md border-gray-500 border-dashed w-full md:h-40 lg:h-40"
      >
        <p className="text-sm text-gray-900 font-semibold">
          {props.item.source.name}
        </p>
        <p className="text-lg text-black font-bold">{props.item.title}</p>
        <p className="text-md text-black">{props.item.content}</p>
        <p className="text-md text-gray-600 font-semibold">
          {props.item.author}
        </p>
      </div>
      {isOpenModal && <NewsModal modalRef={modalRef} item={props.item} />}
    </>
  );
};

export default NewsContainer;
