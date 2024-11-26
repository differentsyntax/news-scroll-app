import { RefObject } from "react";
import { NewsContainerProps } from "../news-container/NewsContainer";

type NewsModalProps = NewsContainerProps & {
  modalRef: RefObject<HTMLDivElement>;
};

const NewsModal = (props: NewsModalProps) => {
  return (
    <div className="fixed inset-0 h-screen w-screen z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div
        className="relative bg-white text-gray-800 max-w-xl w-full rounded-lg shadow-lg p-8 overflow-auto h-3/4"
        ref={props.modalRef}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Close modal"
          onClick={() => {
            if (props.modalRef.current) {
              props.modalRef.current.style.display = "none";
            }
          }}
        >
          ✕
        </button>

        {/* Modal Content */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {props.item.title || "No title available"}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {props.item.author || "Unknown Author"}
          </p>
          <p className="text-md text-gray-700">
            {props.item.content
              ? props.item.content
              : "No preview content to display"}
          </p>
        </div>

        {/* Read Full Article Link */}
        <a
          href={props.item.url}
          aria-label="URL to full article"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Read Full Article
        </a>
      </div>
    </div>
  );
};

export default NewsModal;
