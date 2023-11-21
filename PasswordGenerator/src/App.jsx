import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [number, setNumber] = useState(false)
  const [symbol, setSymbol] = useState(false)
  const [passwordLength, setPasswordLength] = useState(8)
  const [password, setPassword] = useState('')

  // use ref can remember ref of an element
  const passwordInput = useRef(null)

  const generatePassword = useCallback(() => {
    const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz'
    const uppercaseCharacters = lowercaseCharacters.toUpperCase()
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()-_+={}[]|:;,.<>/?'

    const allCharacters =
      lowercaseCharacters +
      uppercaseCharacters +
      (number === true ? numbers : '') +
      (symbol === true ? symbols : '')

    let pass = ''

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * allCharacters.length)
      pass += allCharacters[randomIndex]
    }

    // setting password
    setPassword(pass)
  }, [number, symbol, passwordLength, setPassword])

  const copyPasswordHandler = useCallback(() => {
    passwordInput.current?.select()
    passwordInput.current?.setSelectionRange(0, 51)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [number, symbol, passwordLength, generatePassword])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordInput}
          />
          <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyPasswordHandler}
          >
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              id='password-length'
              type='range'
              className='cursor-pointer'
              min={8}
              max={50}
              value={passwordLength}
              onChange={(e) => {
                setPasswordLength(e.target.value)
              }}
            />
            <label htmlFor='password-length'> Length: {passwordLength}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={number}
              id='numberInput'
              onChange={() => {
                setNumber((prev) => !prev)
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={symbol}
              id='symbol-input'
              onChange={() => {
                setSymbol((prev) => !prev)
              }}
            />
            <label htmlFor='symbol-input'>Symbols</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
