const { BlobServiceClient } = require("@azure/storage-blob");
import { MessageBar, MessageBarType } from "office-ui-fabric-react";
import * as React from "react";
import { DetailsListBasicExampleFunction } from "./list";
type GreetProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const blobSasUrl =
  "https://trialstorage111.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-07-17T12:43:47Z&st=2022-07-03T04:43:47Z&spr=https&sig=Lzv5mjPybO0wwaJzscpBsxDIBx1F7fdIPuljdDp6CxY%3D";

export const ListButton = (props: GreetProps) => {
  const [blobSelectedName, setblobSelectedName] = React.useState("");
  const [containerName, setContainerName] = React.useState<string[]>([]);
  const [blobName, setBlobName] = React.useState<string[]>([]);
  const [bloblength, setBloblength] = React.useState(0);
  const [dropdownFlag, setdropdownFlag] = React.useState(false);
  const [listContainers, setlistContainers] = React.useState(false);
  const [listFlag, setlistFlag] = React.useState(false);
  const [showList, setshowList] = React.useState(false);

  const listBlobContainers = async () => {
    // Create a new BlobServiceClient
    const blobServiceClient = new BlobServiceClient(blobSasUrl);
    let i = 1;
    let containers = blobServiceClient.listContainers();
    for await (const container of containers) {

      setContainerName((containerName) => [...containerName, container]);
    }
    setlistContainers(true);
    setdropdownFlag(false);
  };
  const listBlobs = async () => {
    setdropdownFlag(true);
    // Create a new BlobServiceClient
    const blobServiceClient = new BlobServiceClient(blobSasUrl);

    const containerClient =
      blobServiceClient.getContainerClient(blobSelectedName);

    let i = 1;
    let blobs = containerClient.listBlobsFlat();
    setlistFlag(true);
    setBlobName([]);
    for await (const blob of blobs) {
      setBlobName((blobName) => [...blobName, blob]);
    }
    setshowList(true);
    setBloblength(blobName.length)

  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "15px",
      }}
    >
      { blobName.length != 0 ? (
        <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
          Success
        </MessageBar>                     
      ) : listContainers && !dropdownFlag ? (
        <MessageBar>Select a Container from dropdown</MessageBar>
      ) :  bloblength==0 && dropdownFlag? (
        <MessageBar>Empty Container</MessageBar>
        ):
        <MessageBar>Click on List Containers</MessageBar>
      }
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "15px",
        }}
      >
        <select
          style={{
            width: "155px",
          }}
          onChange={(e) => {
            setblobSelectedName(e.target.value);
            setdropdownFlag(true);
            setlistFlag(false);
            setshowList(false);            
          }}
        >
          <option value="" key="1">
            Select
          </option>
          {containerName.map((options: any) => (
            <option key={options.properties.etag} value={options.name}>
              {options.name}
            </option>
          ))}
        </select>
        <button
          style={{
            padding: "5px 25px",
            fontSize: "16px",
            marginLeft: "15px",
            borderRadius: "4px",
            border: "0.5px solid gray",
            cursor: "pointer",
          }}
          onClick={listBlobContainers}
          disabled={!!containerName.length}
        >
          List Containers
        </button>
      </div>
      <button onClick={listBlobs}>Lists Blobs</button>
      {showList && (
        <DetailsListBasicExampleFunction
          bloblength={blobName.length}
          blobName={blobName}
          blobSelectedName={blobSelectedName}
          setBloblength={setBloblength}
        />
      )}
    </div>
  );
};
