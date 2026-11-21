import { ImFacebook2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="flex flex-col items-center mt-20 mb-20">
      <p className="font-itim text-gray-600">
        © 2026 React App. All rights reserved.
      </p>

      <p className="font-itim text-gray-600">
        Created by 6952D10001 Kankangwal Dev Soft.
      </p>

      <div className="flex justify-center gap-5 mt-3">
        <ImFacebook2 />
        <FcGoogle />
        <FaXTwitter />

      </div>
    </div>
  )
}