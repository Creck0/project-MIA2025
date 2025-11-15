const API_BASE_URL = "/api";

export const fetchUMKMs = async () => {
  const res = await fetch(`${API_BASE_URL}/umkms/`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch UMKMs");
  return res.json();
};

export const fetchUMKM = async (id) => {
  const res = await fetch(`${API_BASE_URL}/umkms/${id}/`, { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to fetch UMKM ${id}`);
  return res.json();
};

export const createUMKM = async (data) => {
  const res = await fetch(`${API_BASE_URL}/umkms/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create UMKM");
  return res.json();
};

export const updateUMKM = async (id, data) => {
  const res = await fetch(`${API_BASE_URL}/umkms/${id}/`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update UMKM");
  return res.json();
};

export const deleteUMKM = async (id) => {
  const res = await fetch(`${API_BASE_URL}/umkms/${id}/`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete UMKM");
  return true;
};
