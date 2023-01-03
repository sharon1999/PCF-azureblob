const { BlobServiceClient } = require("@azure/storage-blob");
import {
  MessageBar,
  MessageBarButton,
  MessageBarType,
} from "office-ui-fabric-react";
import * as React from "react";
type GreetProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const blobSasUrl =
  "https://trialstorage111.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-07-17T12:43:47Z&st=2022-07-03T04:43:47Z&spr=https&sig=Lzv5mjPybO0wwaJzscpBsxDIBx1F7fdIPuljdDp6CxY%3D";

export const UploadButton = (props: GreetProps) => {
  const [blobSelectedName, setblobSelectedName] = React.useState("");
  const [containerName, setcontainerName] = React.useState<string[]>([]);
  const [uploadFlag, setuploadFlag] = React.useState(false);
  const [dropdownFlag, setdropdownFlag] = React.useState(false);
  const [listContainers, setlistContainers] = React.useState(false);

  const handleFileUpload = async (element: HTMLInputElement) => {
    const file = element.files!;
    console.log(file[0].type);

    // Create a new BlobServiceClient
    const blobServiceClient = new BlobServiceClient(blobSasUrl);

    // Get a container client from the BlobServiceClient
    const containerClient =
      blobServiceClient.getContainerClient(blobSelectedName);

    const blobClient = containerClient.getBlockBlobClient(file[0].name);
    const options = { blobHTTPHeaders: { blobContentType: file[0].type } };
    await blobClient.uploadBrowserData(file, options);
    setuploadFlag(true);
  };
  const listBlobContainers = async () => {
    // Create a new BlobServiceClient
    const blobServiceClient = new BlobServiceClient(blobSasUrl);
    let i = 1;
    let containers = blobServiceClient.listContainers();
    for await (const container of containers) {
      console.log(container);
      setcontainerName((containerName) => [...containerName, container]);
    }
    setlistContainers(true);
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
      {uploadFlag ? (
        <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
          Success
        </MessageBar>
      ) : listContainers && !dropdownFlag ? (
        <MessageBar>Select a Container from dropdown</MessageBar>
      ) : dropdownFlag ? (
        <MessageBar>Upload a File</MessageBar>
      ) : (
        <MessageBar>Click on List Containers</MessageBar>
      )}
      <div
        style={{
          width:"750px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "15px",
        }}
      >
        <select
          onChange={(e) => {
            setblobSelectedName(e.target.value),
              setdropdownFlag(true),
              setuploadFlag(false);
          }}
          style={{
            width: "155px",
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
        </select>{" "}
        <button
          onClick={listBlobContainers}
          disabled={!!containerName.length}
          style={{
            padding: "5px 25px",
            fontSize: "16px",
            marginLeft: "15px",
            borderRadius: "4px",
            border: "0.5px solid gray",
            cursor: "pointer",
          }}
        >
          List Containers
        </button>
      </div>

      <input
        type="file"
        style={{
          opacity: 100,
          width: 350,
          height: 50,
          pointerEvents: "all",
          position: "relative",
          paddingLeft: "20px",
        }}
        disabled={!blobSelectedName}
        onChange={(e: React.SyntheticEvent) =>
          handleFileUpload(e.currentTarget as HTMLInputElement)
        }
      />
    </div>
  );
};
