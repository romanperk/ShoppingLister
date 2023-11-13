//@@viewOn:imports
import { Utils, createVisualComponent, useState } from "uu5g05";
import { Button } from "uu5g05-elements";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import { LoremIpsum } from "uu5g05-dev";
import Tile from "./example-tile.js";
import ModalOnButton from "./new-list-modal.js";
import Config from "./config/config.js";

//@@viewOff:imports

//@@viewOn:constants
const DATA = [
  {
    id: "01",
    listName: "Vánoční nákup",
  },
  {
    id: "02",
    listName: "Týdenní nákup",
  },
  {
    id: "03",
    listName: "Nákup na Velikonoce",
  },
  {
    id: "04",
    listName: "Nákupní seznam 1",
  }
];

const CLASS_LIST = [];
for (let item of DATA) {
  let itemClass = item.class;
  if (CLASS_LIST.indexOf(itemClass) === -1) CLASS_LIST.push(itemClass);
}

const FILTER_LIST = [
  {
    key: "listName",
    label: "Název",
    filter: (item, value) => {
      let fragments = value.split(/[\s,.-;:_]/);
      return fragments.some((frag) => {
        let itemValue =
          typeof item.listName === "object" ? Utils.Language.getItem(item.listName) : item.listName;
        return itemValue.toLowerCase().indexOf(frag.toLowerCase()) !== -1;
      });
    },
    inputProps: { placeholder: { en: "Enter value", cs: "Zadejte hodnotu" } },
  }
];

const SORTER_LIST = [
  {
    key: "listName",
    label: "Název",
    sort: (a, b) => a.listName.localeCompare(b.listName),
  },
];
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let ListsProvider = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListsProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [filterList, setFilterList] = useState([]);
    const [sorterList, setSorterList] = useState([]);

    const [modalProps, setModalProps] = useState();

    function handleClose() {
      setModalProps({ ...modalProps, open: false });
    }

    function onFilterChange(e) {
      setFilterList(e.data.filterList);
    }

    function onSorterChange(e) {
      setSorterList(e.data.sorterList);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <div className={Config.Css.css({ padding: "16px 32px" })}>
          <Uu5Tiles.ControllerProvider
            data={DATA}
            filterDefinitionList={FILTER_LIST}
            filterList={filterList}
            onFilterChange={onFilterChange}
            sorterDefinitionList={SORTER_LIST}
            sorterList={sorterList}
            onSorterChange={onSorterChange}
          >
            <ModalOnButton header="Vytvořit seznam" />
            <Uu5TilesControls.FilterButton />
            <Uu5TilesControls.SorterButton />
            <Uu5TilesControls.SearchButton />
            <Uu5TilesControls.FilterBar />
            <Uu5TilesControls.SorterBar />
            <Uu5TilesControls.Counter />
            <Uu5TilesElements.Grid tileMinWidth={100} tileMaxWidth={200}>
              {Tile}
            </Uu5TilesElements.Grid>
          </Uu5Tiles.ControllerProvider>
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsProvider };
export default ListsProvider;
//@@viewOff:exports
