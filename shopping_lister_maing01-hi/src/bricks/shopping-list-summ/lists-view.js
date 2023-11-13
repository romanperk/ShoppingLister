//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import ListTile from "./list-tile";
import ListArchivedTile from "./list-archived-tile";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  // ... (your existing styles)

  listViewContainer: () =>
    Config.Css.css({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }),

  listViewTile: () =>
    Config.Css.css({
      width: 800,
      margin: "24px",
      "@media (max-width: 1000px)": {
        width: 550, // Adjust as needed for smaller screens
      },
      "@media (max-width: 768px)": {
        width: 400, // Adjust as needed for smaller screens
      },
      // Add more media queries for different screen sizes if necessary
    }),
};

//@@viewOff:css

const ListsView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    shoppingLists: [],
    onArchive: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { addAlert } = useAlertBus();

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    function handleDelete(event) {
      const list = event.data;

      try {
        props.onDelete(list);
        addAlert({
          message: `Položka ${list.name} byla smazána.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListView.logger.error("Chyba během mázání položky", error);
        showError(error, "Smazání položky selhalo!");
      }
    }

    function handleArchive(event) {
      const id = event.data;

      try {
        props.onArchive(id.id);
        addAlert({
          message: `Položka ${id.name} byla označena za vyřešenou.`,
          priority: "success",
          durationMs: 2000,
        });
      } catch (error) {
        ListView.logger.error("Chyba během označení položky za vyřešenou", error);
        showError(error, "Označení položky za vyřešenou selhalo!");
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    return (
      <div {...attrs}>
              <ListTile
                key={list.id}
                list={list}
                onDelete={handleDelete}
                onArchive={handleArchive}
                className={Css.listViewTile()}
              />
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListsView };
export default ListsView;
//@@viewOff:exports
