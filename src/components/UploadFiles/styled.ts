import styled from 'styled-components';
import media from 'css-in-js-media';
import {FileDrop} from 'react-file-drop';

export const LabelStyled = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`;

export const PreviewStyled = styled.div`
  display: flex;
  padding: 10px 0;
  .file-item {
    border: 1px solid #b1b8c2;
    padding: 10px 20px;
    border-radius: 4px;
    position: relative;
    .close-icon {
      position: absolute;
      top: -5px;
      right: -5px;
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

export const UploadFilesStyled = styled(FileDrop)`
  position: relative;
  display: block;
  .upload-text {
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #6c6f84;
    display: block;
    ${media('<=tablet')} {
      display: none;
    }
  }
  .upload-content {
    border: 1.5px dashed #b1b8c2;
    box-sizing: border-box;
    border-radius: 10px;
    background: #f8fbff;
  }
  .upload-input {
    position: absolute;
    z-index: -1;
    opacity: 0;
    width: 1px;
  }
  .btn-upload {
    background-color:'blue';
    color:'red';
    padding: 10px 20px;
    border-radius: 5px;
  }
`;
