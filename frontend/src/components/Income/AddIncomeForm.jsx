import React, { useState } from "react"
import Input from "../Inputs/Input"
import EmojiPickerPopup from "../layouts/EmojiPickerPopup"

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  })

  const handleChange = (key, value) =>
    setIncome({ ...income, [key]: value })

  return (
    <div className="space-y-6">
      {/* Emoji Picker */}
      <div className="flex justify-center">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) =>
            handleChange("icon", selectedIcon)
          }
        />
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <Input
          value={income.source}
          onChange={({ target }) =>
            handleChange("source", target.value)
          }
          label="Income Source"
          placeholder="Salary"
          type="text"
        />

        <Input
          value={income.amount}
          onChange={({ target }) =>
            handleChange("amount", target.value)
          }
          label="Amount"
          placeholder="₹500"
          type="number"
        />

        <Input
          value={income.date}
          onChange={({ target }) =>
            handleChange("date", target.value)
          }
          label="Date"
          type="date"
        />
      </div>

      {/* Action */}
      <div className="flex justify-end pt-4 border-t">
        <button
          className="add-btn add-btn-fill px-6 py-2"
          type="button"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  )
}

export default AddIncomeForm
