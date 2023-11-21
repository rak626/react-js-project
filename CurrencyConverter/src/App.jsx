import { useEffect, useState } from 'react'
import { InputBox } from './components'
import { useCurrencyInfo } from './hooks'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)

  // use hook
  const currencyInfo = useCurrencyInfo(from)

  const currencyOptions = Object.keys(currencyInfo)

  const swapCurrecy = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  // useEffect(() => {
  //   currencyConvertHandler()
  // }, [setFrom, setTo, to, from])

  const currencyConvertHandler = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  const BackgroundImage =
    'https://images.pexels.com/photos/18097907/pexels-photo-18097907/free-photo-of-herd-of-horses-during-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  return (
    <div
      className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url('${BackgroundImage}')`,
      }}
    >
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              currencyConvertHandler()
            }}
          >
            <div className='w-full mb-1'>
              <InputBox
                label='From'
                amount={amount}
                onAmountChange={(amount) => setAmount(amount)}
                onCurrencyChange={(currency) => setFrom(currency)}
                currencyOptions={currencyOptions}
                selectCurrency={from}
              />
            </div>
            <div className='relative w-full h-0.5'>
              <button
                type='button'
                className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                onClick={swapCurrecy}
              >
                swap
              </button>
            </div>
            <div className='w-full mt-1 mb-4'>
              <InputBox
                label='To'
                amount={convertedAmount || 0}
                onCurrencyChange={(currency) => setTo(currency)}
                currencyOptions={currencyOptions}
                selectCurrency={to}
                amountDisabled
              />
            </div>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
