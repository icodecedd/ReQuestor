// src/hooks/useStats.js
import { useEffect, useState } from "react";
import axios from "axios";

const initialStats = {
  totalRequests: 0,
  availableEquipment: 0,
  approvedRequests: 0,
  pendingApprovals: 0,
  barGraph: [],
  pieGraph: [],
};

export function useStats() {
  const [data, setData] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/stats")
      .then((res) => {
        if (res.data?.success) {
          setData({ ...initialStats, ...res.data });
          console.log({ ...initialStats, ...res.data })
        } else {
          setError("Invalid response");
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
