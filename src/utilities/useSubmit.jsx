import { useState } from "react";

function useSubmit(url) {
  const [status, setStatus] = useState("pending");

  let submitData = async (body) => {
    try {
        const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setStatus("complete");
      return data;
    }
    catch (error) {
      console.error(error);
      setStatus("error");
      return error;
    }
  };

  return { submitData, status };
}

export default useSubmit;
