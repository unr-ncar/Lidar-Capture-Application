import {
  ButtonHTMLAttributes,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";

interface IFrostedPaginationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  cursor?: boolean;
  children: ReactElement | number;
  active?: boolean;
}

function FrostedPaginationButton(props: IFrostedPaginationButtonProps) {
  const { cursor = false, children, active = false, ...rest } = props;

  return (
    <button
      className={`text-black/40 [&.active]:text-black [&.active>p]:underline disabled:hidden rounded size-6 flex place-content-center items-center ${
        active && "active"
      }`}
      {...rest}
    >
      {cursor ? (
        <p className="text-sm font-semibold decoration-2">{children}</p>
      ) : (
        <span className="size-5">{children}</span>
      )}
    </button>
  );
}

export interface IFrostedPaginationProps {
  currentPage: number;
  setPage: (page: number) => void;
  totalPageCount: number;
  totalItemCount: number;
  pageSize: number;
  selectionWindowSize?: number;
}

export default function FrostedPagination(props: IFrostedPaginationProps) {
  const {
    currentPage,
    setPage,
    totalItemCount,
    totalPageCount,
    pageSize,
    selectionWindowSize = 3,
    ...rest
  } = props;

  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(totalItemCount / pageSize));
  }, [pageSize, totalItemCount]);

  const generateDisplayedPages = () => {
    const halfWindow = Math.floor(selectionWindowSize / 2);
    let start = Math.max(1, currentPage - halfWindow);
    let end = Math.min(pageCount, currentPage + halfWindow);

    if (end - start < selectionWindowSize - 1) {
      if (start === 1) {
        end = Math.min(pageCount, start + selectionWindowSize - 1);
      } else if (end === pageCount) {
        start = Math.max(1, end - selectionWindowSize + 1);
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  const displayedPages = generateDisplayedPages().map((page) => (
    <FrostedPaginationButton
      cursor
      key={page}
      active={currentPage === page}
      onClick={() => setPage(page)}
    >
      {page}
    </FrostedPaginationButton>
  ));

  if (totalItemCount === 0) return null;

  return (
    <div className="flex justify-between items-center">
      <p className="uppercase font-semibold text-xs text-neutral-400 leading-0">
        Page {currentPage} of {totalPageCount}
      </p>
      <div className="flex flex-row gap-2" {...rest}>
        <FrostedPaginationButton
          onClick={() => setPage(1)}
          disabled={currentPage === 1 || pageCount <= selectionWindowSize}
        >
          <ChevronDoubleLeftIcon />
        </FrostedPaginationButton>
        <FrostedPaginationButton
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1 || pageCount <= selectionWindowSize}
        >
          <ChevronLeftIcon />
        </FrostedPaginationButton>
        {displayedPages}
        <FrostedPaginationButton
          onClick={() => setPage(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(totalItemCount / pageSize) ||
            pageCount <= selectionWindowSize
          }
        >
          <ChevronRightIcon />
        </FrostedPaginationButton>
        <FrostedPaginationButton
          onClick={() => setPage(Math.ceil(totalItemCount / pageSize))}
          disabled={
            currentPage === Math.ceil(totalItemCount / pageSize) ||
            pageCount <= selectionWindowSize
          }
        >
          <ChevronDoubleRightIcon />
        </FrostedPaginationButton>
      </div>
    </div>
  );
}
