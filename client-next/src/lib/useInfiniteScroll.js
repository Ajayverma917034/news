import { useCallback, useRef, useState, useEffect } from "react";

const useInfiniteScroll = (callback, hasMore) => {
  const observer = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setIsLoading(true);
          callback();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, callback]
  );

  useEffect(() => {
    if (!isLoading) return;
    setIsLoading(false);
  }, [isLoading]);

  return [lastElementRef, isLoading];
};

export default useInfiniteScroll;
