import { Dispatch, SetStateAction } from "react";

export default function HotelImages({
  images,
  setImages,
}: {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}) {
  const handleDelete = (removeId: number) => {
    setImages((prev) => prev.filter((_, id) => id !== removeId));
  };

  if (images.length === 0)
    return <div className="text-sm">Have to upload at least 1 image.</div>;

  return (
    <div className="flex gap-2 flex-wrap my-2">
      {images.map((image, id) => (
        <img
          key={id}
          src={URL.createObjectURL(image)}
          alt=""
          className="w-1/4 hover:cursor-pointer"
          title="delete"
          onClick={() => handleDelete(id)}
        />
      ))}
    </div>
  );
}
