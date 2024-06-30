import { cloudinary } from "../config/cloudinary";

export const getDownloadAttachment = (id:string, type:string) => {
  console.log(type)
  let url = "";

  if (type.split("/").includes("image")) {
    url = cloudinary.url(id, {
      flags: 'attachment:imgname'
    });
  }else {
    url = cloudinary.url(id, {
      resource_type: "video", // Specify the resource type
      flags: 'attachment:videoname'
    });
  }

  return url;
};
