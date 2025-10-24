// Extend the global Window interface to include NDEFReader

import {NDEFRecordInit} from '@/hooks/use-nfc-reader'

export interface ParsedRecord {
  recordType: string
  mediaType: string | null
  id: string | null
  text: string | null
  url: string | null
  payloadHex: string | null
  rawBytesLength: number
}

export interface NDEFReadingData {
  timestamp: string
  serialNumber: string | null
  records: ParsedRecord[]
}

// ------------------------------
// Utility functions
// ------------------------------

export function hexDump(buffer: ArrayBuffer, bytesPerLine = 16): string {
  const view = new Uint8Array(buffer)
  const lines: string[] = []

  for (let i = 0; i < view.length; i += bytesPerLine) {
    const slice = view.slice(i, i + bytesPerLine)
    const hex = Array.from(slice)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(' ')
    const ascii = Array.from(slice)
      .map((b) => (b >= 32 && b < 127 ? String.fromCharCode(b) : '.'))
      .join('')
    lines.push(
      i.toString(16).padStart(6, '0') +
        '  ' +
        hex.padEnd(bytesPerLine * 3 - 1, ' ') +
        '  ' +
        ascii,
    )
  }

  return lines.join('\n')
}

export function decodeTextRecord(record: NDEFRecordInit): string | null {
  try {
    if (record.recordType !== 'text' || !(record.data instanceof ArrayBuffer)) {
      return null
    }

    const view = new DataView(record.data)
    const statusByte = view.getUint8(0)
    const encoding = statusByte & 0x80 ? 'utf-16' : 'utf-8'
    const langLength = statusByte & 0x3f
    const textBytes = new Uint8Array(record.data, 1 + langLength)
    return new TextDecoder(encoding).decode(textBytes)
  } catch {
    return null
  }
}

export function parseRecord(record: NDEFRecordInit): ParsedRecord {
  const payload =
    record.data instanceof ArrayBuffer
      ? record.data
      : ((record.data as any)?.buffer ?? null)

  const parsed: ParsedRecord = {
    recordType: record.recordType,
    mediaType: record.mediaType ?? null,
    id: record.id ?? null,
    payloadHex: payload ? hexDump(payload) : null,
    rawBytesLength: payload ? payload.byteLength : 0,
    text: null,
    url: null,
  }

  try {
    if (record.recordType === 'text') {
      parsed.text = decodeTextRecord(record)
    } else if (record.recordType === 'url') {
      if (payload) parsed.url = new TextDecoder().decode(payload)
    } else if (record.mediaType?.startsWith('text/') && payload) {
      parsed.text = new TextDecoder().decode(payload)
    }
  } catch {
    // ignore decoding errors
  }

  return parsed
}

// ------------------------------
// React Component
// ------------------------------
