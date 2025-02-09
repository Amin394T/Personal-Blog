import { useState } from "react";

function useSubmit(url) {
  const [status, setStatus] = useState("pending");
  let errorMessages;
  console.log("0: " + status);
  const data = async (body) => {
    console.log("4: " + status);
    try {
      setStatus("pending");
      console.log("5: " + status);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        errorMessages = await response.json();
        setStatus("error");
        console.log("6: " + status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setStatus("complete");
      console.log("7: " + status);
      return result;
    }
    catch (error) {
      console.log("8: " + status);
      console.error(error);
      return errorMessages;
    }
  };

  return { data, status };
}

export default useSubmit;
