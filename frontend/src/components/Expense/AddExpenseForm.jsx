import React, { useState } from "react"
import Input from "../Inputs/Input"
import EmojiPickerPopup from "../layouts/EmojiPickerPopup"

const AddExpenseForm = ({openAddExpense}) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
      })
       const handleChange = (key, value) =>
    setExpense({ ...expense, [key]: value })
    
  return (
    <div className="space-y-6">
      {/* Emoji Picker */}
      <div className="flex justify-center">
        <EmojiPickerPopup
          icon={expense.icon}
          onSelect={(selectedIcon) =>
            handleChange("icon", selectedIcon)
          }
        />
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <Input
          value={expense.category}
          onChange={({ target }) =>
            handleChange("category", target.value)
          }
          label="Expense category"
          placeholder="Rent"
          type="text"
        />

        <Input
          value={expense.amount}
          onChange={({ target }) =>
            handleChange("amount", target.value)
          }
          label="Amount"
          placeholder="₹500"
          type="number"
        />

        <Input
          value={expense.date}
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
          onClick={() => openAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm