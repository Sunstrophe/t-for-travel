import React, {useState} from "react"
{/* import LoginFunction from "./LoginFunction";, modify code to expand the divs downwards only*/}

const LoginMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="py-2">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex justify-between w-full"
        >
        <span>Login</span>
        <svg
          className="fill-ger-400 shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              menuOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              menuOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
        menuOpen 
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
      }`}>
        <div className="overflow-hidden">Enter your credentials{/* {<LoginFunction> here, modify code to expand downwards only*/}</div>
      </div>
    </div>
  )
}

export default LoginMenu