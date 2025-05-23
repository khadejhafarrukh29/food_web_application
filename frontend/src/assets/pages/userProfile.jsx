import { useEffect, useState } from "react";
import cameraIcon from "/public/images/camera.jpg";
import { LogOut } from "../components/Logout";

function UserProfile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Phone_Number: "",
    Address: "",
    IMG_URL: null,
  });
  const [message, setMessage] = useState("");

  // ✅ Fetch User Data + Image
  useEffect(() => {
    fetch("http://localhost:3000/api/Profile", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setFormData({
            Customer_ID: data.Customer_ID || "",
            Name: data.Name || "",
            Email: data.Email || "",
            Password: data.Password || "",
            Address: data.Address || "",
            Phone_Number: data.Phone_Number || "",
            IMG_URL: data.IMG_URL
              ? `http://localhost:3000${data.IMG_URL}`
              : null,
          });
          console.log(data.IMG_URL);
          setSelectedImage(
            data.IMG_URL ? `http://localhost:3000${data.IMG_URL}` : null
          );
        }
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("📸 Selected File:", file);
      setSelectedImage(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        IMG_URL: file, // ✅ Ensure File Object is Stored
      }));
    }
  };

  const handleState = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("Name", formData.Name);
    formDataToSend.append("Email", formData.Email);
    formDataToSend.append("Password", formData.Password);
    formDataToSend.append("Address", formData.Address);
    formDataToSend.append("Phone_Number", formData.Phone_Number);

    if (formData.IMG_URL instanceof File) {
      console.log("📸 Uploading Image:", formData.IMG_URL.name);
      formDataToSend.append("IMG_URL", formData.IMG_URL);
    } else {
      console.warn("No new image selected!");
    }

    try {
      const response = await fetch("http://localhost:3000/api/Update", {
        method: "PATCH",
        credentials: "include",
        body: formDataToSend,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // ✅ Update image on frontend too
      if (data.IMG_URL) {
        setSelectedImage(`http://localhost:3000${data.IMG_URL}`);
        setFormData((prev) => ({
          ...prev,
          IMG_URL: `http://localhost:3000${data.IMG_URL}`,
        }));
        setMessage("Profile Updated Successfully!");
      }
    } catch (error) {
      console.error("❌ Update Failed:", error);
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <>
      <div className=" w-[100%] ">
        <div className="  w-[100%] ">
          <div className="border-2 border-amber-500 text-center font-semibold text-[30px] sm:text-[30px] md:text-[40px] lg:text-[40px] pt-[12px] pb-[12px] bg-amber-500 text-white">
            User Profile
          </div>
          <div className="h-[130vh]   flex flex-col justify-center  lg:w-[50%]  md:w-[50%] sm:w-[60%]  w-[90%] mx-auto gap-[20px]">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="w-[100%] flex justify-center">
                <div className="h-[150px] w-[180px] ">
                  {/* ✅ Image Display Logic */}
                  <img
                    src={
                      selectedImage
                        ? selectedImage
                        : formData.IMG_URL
                        ? formData.IMG_URL
                        : cameraIcon
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = cameraIcon;
                    }}
                    className="size-full rounded-[30px] object-cover"
                    alt="User Profile"
                  />
                </div>
              </div>
              <div className="gap-[10px] w-[100%]  flex flex-col items-center mt-[20px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-gray-500 outline-none rounded-[30px] bg-[#ECECEC] text-[16px] w-[300px] pt-[15px] pb-[15px] pr-[20px] pl-[20px]"
                  placeholder="Upload Img"
                />
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  className="text-gray-500 outline-none rounded-[30px] bg-[#ECECEC] text-[16px] w-[300px] pt-[15px] pb-[15px] pr-[20px] pl-[20px]"
                  placeholder="Name"
                  onChange={handleState}
                  required
                />
                <input
                  type="text"
                  name="Email"
                  value={formData.Email}
                  className="text-gray-500 outline-none rounded-[30px] bg-[#ECECEC] text-[16px] w-[300px] pt-[15px] pb-[15px] pr-[20px] pl-[20px]"
                  placeholder="Email"
                  onChange={handleState}
                  required
                />
                <input
                  type="password"
                  name="Password"
                  value={formData.Password}
                  className="text-gray-500 outline-none rounded-[30px] bg-[#ECECEC] text-[16px] w-[300px] pt-[15px] pb-[15px] pr-[20px] pl-[20px]"
                  placeholder="Password"
                  onChange={handleState}
                  autoComplete="off"
                  required
                />
                <input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  className="text-gray-500 outline-none rounded-[30px] bg-[#ECECEC] text-[16px] w-[300px] pt-[15px] pb-[15px] pr-[20px] pl-[20px]"
                  placeholder="Address"
                  onChange={handleState}
                  required
                />
                <input
                  type="text"
                  name="Phone_Number"
                  value={formData.Phone_Number}
                  className="text-gray-500 outline-none rounded-[30px] bg-[#ECECEC] text-[16px] w-[300px] pt-[15px] pb-[15px] pr-[20px] pl-[20px]"
                  placeholder="Phone Number"
                  onChange={handleState}
                  required
                />
              </div>

              {message ? <p>{message}</p> : null}
              <div className="w-[100%] top-[20px] flex flex-col items-center relative">
                <input
                  type="submit"
                  value="Update"
                  className="bg-amber-500 outline-none text-white font-semibold rounded-[30px] bg-[#ECECEC] text-[20px] w-[300px] pt-[15px] pb-[15px] pr-[20px] pl-[20px]  cursor-pointer"
                />
              </div>
            </form>
            <LogOut />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
