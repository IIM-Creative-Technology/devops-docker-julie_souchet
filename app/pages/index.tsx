import type { NextPage } from 'next'
import { useState } from "react";

const Home: NextPage = () => {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count+1)}>Clicked {count} time{count > 1 ? "s" : ""}</button>
  )
}

export default Home
