//@@viewOn:imports
import { Utils, createVisualComponent, useState } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";
import Tile from "./list-tile.js";
import ModalOnButton from "./new-list-modal.js";
import Config from "./config/config.js";
import { useJokes } from "../list-context.js";
import { useAlertBus, Button } from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
const SORTER_LIST = [
  {
    key: "listName",
    label: "Název",
    sort: (a, b) => a.listName.localeCompare(b.listName),
  },
];
//@@viewOff:constants

//@@viewOn:css
const Css = {
  counter: () =>
    Config.Css.css({
      height: 30,
      marginBottom: 10,
      paddingLeft: 15
    })
}
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let ListsView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListsView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [sorterList, setSorterList] = useState([]);
    const { currentListId, selectlist, getArchivedLists, getActiveLists } = useJokes();
    const { addAlert } = useAlertBus();
    const activeList = getActiveLists();
    const archivedList = getArchivedLists();
    const [showArchived, setShowArchived] = useState(false);

    function onSorterChange(e) {
      setSorterList(e.data.sorterList);
    }

    function ArchivedButton(props) {
      return (
        <Button {...props}>
          {showArchived ? "Zobrazit aktivní seznamy" : "Zobrazit archivované seznamy"}
        </Button>
      );
    }

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    function handleDelete(event) {
      const list = event.data.id;
      try {
        props.onDelete(list);
        addAlert({
          message: `The list ${event.data.listName} has been deleted.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListsView.logger.error("Error deleting list", error);
        showError(error, "List delete failed!");
      }
    }
    
    function handleUpdate(event) {
      const list = event.data;
      try {
        props.onUpdate(list.id);
        addAlert({
          message: `The list ${list.listName} has been archived.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListsView.logger.error("Error archiving list", error);
        showError(error, "List archive failed!");
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const listsToDisplay = showArchived ? [archivedList] : [activeList];
    const attrs = Utils.VisualComponent.getAttrs(props);
    const { remove, update, create } = useJokes();
    return (
      <div {...attrs}>
        {listsToDisplay.map((list) => ( console.log(list),
        <div className={Config.Css.css({ padding: "16px 32px" })} key={list.id} 
        selectlist={selectlist}
        selected={list.id === currentListId}
        onDelete={handleDelete}>
        <ArchivedButton significance="subdued" colorScheme="primary" onClick={() => setShowArchived(!showArchived)} />
      
          <Uu5Tiles.ControllerProvider
            data={list}
            sorterDefinitionList={SORTER_LIST}
            sorterList={sorterList}
            onSorterChange={onSorterChange}
          >
            <ModalOnButton header="Vytvořit seznam" />
            <Uu5TilesControls.SorterButton significance="subdued" />
            <Uu5TilesControls.SearchButton significance="subdued" />
            <Uu5TilesControls.SorterBar />
            <Uu5TilesControls.Counter className={Css.counter()} />
            <Uu5TilesElements.Grid tileMinWidth={100} tileMaxWidth={200} onDelete={handleDelete} 
            onUpdate={handleUpdate} key={list.id}>
              {Tile}
            </Uu5TilesElements.Grid>
          </Uu5Tiles.ControllerProvider>
      
        </div>
             ))}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsView };
export default ListsView;
//@@viewOff:exports
