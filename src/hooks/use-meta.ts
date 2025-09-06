import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const CHUNK_SIZE = 20;

const DEFAULT_OPTIONS: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

interface Metadata {
  id: string;
  data: Array<string | number | object>;
}

export const useMeta = <T extends Metadata, R extends { name: string }>(
  endpoint: `/api/${string}`,
  body: object,
  options = DEFAULT_OPTIONS,
) => {
  const [metadata, setMetadata] = useState<T | null>(null);
  const [loadingMeta, setLoadingMeta] = useState<boolean>(false);

  const [extras, setExtras] = useState<R[]>([]);
  const [loadingExtras, setLoadingExtras] = useState<boolean>(false);
  const [nextIndex, setNextIndex] = useState<number>(0);
  const [loadingAll, setLoadingAll] = useState<boolean>(false);

  const metaAbortRef = useRef<AbortController | null>(null);
  const extrasAbortRef = useRef<AbortController | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  // Fetch set metadata from our API
  useEffect(() => {
    const controller = new AbortController();
    metaAbortRef.current?.abort();
    metaAbortRef.current = controller;

    const fetchMetadata = async () => {
      try {
        setLoadingMeta(true);
        const response = await fetch(endpoint, {
          ...options,
          body: JSON.stringify(options.body),
          signal: controller.signal,
        });

        // console.log("[useGetMeta] /api/icones status:", response.status);

        const json = (await response.json()) as { data: T };
        // console.log(
        //   "[useGetMeta] /api/icones payload keys:",
        //   json?.data ? Object.keys(json.data).length : 0,
        // );

        if (!controller.signal.aborted) {
          setMetadata(json.data);
        }
      } catch (err) {
        if ((err as { name?: string }).name === "AbortError") {
          console.log("[useGetMeta] metadata request aborted");
          return;
        }
        console.error("[useGetMeta] metadata error:", err);
      } finally {
        setLoadingMeta(false);
      }
    };

    fetchMetadata().catch((e) =>
      console.error("[useGetMeta] unhandled metadata:", e),
    );
    return () => controller.abort();
  }, []);

  const doFetchIcons = useCallback(
    async (start: number) => {
      if (!metadata) return;
      const id = (metadata.id || "proicons").trim();
      const list = metadata.data.slice(start, start + CHUNK_SIZE);
      if (list.length === 0) return;

      // Encode as "alarm-clock%2C..." by encoding the comma-separated string with a trailing comma
      const encoded = encodeURIComponent(list.join(",") + ",");
      const url = `https://api.iconify.design/${id}.json?icons=${encoded}`;
      // console.log("[useGetMeta] iconify encoded param:", encoded);

      const controller = new AbortController();
      extrasAbortRef.current?.abort();
      extrasAbortRef.current = controller;

      try {
        setLoadingExtras(true);
        const res = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        // console.log("[useGetMeta] iconify status:", res.status, "url:", url);

        const payload = (await res.json()) as T;
        // const count = payload?.icons ? Object.keys(payload.icons).length : 0;
        // console.log("[useGetMeta] iconify icons count:", count);

        if (!controller.signal.aborted && "data" in payload) {
          const entries = Object.entries(payload.data ?? {}).map(
            ([name]) =>
              ({
                name,
              }) as R,
          );
          setExtras((prev) => [...prev, ...entries]);
          setNextIndex(start + list.length);
        }
      } catch (err) {
        if ((err as { name?: string }).name === "AbortError") {
          console.log("[useGetMeta] iconify request aborted");
          return;
        }
        console.error("[useGetMeta] iconify error:", err);
      } finally {
        setLoadingExtras(false);
      }
    },
    [metadata],
  );

  // Automatically fetch the first chunk after metadata arrives
  useEffect(() => {
    if (metadata && metadata.data.length === 0 && !loadingExtras) {
      void doFetchIcons(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata]);

  const hasMore = useMemo(() => {
    if (!metadata) return false;
    return nextIndex < metadata.data.length;
  }, [metadata, nextIndex]);
  const loadMore = useCallback(() => {
    if (!metadata) return;
    if (loadingExtras) return;
    if (!hasMore) return;
    scrollAreaRef.current?.scrollIntoView({ behavior: "smooth" });
    void doFetchIcons(nextIndex);
  }, [metadata, loadingExtras, hasMore, doFetchIcons, nextIndex]);

  // Load all remaining icons in sequential chunks
  const loadAll = useCallback(async () => {
    if (!metadata) return;
    if (loadingExtras || loadingAll) return;

    setLoadingAll(true);
    try {
      let i = nextIndex;

      while (metadata && i < metadata.data.length) {
        if (i === nextIndex) {
          // Give visual feedback on first batch
          scrollAreaRef.current?.scrollIntoView({ behavior: "smooth" });
        }

        await doFetchIcons(i);

        // If the current in-flight request was aborted, stop the loop
        if (extrasAbortRef.current?.signal.aborted) break;

        // If we've reached or are about to exceed the end, stop
        if (!metadata || i + CHUNK_SIZE >= metadata.data.length) break;

        i += CHUNK_SIZE;
      }
    } finally {
      setLoadingAll(false);
    }
  }, [metadata, loadingExtras, loadingAll, nextIndex, doFetchIcons]);

  return {
    metadata,
    extras,
    hasMore,
    loadMore,
    loadAll,
    loadingMeta,
    loadingExtras,
    loadingAll,
    scrollAreaRef,
  };
};
