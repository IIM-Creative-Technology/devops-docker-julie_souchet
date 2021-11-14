import type { NextPage } from 'next'
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [count, setCount] = useState(0);

  const onClick = () => setCount(count + 1);

  useEffect(() => {
    fetch("/api/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({count})
    })
  }, [count])

  return (
    <button onClick={onClick}>Clicked {count} time{count > 1 ? "s" : ""}</button>
  )
}

export default Home
