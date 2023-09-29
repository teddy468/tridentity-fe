export const isFileSizeValid = (fileSize: number) => {
  const sizeMB = fileSize / (1024 * 1024);
  return sizeMB > 2 ? false : true;
};

export const getFileExtension = (fileName: string) => {
  let parts = fileName.split(".");
  return parts[parts.length - 1];
};

export const isFileTypeValid = (filename: string) => {
  const ext = getFileExtension(filename);
  switch (ext.toLowerCase()) {
    case "jpg":
    case "gif":
    case "jpeg":
    case "png":
    case "bmp":
    case "webp":
      return true;
    default:
      return false;
  }
};
