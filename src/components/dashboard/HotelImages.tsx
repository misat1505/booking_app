import { useNewHotelFormContext } from "@/app/contexts/dashboard/newHotelFormContext";

export default function HotelImages() {
  const { deleteImage, form } = useNewHotelFormContext();

  if (form.images.length === 0)
    return <div className="text-sm">Have to upload at least 1 image.</div>;

  return (
    <div className="flex gap-2 flex-wrap my-2">
      <p className="text-red-500 text-sm w-full">
        Click on any image to delete it.
      </p>
      {form.images.map((image, id) => (
        <img
          key={id}
          src={URL.createObjectURL(image)}
          alt=""
          className="w-1/4 hover:cursor-pointer"
          title="delete"
          onClick={() => deleteImage(id)}
        />
      ))}
    </div>
  );
}
