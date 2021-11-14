import type { NextPage } from 'next'
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [counter, setCounter] = useState(0);

  const onClick = () => {
    fetch("/api/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ count: counter+1 })
    })
    setCounter(counter + 1);
  };

  // fetch counter from DB on mount
  useEffect(() => {
    fetch("/api/")
      .then(response => response.json())
      .then(({count}: {count:number}) => {
        setCounter(count);
      })
  }, [])

  return (
    <button onClick={onClick}>Clicked {counter} time{counter > 1 ? "s" : ""}</button>
  )
}

export default Home
