import { useState, useEffect } from "react";

const cache = {};

function useFetch(url) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (cache[url]) {
      setData(cache[url]);
      setStatus("complete");
    }
    else {
      let fetchData = async () => {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          if (response.headers.get("content-type") == "text/html") throw new Error("File Not Found!");

          const data = await response.text();
          cache[url] = data;
          setData(data);
          setStatus("complete");
        }
        catch (error) {
          console.error(error);
          setStatus("error");
        }
      };
      fetchData();
    }
  }, [url]);

  return { data, status };
}

export default useFetch;
