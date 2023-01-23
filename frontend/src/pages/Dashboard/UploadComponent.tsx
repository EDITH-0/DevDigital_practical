import { useState } from 'react'
import './styles.css'
// import FileInput from "~assets/images/file_input_icon.png";

interface UploadComponentProps {
  label: string
  acceptableTitle: string
  error?: string
  onChange: (value?: any) => void
  regex: RegExp
  value?: any
}

export default function UploadComponent({
  label,
  acceptableTitle,
  error,
  onChange,
  regex,
  value,
}: UploadComponentProps) {
  console.log('🚀 => value', value)
  const [localError, setLocalError] = useState('')
  const [selectedDoc, setSelectedDoc] = useState<any>(null)
  return (
    <>
      <div
        className={`afi-input-file-container ${
          localError || error ? 'afi-file-error' : ''
        }`}
      >
        <input
          type={'file'}
          className="afi-file-input"
          onChange={(e: any) => {
            // /\.(jpg|jpeg|png|svg|webp)$/
            if (e.target.files[0].name.match(regex)) {
              if (
                parseFloat((e.target.files[0].size / 1000000).toFixed(2)) <= 5
              ) {
                setLocalError('')
                setSelectedDoc(URL.createObjectURL(e.target.files[0]))
                onChange(e.target.files[0])
              } else {
                setLocalError(
                  `${
                    acceptableTitle === 'PDF' ? 'Document' : 'Image'
                  } should be less than 5 MB.`,
                )
              }
              console.log('🚀 => e.target.files[0]', e.target.files)
            } else {
              setLocalError(
                acceptableTitle === 'PDF'
                  ? 'Only PDF files are supported'
                  : 'Only jpg, jpeg, png, svg and webp files are supported.',
              )
              onChange('')
            }
          }}
        />
        <img src={selectedDoc ? selectedDoc : value} className={'showImage'} />
      </div>
      <div className="afi-vldtnmsg-container mt-2">
        {localError ? <span>{localError}</span> : null}
        {error ? <span>{error}</span> : null}
      </div>
    </>
  )
}
