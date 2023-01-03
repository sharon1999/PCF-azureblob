import * as React from "react";
import { IStackTokens } from "@fluentui/react";
import { FocusTrapZone } from "@fluentui/react/lib/FocusTrapZone";
import {
  CommandBar,
  ICommandBarItemProps,
} from "@fluentui/react/lib/CommandBar";
import { AddButton } from "./Components/addButton";
import { UploadButton } from "./Components/uploadButton";
import { ListButton } from "./Components/listButton";
window.Buffer = window.Buffer || require("buffer").Buffer;

export interface IButtonExampleProps {
  disabled?: boolean;
  checked?: boolean;
}

const stackTokens: IStackTokens = { childrenGap: 40 };

export const blobUi: React.FunctionComponent<IButtonExampleProps> = (props) => {
  const [operation, setOperation] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [enableFocusTrap, setEnableFocusTrap] = React.useState(false);
  const _items: ICommandBarItemProps[] = [
    {
      key: "newItem",
      text: "Add a Blob Container",
      cacheKey: "myCacheKey",
      iconProps: { iconName: "Add" },
      onClick: () => {
        setOperation("Add");
        console.log(operation);
      },
    },

    {
      key: "uploadfile",
      text: "Upload",
      iconProps: { iconName: "Upload" },
      onClick: () => {
        setOperation("Upload");
        console.log(operation);
      },
    },
    {
      key: "listfile",
      text: "List",
      iconProps: { iconName: "List" },
      onClick: () => {
        setOperation("List");
        console.log(operation);
      },
    },
  ];
  return (
    <div>
      <FocusTrapZone disabled={!enableFocusTrap}>
        <CommandBar
          items={_items}
          ariaLabel="Inbox actions"
          primaryGroupAriaLabel="Email actions"
          farItemsGroupAriaLabel="More actions"
        />
      </FocusTrapZone>
      <div className="container justify-content-center">
        {operation == "Add" && (
          <AddButton operation={operation} setOperation={setOperation} />
        )}
      </div>
      <div className="container justify-content-center">
        {operation == "Upload" && <UploadButton handleChange={(event) => {}} />}
      </div>
      <div className="container justify-content-center">
        {operation == "List" && <ListButton handleChange={(event) => {}} />}
      </div>
    </div>
  );
};
