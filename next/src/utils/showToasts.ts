// import { toast } from "react-toastify";

// type PromiseStateTexts = {
//   pending: string;
//   success: string;
//   error: string;
// };

// const showToast = (promise: Promise<any>, stateTexts: PromiseStateTexts) => {
//   const pendingToastId = toast.info(stateTexts.pending, {
//     position: "top-right",
//     autoClose: false,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//   });

//   promise
//     .then(() => {
//       toast.update(pendingToastId, {
//         render: stateTexts.success,
//         type: toast.TYPE.SUCCESS,
//         autoClose: 5000,
//       });
//     })
//     .catch((error) => {
//       toast.update(pendingToastId, {
//         render: stateTexts.error,
//         type: toast.TYPE.ERROR,
//         autoClose: 5000,
//       });

//       console.error("Error:", error);
//     });
// };

// export default showToast;

import { ToastOptions, UpdateOptions } from "react-toastify";

export const loadingConfig = (): ToastOptions<{}> => ({
  position: "bottom-left",
});

const commonConfigs: UpdateOptions<unknown> = {
  isLoading: false,
  position: "bottom-left",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
};

export const successConfig = (text: string): UpdateOptions<unknown> => ({
  ...commonConfigs,
  render: text,
  type: "success",
});

export const errorConfig = (text: string): UpdateOptions<unknown> => ({
  ...commonConfigs,
  render: text,
  type: "error",
});
