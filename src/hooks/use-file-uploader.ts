import {useMutation} from 'convex/react'
import {useState} from 'react'
import {api} from '../../convex/_generated/api'

export const useFileUploader = (author: string | undefined) => {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Use the HTTP action to get an upload URL
  const getUploadUrl = useMutation(api.files.upload.url)

  // Use the mutation to store the image ID after upload
  const sendFile = useMutation(api.files.upload.file)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    } else {
      setFile(null)
    }
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    setUploading(true)
    setError(null)

    try {
      // 1. Get an upload URL from Convex
      const url = await getUploadUrl()

      // 2. Upload the file directly to the provided URL
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': file.type},
        body: file,
      })

      if (!response.ok) {
        throw new Error('Failed to upload file to storage.')
      }

      // 3. Get the storage ID from the response (Convex returns it as JSON)
      const {storageId} = await response.json()

      if (!storageId) {
        throw new Error('Storage ID not received after upload.')
      }

      // 4. Call a Convex mutation to associate the storage ID with your data
      if (!author) {
        throw new Error('User ID not available.')
      }
      await sendFile({author, storageId})

      setFile(null)
      setMessage('')
      alert('Image uploaded')
    } catch (err) {
      console.error('Upload error:', err)
      setError(
        (err as Error).message || 'An unknown error occurred during upload.',
      )
    } finally {
      setUploading(false)
    }
  }

  return {
    file,
    message,
    uploading,
    error,
    handleFileChange,
    handleMessageChange,
    handleSubmit,
  }
}
