import React from "react"
import "../estilos/InputField.css"

interface InputFieldProps {
  label: string
  type: string
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputField({
  label,
  type,
  value,
  placeholder,
  onChange
}: InputFieldProps) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}
