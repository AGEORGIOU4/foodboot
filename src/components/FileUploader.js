import { cilCloudUpload } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton } from '@coreui/react-pro';
import React from 'react';

const FileUploader = props => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <CButton
        onClick={handleClick}
        className="me-1 float-end"
        size="sm"
        color='info'
        variant="ghost"
      ><CIcon icon={cilCloudUpload} /> Import clients (.csv)
      </CButton>

      <input
        type="file"
        ref={hiddenFileInput}
        accept=".csv"
        onChange={props.handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
}
export default FileUploader