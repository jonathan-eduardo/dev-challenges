import Background from '../../components/background'
import styles from './qr-code-generator.module.css'
import QrCodeLogoIcon from '../images/logo-qr-generator.svg'
import QrCodeShareIcon from '../images/share-qr-icon.svg'
import QrCodeDownloadIcon from '../images/download-qr-icon.svg'
import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { svgToPng } from './helpers.tsx'

export default function QrCodeGenerator() {
  const [qrCode, setQrCode] = useState(false)
  const [urlValue, setUrlValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const QRCodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!qrCode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [qrCode])

  function resetQrCode() {
    setQrCode(false)
    setUrlValue('')
  }

  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault()
    setQrCode(true)
  }

  async function downloadQrCode() {
    if (QRCodeRef.current) {
      const svgElement = QRCodeRef.current.children[0]
      const imageBlob = await svgToPng(svgElement)

      if (imageBlob && window.URL) {
        const imageUrl = URL.createObjectURL(imageBlob)
        const qrCodeLink = document.createElement('a')

        qrCodeLink.href = imageUrl
        qrCodeLink.download = 'qrcode_image.png'
        qrCodeLink.click()
        URL.revokeObjectURL(imageUrl)
      } else {
        alert("This device doesn't support this feature")
      }
    }
  }

  async function shareQrCode() {
    if (QRCodeRef.current) {
      const svgElement = QRCodeRef.current.children[0]
      const imageBlob = await svgToPng(svgElement)

      if (imageBlob) {
        const file = new File([imageBlob], 'qrcode_image.png', {
          type: 'image/png',
        })

        try {
          await navigator.share({
            title: 'QR Code',
            files: [file],
          })
        } catch (error) {
          throw new Error("File can't be shared")
        }
      } else {
        alert('Feature not supported')
      }
    }
  }

  return (
    <Background customClass={styles.qrCodeBackground}>
      <div className={styles.wrapper}>
        {qrCode && (
          <span className={styles.fixedLogo} onClick={resetQrCode}>
            <QrCodeLogoIcon />
          </span>
        )}
        <main className={styles.content}>
          {!qrCode && (
            <div className={styles.search}>
              <QrCodeLogoIcon />
              <form className={styles.searchForm} onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  required
                  placeholder="Enter an url "
                  type="text"
                  className={styles.input}
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                />
                <button className={styles.qrCodeBtn}>QR code</button>
              </form>
            </div>
          )}
          {qrCode && (
            <div className={styles.qrCode}>
              <div className={styles.qrCodeContainer} ref={QRCodeRef}>
                <QRCodeSVG
                  value={urlValue}
                  size={250}
                  includeMargin={true}
                  className={styles.qrCodeImage}
                />
              </div>
              <div className={styles.buttons}>
                <button
                  onClick={downloadQrCode}
                  className={`${styles.btn} ${styles.download}`}
                >
                  Download
                  <QrCodeDownloadIcon />
                </button>
                <button
                  onClick={shareQrCode}
                  className={`${styles.btn} ${styles.share}`}
                >
                  Share
                  <QrCodeShareIcon />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </Background>
  )
}
