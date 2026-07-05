import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "./components/ui/field"
import { Input } from "./components/ui/input"
import { Calculator } from "lucide-react";


function App() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [time, setTime] = useState("")
  const [interest, setInterest] = useState(null)


  const calculateInterest = () => {
    const p = Number(principal);
    const r = Number(rate);
    const t = Number(time);
    const si = (p * r * t) / 100;
    setInterest(si.toFixed(2));
  }

  const clearAll = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setInterest(null);
  }

  const totalAmount =
    interest !== null ? Number(principal) + Number(interest) : 0;


  const handleSubmit = (e) => {
    e.preventDefault();
    calculateInterest();
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-slate-800 to-gray-700 p-4'>
      <div className=' bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2'>
          <Calculator className="h-8 w-8 text-cyan-600" />
          Simple Interest Calculator
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Calculate simple interest in seconds
        </p>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="principal">Principal Amount:</FieldLabel>
              <Input id="principal" min="0" placeholder="Enter principal" type="number" value={principal}
                onChange={(e) => {
                  if (Number(e.target.value) >= 0) {
                    setPrincipal(e.target.value)
                    setInterest(null);
                  }
                }}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="rate">Rate of Interest (%):</FieldLabel>
              <Input id="rate" min="0" placeholder="Enter rate" type="number" value={rate}
                onChange={(e) => {
                  if (Number(e.target.value) >= 0) {
                    setRate(e.target.value)
                    setInterest(null);
                  }
                }}
              />
              <FieldDescription>
                Enter the annual interest rate in %
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="time">Time (in years):</FieldLabel>
              <Input id="time" min="0" placeholder="Enter time" type="number" value={time}
                onChange={(e) => {
                  if (Number(e.target.value) >= 0) {
                    setTime(e.target.value)
                    setInterest(null);
                  }
                }}
              />
            </Field>

            <div className="mt-4 rounded-lg bg-slate-100 p-3 text-center text-sm text-slate-600">
              Formula: SI = (Principal × Rate × Time) / 100
            </div>

            <Field orientation="horizontal" className="flex gap-4">
              <Button
                type='submit'
                className="w-1/2 py-5 rounded-xl bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02]"
                disabled={!principal || !rate || !time}>
                Calculate
              </Button>

              <Button className='w-1/2 py-5 rounded-xl bg-slate-500 hover:bg-slate-600 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]'
                onClick={clearAll}
                type="button"
                disabled={!principal && !rate && !time}>
                Clear
              </Button>
            </Field>
          </FieldGroup>
        </form>




        {interest !== null && (
          <div className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-center transition-all animate-in fade-in zoom-in duration-500">
            <p className="text-sm uppercase tracking-wider text-cyan-600 font-semibold"> Calculation Result:</p>
            <h2 className="text-3xl font-extrabold text-cyan-700">Rs. {Number(interest).toLocaleString()}</h2>

            <hr className="my-3" />

            <div className="flex justify-between text-gray-700">
              <span>Principal</span>
              <span>Rs. {Number(principal).toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>Rate</span>
              <span>{rate}%</span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>Time</span>
              <span>{time} year{time === "1" ? '' : 's'}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-gray-700">
              <span>Total Amount</span>
              <span className="font-semibold">
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>

          </div>
        )}
      </div>

    </div>


  )
}

export default App