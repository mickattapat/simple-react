import { useEffect, useState } from "react"
import "./Formcomponent.css"

const FormComponent = (props) => {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [optionChk, setOption] = useState("")
  const [formValid, setFormValid] = useState(false)
  const [chkOtp, setchkOtp] = useState(false)

  function inputTitle(event) {
    setTitle(event.target.value)
  }

  const inputAmount = (event) => {
    setAmount(event.target.value)
  }

  const usedOption = (event) => {
    console.log(event)
    setOption(event)
  }

  const saveData = (event) => {
    if (optionChk !== "") {
      setchkOtp(false)
      event.preventDefault()
      var dataItem = {
        title: title,
        amount: optionChk === "plus" ? Number(amount) : -Number(amount),
      }
      props.addData(dataItem)
      setTitle("")
      setAmount("")
      setOption("")
    } else {
      setchkOtp(true)
    }
  }

  useEffect(() => {
    const chkData = title.trim().length > 0 && amount.trim().length !== 0
    console.log(chkData)
    setFormValid(chkData)
  }, [title, amount, optionChk])

  return (
    <div>
      <div className="form-control">
        <label>ชื่อรายการ</label>
        <input
          type="text"
          placeholder="ระบุชื่อรายการของคุณ"
          onInput={inputTitle}
          value={title}
        />
      </div>
      <div className="form-control">
        <label>จำนวนเงิน</label>
        <input
          type="number"
          placeholder="ค่าใช้จ่าย"
          onInput={inputAmount}
          value={amount}
        />
      </div>
      <div className="option-select">
        <button onClick={() => usedOption("plus")}>รายรับ</button>
        <button onClick={() => usedOption("minus")}>รายจ่าย</button>
      </div>
      <div style={{ textAlign: "center", fontSize: "12px", color: "red" }}>
        {chkOtp === true ? <span>กรุณาเลือก รายรับ / รายจ่าย</span> : ""}
      </div>
      <div>
        <button
          onClick={saveData}
          type="submit"
          className="btn"
          disabled={!formValid}
        >
          เพิ่มข้อมูล
        </button>
      </div>
    </div>
  )
}

export default FormComponent
