// toastUtils.js
import { toast, Bounce } from "react-toastify";

export const showToast = (message, type="error", duration = 3000) => {
  const options = {
    position: "top-right",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warn":
    case "warning":
      toast.warn(message, options);
      break;
    default:
      toast(message, options);
  }
};
