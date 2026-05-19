"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

export type Currency = "EUR" | "USD"

export type PitchGoalKey =
  | "speed"
  | "standstill"
  | "price"
  | "photographer"
  | "staff"
  | "consistency"
  | "online"
  | "scale"

export const PITCH_GOALS: { key: PitchGoalKey; label: string; hint: string }[] = [
  { key: "speed", label: "Speed up time-to-listing", hint: "Go from car arriving to online in hours, not days" },
  { key: "standstill", label: "Reduce standstill time", hint: "Every extra day on the lot eats margin" },
  { key: "price", label: "Achieve higher online prices", hint: "Better visuals = stronger price defense" },
  { key: "photographer", label: "Cut photographer & agency costs", hint: "No more €70/car external shoots" },
  { key: "staff", label: "Free up sales staff time", hint: "Hours/week reclaimed for customers" },
  { key: "consistency", label: "Consistent brand look", hint: "Same studio feel across every rooftop" },
  { key: "online", label: "Improve online presentation", hint: "Stand out on mobile.de, AutoScout24, own site" },
  { key: "scale", label: "Scale volume without new hires", hint: "Double throughput with the same team" },
]

export type DealerInputs = {
  /** Dealer group / rooftop name */
  dealerName: string
  /** New + used cars sold per year across all rooftops */
  carsPerYear: number | null
  /** Average days a car sits on the lot before selling */
  avgStandstillDays: number | null
  /** Average sale price per car */
  avgCarPrice: number | null
  /** Current photo + editing cost per car (external agency, freelancer, or in-house) */
  photoCostPerCar: number
  /** Internal staff hours per car (scheduling, moving, uploading, QC) */
  staffHoursPerCar: number
  /** Fully-loaded hourly staff cost (salary + benefits + overhead) */
  hourlyStaffRate: number
  /** Display currency — shared across slides */
  currency: Currency
  /** Business goals the dealer cares about */
  goals: PitchGoalKey[]
}

export const PITCH_DEFAULTS: DealerInputs = {
  dealerName: "",
  carsPerYear: null,
  avgStandstillDays: null,
  avgCarPrice: null,
  photoCostPerCar: 55,
  staffHoursPerCar: 1.5,
  hourlyStaffRate: 35,
  currency: "EUR",
  goals: [],
}

/** Indicative FX — 1 EUR = 1.08 USD */
export const EUR_TO_USD = 1.08

export const CURRENCY_META: Record<Currency, { symbol: string; rate: number; locale: string }> = {
  EUR: { symbol: "€", rate: 1, locale: "de-DE" },
  USD: { symbol: "$", rate: EUR_TO_USD, locale: "en-US" },
}

export function formatMoney(eurValue: number, currency: Currency, maximumFractionDigits = 0) {
  const meta = CURRENCY_META[currency]
  return (eurValue * meta.rate).toLocaleString(meta.locale, {
    style: "currency",
    currency,
    maximumFractionDigits,
  })
}

type Ctx = {
  inputs: DealerInputs
  setInputs: (patch: Partial<DealerInputs>) => void
  toggleGoal: (key: PitchGoalKey) => void
  reset: () => void
  /** Timestamp set when the pitcher clicks "Save & generate report". Used as a dep to re-fetch the AI report. */
  savedAt: number | null
  saveForReport: () => void
  /** True once we have enough data to produce a meaningful report */
  hasEnoughForReport: boolean
}

const PitchInputsContext = createContext<Ctx | null>(null)

export function PitchInputsProvider({ children }: { children: ReactNode }) {
  const [inputs, setInputsState] = useState<DealerInputs>(PITCH_DEFAULTS)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  const setInputs = useCallback((patch: Partial<DealerInputs>) => {
    setInputsState((prev) => ({ ...prev, ...patch }))
  }, [])

  const toggleGoal = useCallback((key: PitchGoalKey) => {
    setInputsState((prev) => ({
      ...prev,
      goals: prev.goals.includes(key) ? prev.goals.filter((g) => g !== key) : [...prev.goals, key],
    }))
  }, [])

  const reset = useCallback(() => {
    setInputsState(PITCH_DEFAULTS)
    setSavedAt(null)
  }, [])

  const saveForReport = useCallback(() => {
    setSavedAt(Date.now())
  }, [])

  const hasEnoughForReport = useMemo(() => {
    return !!(inputs.carsPerYear && inputs.avgCarPrice)
  }, [inputs.carsPerYear, inputs.avgCarPrice])

  const value = useMemo<Ctx>(
    () => ({ inputs, setInputs, toggleGoal, reset, savedAt, saveForReport, hasEnoughForReport }),
    [inputs, setInputs, toggleGoal, reset, savedAt, saveForReport, hasEnoughForReport],
  )

  return <PitchInputsContext.Provider value={value}>{children}</PitchInputsContext.Provider>
}

export function usePitchInputs() {
  const ctx = useContext(PitchInputsContext)
  if (!ctx) {
    throw new Error("usePitchInputs must be used inside <PitchInputsProvider>.")
  }
  return ctx
}
