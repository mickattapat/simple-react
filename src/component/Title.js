import Item from "./Item"
import "./Title.css"

function Title(props) {
  const { items } = props
  //   const formatNumber = (num) => {
  //     return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  //   }

  function DeleteItem(index) {
    props.delData(index)
  }

  const detail = items.map((item, index) => {
    const status = item.amount < 0 ? "expense" : "income"
    return (
      <Item
        key={index}
        index={index}
        {...item}
        status={status}
        DeleteItem={DeleteItem}
      />
    )
  })

  return (
    <div>
      <ul className="item-list">{detail}</ul>
    </div>
  )
}

export default Title
