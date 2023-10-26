//@@viewOn:imports
import { createComponent, Utils, useState } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

let initialItemList = [
  {
    id: Utils.String.generateId(),
    name: "Jablko",
  },
  {
    id: Utils.String.generateId(),
    name: "Mléko",
  },
  {
    id: Utils.String.generateId(),
    name: "Mouka",
  },
];

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [itemList, setItemList] = useState(initialItemList);

    function remove(grocery) {
      setItemList((prevItemList) => prevItemList.filter((item) => item.id !== grocery.id));
    }

    function create(values) {
      const item = {
        ...values,
        id: Utils.String.generateId(),
      };
      setItemList((prevItemList) => [...prevItemList, item]);
      return item;
    }

    //@@viewOff:private

    //@@viewOn:render
    const value = { itemList, remove, create };
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports