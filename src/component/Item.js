import "./Title.css"
import "./Item.css"

const Item = (props) => {
  const { index, title, amount, status } = props
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }

  const deleteData = (index) => {
    props.DeleteItem(index)
  }

  return (
    <li className={status}>
      {title}
      <span>{formatNumber(amount)}</span>
      <button onClick={() => deleteData(index)}>ลบ</button>
      {/* <DataContext.Consumer>{(value) => <p>{value}</p>}</DataContext.Consumer> */}
    </li>
  )
}

export default Item
