import axios from "axios";

export const uploadMultipleFiles = async (files: File[]): Promise<string[]> => {
  const urls: string[] = [];

  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        urls.push(data.path);
      } else {
        console.error(
          `Failed to upload file ${file.name}: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(`Error during file upload for ${file.name}:`, error);
    }
  });

  await Promise.all(uploadPromises);

  return urls;
};
