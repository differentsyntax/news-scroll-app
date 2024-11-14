import { RefObject } from "react";
import { NewsContainerProps } from "../news-container/NewsContainer";

type NewsModalProps = NewsContainerProps & {
  modalRef: RefObject<HTMLDivElement>;
};

const NewsModal = (props: NewsModalProps) => {
  return (
    <div className="fixed inset-0 h-screen w-screen z-50 bg-opacity-40 bg-black flex items-center justify-center">
      <div
        className="relative border-gray-900 bg-gray-900 text-white max-w-lg rounded-md h-3/4 overflow-auto p-20"
        ref={props.modalRef}
      >
        <p>
          {props.item.content
            ? props.item.content
            : `No preview content to display`}
        </p>
        <a
          href={props.item.url}
          aria-label="URL to full article"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 underline"
        >{`Read full`}</a>
      </div>
    </div>
  );
};

export default NewsModal;
