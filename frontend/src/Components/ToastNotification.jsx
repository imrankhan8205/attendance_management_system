import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifySuccess = (msg) => toast.success(msg);
export const notifyError = (msg) => toast.error(msg);

const ToastNotification = () => <ToastContainer position="top-right" autoClose={3000} />;

export default ToastNotification;
