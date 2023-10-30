//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { Button } from "uu5g05-elements";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import ListProvider from "../bricks/shopping-list/list-provider.js";
import ListView from "../bricks/shopping-list/list-view.js";
import CreateView from "../bricks/shopping-list/create-item-view.js";
import AddUserView from "../bricks/shopping-list/add-user-view.js";
import NewTitleView from "../bricks/shopping-list/new-title-view.js";
import UserListView from "../bricks/shopping-list/user-list-view.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css

const Css = {
  icon: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 0,
    }),
  screen: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column", // Change to column for smaller screens
      justifyContent: "space-around",
      "@media (min-width: 768px)": {
        flexDirection: "row", // Change back to row for larger screens
      },
    }),
  userListContainer: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 0, // Remove right margin for smaller screens
      gap: 10,
    }),
  ListButtons: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column", // Change to column for smaller screens
      gap: 10,
      "@media (min-width: 768px)": {
        flexDirection: "row", // Change back to row for larger screens
      },
    }),
};

//@@viewOff:cs
let List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <>
        <RouteBar />
        <ListProvider>
          {({
            shoppingList,
            remove,
            update,
            create,
            removeUser,
            createUser,
            showResolved,
            setShowResolved,
            resolvedItems,
            changeListName,
          }) => (
            <div className={Css.screen()}>
              <div className={Css.userListContainer()}>
                <h1>Seznam uživatelů</h1>
                <AddUserView onCreate={createUser} style={{ maxWidth: 400, display: "block" }} />
                <UserListView shoppingList={shoppingList} onDelete={removeUser} />
              </div>
              <div className={Css.icon()}>
                <h1> {shoppingList.listName}</h1>
                <div className={Css.ListButtons()}>
                  <NewTitleView changeListName={changeListName} style={{ maxWidth: 400, display: "block" }} />
                  <CreateView onCreate={create} style={{ maxWidth: 400, display: "block" }} />
                  <Button onClick={() => setShowResolved(!showResolved)}>
                    {showResolved ? "Nevyřešené" : "Vyřešené"}
                  </Button>
                </div>
                <ListView
                  shoppingList={shoppingList}
                  showResolved={showResolved}
                  resolvedItems={resolvedItems}
                  onDelete={remove}
                  onUpdate={update}
                />
              </div>
            </div>
          )}
        </ListProvider>
      </>
    );
    //@@viewOff:render
  },
});

List = withRoute(List, { authenticated: true });

//@@viewOn:exports
export { List };
export default List;
//@@viewOff:exports
