import { useState, useEffect } from 'preact/hooks'
import './app.css'
import Confetti from "react-confetti";




export function App() {
  // list of challenges with expected passcodes
  const challenges = [
    { id: 1, passcode: "BEARCATS", hint: "Onto debugging program 2...",
      prompt: "Solved the first one did ya? Don't get too confident yet... enter the passcode below!"
     },
    { id: 2, passcode: "NWMSU", hint: "3's the charm",
      prompt: "Maybe you're a bit better at debugging than I thought... enter the next passcode below!"
     },
    { id: 3, passcode: "NOWAYPASSCODEISTHEPASSCODE", hint: "four for four is the best wendys item",
      prompt: "You're on a roll... keep it going! Enter the next passcode below!"
     },
     { id: 4, passcode: "GNX", hint: "you are onto something...",
      prompt: "You're almost to the end... keep debugging... you know the drill by now..."
     },
     { id: 5, passcode: "CHROMAKOPIA", hint: "last one?? SIKE",
      prompt: "As they say, I've saved the best one for last... enter the final passcode below..."
     },
     { id: 6, passcode: "SIXSEVEN", hint: "im so sorry",
      prompt: "HAHAHA, you thought that was the last one? Don't be tricked so easily..."
     },
     { id: 7, passcode: "BIGBACK", hint: "Congrats! You have completed ACM Bug Hunt!",
      prompt: "Double fake out?? okay this is the last one I promise to you"
     }
  ]

  const [current, setCurrent] = useState(0)   // which challenge we’re on
  const [input, setInput] = useState("")      // what student types
  const [feedback, setFeedback] = useState("") // message to show

  const finished = current >= challenges.length

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

useEffect(() => {
  setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  window.addEventListener("resize", handleResize)
  return () => window.removeEventListener("resize", handleResize)
}, [])


  function checkPasscode() {
    if (input.trim().toUpperCase() === challenges[current].passcode) {
      setFeedback("YOU GOT IT!!! BRING THE BOOM!!!")
      setTimeout(() => {
        setCurrent(current + 1)
        setInput("")
        setFeedback("")
      }, 1000)
    } else {
      setFeedback("Wrong passcode, go back to your code and try again! Keep debugging away!")
    }
  }

  if (finished) {
    return (
      <>
        <h1>Congratulations! YOU are the ultimate debugger!!</h1>
        <Confetti width={windowSize.width} height={windowSize.height} />
      </>
    )
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>NWMSU ACM Bug Hunt</h1>
      <h2>BUG {challenges[current].id}</h2>
      <p>{challenges[current].prompt}</p>
      <input
        type="text"
        value={input}
        onInput={(e) => setInput(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", fontFamily: "" }}
      />
      <button onClick={checkPasscode}>Submit</button>
      <p>{feedback}</p>
      {feedback === "YOU GOT IT!!" && <p>{challenges[current].hint}</p>}
    </div>
  )
}
