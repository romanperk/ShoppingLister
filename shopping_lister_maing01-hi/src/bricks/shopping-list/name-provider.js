//@@viewOn:imports
import { createComponent, Utils, useState } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

let initialNameList = [
  {
    id: Utils.String.generateId(),
    name: "Nákupní seznam 1",
    }
];

const NameProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "NameProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [nameList] = useState(initialNameList);
    //@@viewOff:private

    //@@viewOn:render
    const value = { initialNameList };
    return typeof props.children === "function" ? props.children(value) : props.children;    //@@viewOff:render
  },
});

//@@viewOn:exports
export { NameProvider };
export default NameProvider;
//@@viewOff:exports