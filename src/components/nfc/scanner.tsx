'use client'

import {useNFC, type NFCData} from '@/hooks/use-nfc' // Adjust path as needed
import {Icon} from '@/lib/icons'
import React from 'react'

interface NFCScannerProps {
  onScan?: (data: NFCData) => void
  onError?: (error: string) => void
  maxHistorySize?: number
  autoStop?: boolean
}

const NFCScanner: React.FC<NFCScannerProps> = ({
  onScan,
  onError,
  maxHistorySize = 10,
  autoStop = true,
}) => {
  const {
    lastScan,
    isLoading,
    isScanning,
    isSupported,
    scanHistory,
    startScanning,
    stopScanning,
    clearHistory,
    formatRecordData,
  } = useNFC({
    onScan,
    onError,
    maxHistorySize,
    autoStop,
  })

  if (isLoading) {
    return (
      <div>
        <Icon
          name='spinners-ring'
          className='size-5 text-blue-700 dark:text-blue-400 animate-spin'
        />
      </div>
    )
  }

  if (!isLoading && !isSupported) {
    return (
      <div className='px-4 max-w-[40ch]'>
        <h3 className='dark:text-red-300 font-semibold text-lg md:font-bold tracking-tight inline-flex space-x-2 items-center'>
          <Icon
            name='alert-triangle'
            className='size-5 text-red-700 dark:text-red-400 '
          />
          <span>NFC Not Supported</span>
        </h3>
        <p className='text-red-500 dark:text-red-100'>
          Your browser or device doesn't support NFC Web API. Try using Chrome
          on Android with NFC enabled.
        </p>
      </div>
    )
  }

  return (
    <div className='p-2 bg-white rounded-lg h-84 w-full overflow-auto'>
      <div className='text-center'>
        {/*<h2 className='text-xl font-bold text-gray-800 mb-2'>NFC Scanner</h2>*/}
        {/*<p className='text-gray-600'>
          {isScanning
            ? 'Hold an NFC tag near your device'
            : 'Click start to begin scanning'}
        </p>*/}
      </div>

      <div className='flex justify-center mb-2'>
        {!isScanning ? (
          <button
            onClick={startScanning}
            className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold'>
            Start Scanning
          </button>
        ) : (
          <button
            onClick={stopScanning}
            className='px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold'>
            Stop Scanning
          </button>
        )}
      </div>

      {isScanning && (
        <div className='text-center mb-2'>
          <div className='inline-block animate-pulse'>
            <div className='w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2' />
            <p className='text-blue-600 font-medium'>Scanning...</p>
          </div>
        </div>
      )}

      {lastScan && (
        <div className='mb-2 p-4 bg-green-50 border border-green-200 rounded-lg'>
          <h3 className='font-semibold text-green-800 mb-2'>Last Scan</h3>
          <p className='text-sm text-gray-600 mb-1'>
            Serial: {lastScan.serialNumber}
          </p>
          <p className='text-sm text-gray-600 mb-2'>
            Time: {lastScan.timestamp.toLocaleString()}
          </p>
          <div className='space-y-1'>
            {lastScan.records.map((record, index) => (
              <div key={index} className='text-sm'>
                <span className='font-medium text-gray-700'>
                  {record.recordType}:
                </span>
                <span className='ml-2 text-gray-600'>
                  {formatRecordData(record)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {scanHistory.length > 0 && (
        <div>
          <h3 className='font-semibold text-gray-800 mb-3'>Scan History</h3>
          <div className='space-y-2 max-h-60 overflow-y-auto'>
            {scanHistory.map((scan, index) => (
              <div key={index} className='p-3 bg-gray-50 rounded border'>
                <div className='flex justify-between items-start mb-1'>
                  <span className='text-xs text-gray-500'></span>
                  <span className='text-xs text-gray-500 truncate ml-2'>
                    {scan.serialNumber}
                  </span>
                </div>
                <div className='text-sm'>
                  {scan.records.slice(0, 2).map((record, recordIndex) => (
                    <div key={recordIndex} className='truncate'>
                      {formatRecordData(record)}
                    </div>
                  ))}
                  {scan.records.length > 2 && (
                    <div className='text-xs text-gray-500'>
                      +{scan.records.length - 2} more records
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {scanHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className='mt-4 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors'>
              Clear History
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default NFCScanner
