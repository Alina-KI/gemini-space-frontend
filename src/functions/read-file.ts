export const readFile = (file: File | undefined | null) => {
  return new Promise<string>((resolve => {
    if (!file) {
      resolve('')
    }
    const reader = new FileReader()

    reader.onloadend = function() {
      resolve(reader.result as string)
    }

    if (file) {
      reader.readAsDataURL(file)
    } else {
      resolve('')
    }
  }))
}