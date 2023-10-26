//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { withRoute, Header } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar";
import ListProvider from "../bricks/shopping-list/list-provider";
import ListView from "../bricks/shopping-list/list-view";
import CreateView from "../bricks/shopping-list/create-view";
import ListTitle from "../bricks/shopping-list/list-name.js";
import NameProvider from "../bricks/shopping-list/name-provider.js";
//@@viewOff:imports

let ShoppingListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListDetail",
  //@@viewOff:statics

  render() {
    //@@viewOn:private
    //@@vieOff:private
  
    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <ListProvider>
          {({ itemList, remove, update, create }) => (
            <>  
              <CreateView onCreate={create} style={{ maxWidth: 400, margin: "24px auto", display: "block" }} />
              <ListView itemList={itemList} onDelete={remove} onUpdate={update} />
              <ListTitle itemList={itemList} />
            </>
          )}
        </ListProvider>
      </>
    );
    //@@viewOff:render
  },
});

ShoppingListDetail = withRoute(ShoppingListDetail, { authenticated: true });

//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports