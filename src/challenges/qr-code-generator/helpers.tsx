export function svgToPng(svgElement: Element): Promise<Blob | null> {
  return new Promise((resolve) => {
    if (!svgElement) return resolve(null)

    const svgData = new XMLSerializer().serializeToString(svgElement)
    const base64Encoded = btoa(svgData)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const svgSize = svgElement.getBoundingClientRect()
    canvas.width = svgSize.width
    canvas.height = svgSize.height

    const img = new Image()

    img.onload = () => {
      ctx?.drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/png')
    }
    img.src = `data:image/svg+xml;base64,${base64Encoded}`
  })
}
