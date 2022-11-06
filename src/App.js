import { useEffect, useState } from "react"
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom"
import "./App.css"
import FormComponent from "./component/FormComponent"
import ReportComponent from "./component/ReportComponent"
import Title from "./component/Title"
import DataContext from "./data/DataContext"

function App() {
  const design = { color: "#333333", textAlign: "center", fontSize: "1.5rem" }

  const initState = [
    { title: "เงินเดือน", amount: 15000 },
    { title: "ค่าขนม", amount: -500 },
    { title: "ค่าไฟ", amount: -500 },
    { title: "ค่าน้ำ", amount: -500 },
  ]

  const [items, setItems] = useState([])
  const [reportIncome, SetReportIncome] = useState("")
  const [reportExpanse, SetReportExpanse] = useState("")

  const newData = (newItem) => {
    setItems((prevData) => {
      return [newItem, ...prevData]
    })
  }
  const delData = (newData)=> {
    const currentListCopy = [...items];
    currentListCopy.splice(newData,1)
    setItems(currentListCopy)
  }

  useEffect(() => {
    const amount = items.map((element) => {
      return element.amount
    })
    const income = amount
      .filter((element) => {
        return element > 0
      })
      .reduce((total, element) => {
        return (total += element)
      }, 0)
    const expanse =
      amount
        .filter((element) => {
          return element < 0
        })
        .reduce((total, element) => (total += element), 0) * -1

    SetReportIncome(income.toFixed(2))
    SetReportExpanse(expanse.toFixed(2))
  }, [items])

  // reducer state
  // const [showReport,SetShowReport] = useState(false)
  // // const showReport = false

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "SHOW":
  //       return SetShowReport(true)
  //     case "HIDE":
  //       return SetShowReport(false)
  //     default:
  //       return state
  //   }
  // }
  // const [result, dispatch] = useReducer(reducer, showReport)

  return (
    <DataContext.Provider
      value={{
        income: reportIncome,
        expanse: reportExpanse,
      }}
    >
      <div>
        <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
        <Router>
          <div>
            <ul className="horizontal-menu">
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูลบัญชี</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" exact element={<ReportComponent />}></Route>
              <Route
                path="/insert"
                element={
                  <>
                    <FormComponent  addData={newData} />
                    <Title items={items} delData={delData} />
                  </>
                }
              ></Route>
            </Routes>
          </div>
        </Router>
        {/* {showReport && <ReportComponent />} */}

        {/* <div>
          <button onClick={() => dispatch({ type: "SHOW"})}>
            แสดง
          </button>
          <button onClick={() => dispatch({ type: "HIDE"})}>
            ซ่อน
          </button>
        </div> */}
      </div>
    </DataContext.Provider>
  )
}

export default App
