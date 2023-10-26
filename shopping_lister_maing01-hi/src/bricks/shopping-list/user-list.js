//@@viewOn:imports
import { createComponent, useState } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

const UserList = createComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "UserList",
    //@@viewOff:statics
  
    render() {
      const [menuOpen, setMenuOpen] = useState(false);
      const [selectedItem, setSelectedItem] = useState(0);
  
      return (
        <Uu5Elements.Drawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          content={(
            <Uu5Elements.MenuList
              itemBorderRadius="moderate"
              itemList={TABS.map((tab, i) => ({
                ...tab,
                onClick: () => setSelectedItem(i),
                focused: selectedItem === i,
              }))}
            />
          )}
        >
          <div className={Config.Css.css({ padding: 24 })}>
            <Uu5Elements.Button
              icon={menuOpen ? "uugds-close" : "uugds-menu"}
              children={menuOpen ? "Close Drawer" : "Open Drawer"}
              significance="highlighted"
              onClick={() => setMenuOpen((prev) => !prev)}
              className={Config.Css.css({ marginBottom: 24 })}
            />
            {CONTENTS[selectedItem]}
          </div>
        </Uu5Elements.Drawer>
      );
    },
  });

  //@@viewOn:exports
export { UserList };
export default UserList;
//@@viewOff:exports