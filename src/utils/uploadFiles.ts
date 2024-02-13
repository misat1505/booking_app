import { uploadFile } from "@/actions/uploadFile";

export const uploadMultipleFiles = async (files: File[]): Promise<string[]> => {
  const urls: string[] = [];

  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const url = await uploadFile(formData);
      urls.push(url);
    } catch (error) {
      console.error(`Error during file upload for ${file.name}:`, error);
    }
  });

  await Promise.all(uploadPromises);

  return urls;
};
