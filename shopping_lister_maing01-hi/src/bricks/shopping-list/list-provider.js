//@@viewOn:imports
import { useEffect } from "uu5g05";
import { createComponent, Utils, useState } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

const initialShoppingList = {
  id: "123456",
  listName: "Nákupní seznam 1",
  userList: [
    { id: Utils.String.generateId(), name: "Oliver" },
    { id: Utils.String.generateId(), name: "Roman" },
    { id: Utils.String.generateId(), name: "Vendula" },
  ],
  itemList: [
    {
      id: Utils.String.generateId(),
      name: "Mléko",
    },
    {
      id: Utils.String.generateId(),
      name: "Chléb",
    },
  ],

  resolvedItems: [
    {
      id: Utils.String.generateId(),
      name: "Mouka",
    },
  ],
};

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
    const [showResolved, setShowResolved] = useState(false);
    const [shoppingList, setShoppingList] = useState(initialShoppingList);
    const [resolvedShoppingList, setResolvedShoppingList] = useState(initialShoppingList.resolvedItems);

    useEffect(() => {
      console.log(resolvedShoppingList);
      console.log(shoppingList.itemList);
    }, [resolvedShoppingList]);

    function remove(list) {
      setShoppingList((prevShoppingList) => ({
        ...prevShoppingList,
        itemList: prevShoppingList.itemList.filter((item) => item.id !== list.id),
      }));
    }

    function removeUser(list) {
      setShoppingList((prevShoppingList) => ({
        ...prevShoppingList,
        userList: prevShoppingList.userList.filter((item) => item.id !== list.id),
      }));
    }

    function create(values) {
      const list = {
        ...values,
        id: Utils.String.generateId(),
        sys: {
          cts: new Date().toISOString(),
        },
      };

      setShoppingList((prevShoppingList) => ({
        ...prevShoppingList,
        itemList: [...prevShoppingList.itemList, list],
      }));

      return list;
    }

    function createUser(values) {
      const user = {
        ...values,
        id: Utils.String.generateId(),
      };

      setShoppingList((prevUserList) => ({
        ...prevUserList,
        userList: [...prevUserList.userList, user],
      }));

      return user;
    }

    function update(id) {
      setShoppingList((prevShoppingList) => {
        const updatedList = prevShoppingList.itemList.find((item) => item.id === id);
        setResolvedShoppingList((prevResolved) => [...prevResolved, updatedList]);

        return {
          ...prevShoppingList,
          itemList: prevShoppingList.itemList.filter((item) => item.id !== id),
          resolvedItems: [...prevShoppingList.resolvedItems, updatedList],
        };
      });
    }

    function changeListName(value) {
      setShoppingList((prevList) => ({
        ...prevList,
        listName: value,
      }));
    }

    //@@viewOff:private

    //@@viewOn:render
    const value = {
      shoppingList,
      remove,
      update,
      create,
      removeUser,
      createUser,
      changeListName,
      showResolved,
      setShowResolved,
    };
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports
