import { DefaultButton } from "@fluentui/react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react";
import * as React from "react";

type GreetProps = {
  operation: string;
  setOperation: (val: string) => void;
};
export const AddButton = (props: GreetProps) => {
  const [name, setName] = React.useState("");
  const [createFlag, setcreateFlag] = React.useState(false);
  const [errorFlag, seterrorFlag] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {createFlag ? (
        <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
          Container Created Successfully
        </MessageBar>
      ) : errorFlag ? (
        <MessageBar messageBarType={MessageBarType.error}>
          Blob Naming Error:This name may only contain lowercase letters,
          numbers, and hyphens, and must begin with a letter or a number. Each
          hyphen must be preceded and followed by a non-hyphen character. The
          name must also be between 3 and 63 characters long.
        </MessageBar>
      ) : (
        <MessageBar>Add a Container Name</MessageBar>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <label>Blob Name</label>
        <input
          style={{
            width: "275px",
            margin: "25px",
          }}
          type="text"
          name="blobName"
          value={name}
          onChange={handleChange}
        />
      </div>

      <DefaultButton text="Create" onClick={createBlob} allowDisabledFocus />
    </div>
  );

  function createBlob() {
    try {
      setcreateFlag(false);
      var regex = /[a-z0-9]+[a-z0-9-][a-z0-9]+/g;
      if (regex.test(name)) {
        seterrorFlag(false);
        setcreateFlag(true);
      } else {
        seterrorFlag(true);
      }
      const { BlobServiceClient } = require("@azure/storage-blob");
      // Update <placeholder> with your Blob service SAS URL string
      const blobSasUrl =
        "https://trialstorage111.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2022-07-17T12:43:47Z&st=2022-07-03T04:43:47Z&spr=https&sig=Lzv5mjPybO0wwaJzscpBsxDIBx1F7fdIPuljdDp6CxY%3D";

      // Create a new BlobServiceClient
      const blobServiceClient = new BlobServiceClient(blobSasUrl);

      // Create a unique name for the container by
      // appending the current time to the file name
      //const containerName = "container" + new Date().getTime();
      const containerName = name;

      // Get a container client from the BlobServiceClient
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      // const createContainer = async () => {

      console.log(`Creating container "${containerName}"...`);
      containerClient.create();
      console.log(`Done.`);
      //  alert("Success");
    } catch (error) {
      console.log(error);
    }
    // };
  }
};
