import * as React from "react";
import { ITextFieldStyles } from "office-ui-fabric-react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn,
} from "office-ui-fabric-react/lib/DetailsList";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { mergeStyles } from "office-ui-fabric-react/lib/Styling";

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px",
});

const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "300px" },
};

export interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  value: number;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: string;
}
type GreetProps = {
  bloblength: number;
  blobName: string[];
  blobSelectedName: string;
  setBloblength: (val: number) => void;
};
export const DetailsListBasicExampleFunction = (props: GreetProps) => {
  const _allItems: IDetailsListBasicExampleItem[] = [];
  const [selection, setSelection] = React.useState<Selection | undefined>();
  function _getSelectionDetails(): string {
    const selectionCount = selection ? selection.getSelectedCount() : 0;

    switch (selectionCount) {
      case 0:
        return "No items selected";
      case 1:
        return (
          "1 item selected: " +
          (selection?.getSelection()[0] as IDetailsListBasicExampleItem).name
        );
      default:
        return `${selectionCount} items selected`;
    }
  }
  const [state, setState] = React.useState({
    items: _allItems,
    selectionDetails: _getSelectionDetails(),
  });
  React.useEffect(() => {
    const _selection: Selection = new Selection({
      onSelectionChanged: () =>
        setState({
          items: [],
          selectionDetails: "",
        }),
    });
    setSelection(_selection);
    console.log("LenBlob", props.blobName.length);
    props.setBloblength(0);
  }, [props.bloblength]);
  const _columns: IColumn[] = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 200,
      maxWidth: 500,
      isResizable: true,
    },
  ];

  const _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {
    window.open(
      `https://trialstorage111.blob.core.windows.net/${props.blobSelectedName}/${item.name}`
    );
  };
  return selection ? (
    <Fabric>
      <DetailsList
        items={props.blobName}
        columns={_columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        selection={selection}
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
        onItemInvoked={_onItemInvoked}
      />
    </Fabric>
  ) : (
    <div>Loading</div>
  );
};
