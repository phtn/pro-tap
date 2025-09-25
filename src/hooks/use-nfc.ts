import { useState, useEffect, useCallback } from "react";

// NFC Web API TypeScript definitions
interface NDEFMessage {
  records: NDEFRecord[];
}

interface NDEFRecord {
  recordType: string;
  mediaType?: string;
  id?: string;
  data?: BufferSource;
  encoding?: string;
  lang?: string;
}

interface NDEFReader extends EventTarget {
  scan(options?: { signal?: AbortSignal }): Promise<void>;
  write(
    message: string | BufferSource | NDEFMessage,
    options?: { overwrite?: boolean; signal?: AbortSignal },
  ): Promise<void>;
  addEventListener(
    type: "reading",
    listener: (event: NDEFReadingEvent) => void,
  ): void;
  addEventListener(
    type: "readingerror",
    listener: (event: Event) => void,
  ): void;
  removeEventListener(
    type: "reading",
    listener: (event: NDEFReadingEvent) => void,
  ): void;
  removeEventListener(
    type: "readingerror",
    listener: (event: Event) => void,
  ): void;
}

interface NDEFReadingEvent extends Event {
  serialNumber: string;
  message: NDEFMessage;
}

// Extend the global Window interface to include NDEFReader
declare global {
  interface Window {
    NDEFReader: {
      new (): NDEFReader;
    };
  }
}

export interface NFCData {
  serialNumber: string;
  records: Array<{
    recordType: string;
    data: string;
    mediaType?: string;
    id?: string;
  }>;
  timestamp: Date;
}

export interface UseNFCOptions {
  onScan?: (data: NFCData) => void;
  onError?: (error: string) => void;
  maxHistorySize?: number;
}

export interface UseNFCReturn {
  isScanning: boolean;
  isSupported: boolean;
  lastScan: NFCData | null;
  scanHistory: NFCData[];
  startScanning: () => Promise<void>;
  stopScanning: () => void;
  clearHistory: () => void;
  formatRecordData: (record: NFCData["records"][0]) => string;
}

export const useNFC = (options: UseNFCOptions = {}): UseNFCReturn => {
  const { onScan, onError, maxHistorySize = 10 } = options;

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [lastScan, setLastScan] = useState<NFCData | null>(null);
  const [scanHistory, setScanHistory] = useState<NFCData[]>([]);
  const [nfcReader, setNfcReader] = useState<NDEFReader | null>(null);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  // Check NFC support on mount
  useEffect(() => {
    const checkNFCSupport = (): boolean => {
      return typeof window !== "undefined" && "NDEFReader" in window;
    };

    setIsSupported(checkNFCSupport());
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [abortController]);

  const handleNFCReading = useCallback(
    (event: NDEFReadingEvent): void => {
      const { serialNumber, message } = event;

      const records = message.records.map((record): NFCData["records"][0] => {
        let data = "";

        if (record.data) {
          const decoder = new TextDecoder(record.encoding || "utf-8");
          data = decoder.decode(record.data);
        }

        return {
          recordType: record.recordType,
          data,
          mediaType: record.mediaType,
          id: record.id,
        };
      });

      const nfcData: NFCData = {
        serialNumber,
        records,
        timestamp: new Date(),
      };

      setLastScan(nfcData);
      setScanHistory((prev) => [nfcData, ...prev.slice(0, maxHistorySize - 1)]);

      if (onScan) {
        onScan(nfcData);
      }
    },
    [onScan, maxHistorySize],
  );

  const handleNFCError = useCallback(
    (event: Event): void => {
      const errorMessage = `NFC reading error: ${event.type}`;
      console.error(errorMessage, event);

      if (onError) {
        onError(errorMessage);
      }
    },
    [onError],
  );

  const startScanning = useCallback(async (): Promise<void> => {
    if (!isSupported) {
      const errorMsg = "NFC is not supported on this device/browser";
      if (onError) {
        onError(errorMsg);
      }
      return;
    }

    try {
      const reader = new window.NDEFReader();
      const controller = new AbortController();

      setNfcReader(reader);
      setAbortController(controller);
      setIsScanning(true);

      reader.addEventListener("reading", handleNFCReading);
      reader.addEventListener("readingerror", handleNFCError);

      await reader.scan({ signal: controller.signal });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? `Failed to start NFC scanning: ${error.message}`
          : "Failed to start NFC scanning: Unknown error";

      console.error(errorMessage, error);
      setIsScanning(false);

      if (onError) {
        onError(errorMessage);
      }
    }
  }, [isSupported, onError, handleNFCReading, handleNFCError]);

  const stopScanning = useCallback((): void => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }

    if (nfcReader) {
      nfcReader.removeEventListener("reading", handleNFCReading);
      nfcReader.removeEventListener("readingerror", handleNFCError);
      setNfcReader(null);
    }

    setIsScanning(false);
  }, [abortController, nfcReader, handleNFCReading, handleNFCError]);

  const clearHistory = useCallback((): void => {
    setScanHistory([]);
    setLastScan(null);
  }, []);

  const formatRecordData = useCallback(
    (record: NFCData["records"][0]): string => {
      if (record.recordType === "text") {
        return record.data;
      } else if (record.recordType === "url") {
        return record.data;
      } else {
        return `${record.recordType}: ${record.data.slice(0, 50)}${record.data.length > 50 ? "..." : ""}`;
      }
    },
    [],
  );

  return {
    isScanning,
    isSupported,
    lastScan,
    scanHistory,
    startScanning,
    stopScanning,
    clearHistory,
    formatRecordData,
  };
};
