'use client'

import { recordMeasurement } from '@/lib/actions'
import { MeasurementType } from '@prisma/client'
import { useState } from 'react'

interface MeasurementFormProps {
  lessonId: string
}

const measurementTypes = [
  { value: MeasurementType.ACCURACY, label: 'Accuracy (%)', unit: '%' },
  { value: MeasurementType.REACTION_TIME, label: 'Reaction Time', unit: 'ms' },
  { value: MeasurementType.TRACKING_SCORE, label: 'Tracking Score', unit: '%' },
  { value: MeasurementType.CROSSHAIR_PLACEMENT, label: 'Crosshair Placement', unit: '%' },
  { value: MeasurementType.FLICK_SPEED, label: 'Flick Speed', unit: 'ms' },
  { value: MeasurementType.TARGET_SWITCHING, label: 'Target Switching', unit: '%' },
  { value: MeasurementType.CUSTOM, label: 'Custom Metric', unit: '' },
]

export default function MeasurementForm({ lessonId }: MeasurementFormProps) {
  const [type, setType] = useState<MeasurementType>(MeasurementType.ACCURACY)
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState('%')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTypeChange = (newType: MeasurementType) => {
    setType(newType)
    const selectedType = measurementTypes.find(t => t.value === newType)
    if (selectedType) {
      setUnit(selectedType.unit)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!value || isNaN(Number(value))) {
      alert('Please enter a valid number')
      return
    }

    setIsSubmitting(true)
    try {
      await recordMeasurement(lessonId, type, Number(value), unit, notes || undefined)
      setValue('')
      setNotes('')
      alert('Measurement recorded successfully!')
    } catch (error) {
      console.error('Failed to record measurement:', error)
      alert('Failed to record measurement. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Measurement Type</label>
        <select
          value={type}
          onChange={(e) => handleTypeChange(e.target.value as MeasurementType)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
        >
          {measurementTypes.map((mt) => (
            <option key={mt.value} value={mt.value}>
              {mt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Score/Value</label>
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your score"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Unit</label>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="Unit (%, ms, etc.)"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional notes about this session..."
          rows={3}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors"
      >
        {isSubmitting ? 'Recording...' : 'Record Measurement'}
      </button>
    </form>
  )
}