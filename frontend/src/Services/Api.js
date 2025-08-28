const API_URL = import.meta.env.VITE_API_URL;
import "./styles/tailwind.css";


export const fetchAttendance = async () => {
  const res = await fetch(`${API_URL}/attendance`);
  return await res.json();
};

export const updateAttendance = async (recordId, status) => {
  const res = await fetch(`${API_URL}/attendance/${recordId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return await res.json();
};
