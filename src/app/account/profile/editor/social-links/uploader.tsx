import {SexyButton} from '@/components/experimental/sexy-button-variants'
import {useAuthCtx} from '@/ctx/auth'
import {useFileUploader} from '@/hooks/use-file-uploader'

export function ImageUploader() {
  const {user} = useAuthCtx()
  const {
    handleFileChange,
    handleSubmit,
    message,
    handleMessageChange,
    uploading,
    error,
    file,
  } = useFileUploader(user?.uid)

  return (
    <div>
      <h1>Upload Image to Convex</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='file-input'>Choose Image:</label>
          <input
            id='file-input'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
        <div>
          <label htmlFor='message-input'>Message:</label>
          <input
            id='message-input'
            type='text'
            value={message}
            onChange={handleMessageChange}
            disabled={uploading}
          />
        </div>
        <SexyButton
          type='submit'
          disabled={uploading || !file}
          rightIcon={uploading ? 'spinners-ring' : 'upload'}>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </SexyButton>
        {error && <p style={{color: 'red'}}>Error: {error}</p>}
      </form>
    </div>
  )
}
