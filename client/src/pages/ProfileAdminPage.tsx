import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import AdminProfile from "../components/admin/adminProfile";

export default function AdminPage() {
  const data = useLoaderData() as AdminType;
  const navigate = useNavigate();

  useEffect(() => {
    if (!data.isAdmin) {
      navigate("/");
    }
  }, [data, navigate]);
  return (
    <>
      <AdminProfile id={String(data.id)} />
    </>
  );
}
