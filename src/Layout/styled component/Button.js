import styled from "styled-components";
import { Blue, Coffee } from "./Colors";
import { Gibson } from "./Font";

import { Link } from "react-router-dom";

export const DefaultButton = styled.button`
  font-family: ${Gibson};
  background: ${Blue};
  color: #fff;
  :hover {
    background: ${Coffee};
  }
  text-align: center;
  outline: none !important;
  box-shadow: none !important;
  cursor: pointer;
  border: none;
`;
export const XLargeButton = styled(DefaultButton)`
  width: 175px;
  height: 50px;
  font-size: 19px;
  border-radius: 12px;
  font-weight: 400;
`;

export const LargeButton = styled(DefaultButton)`
  width: 115px;
  height: 30px;
  font-size: 16px;
  border-radius: 8px;
  font-weight: 400;
  background: #fff;
  color: #344466;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid ${Blue};
  :hover {
    background: ${Blue};
    color: #fff;
    border: 1px solid #fff;
  }

  :disabled {
    background: #fff;
    color: #344466;
    border: 1px solid ${Blue};
    cursor: not-allowed;
  }
`;

export const SidebarLabel = styled(DefaultButton)`
  width: 155px;
  height: 35px;
  font-size: 17px;
  border-radius: 12px;
  font-weight: 400;
  pointer-events: none;
`;
export const SidebarButton = styled(DefaultButton)`
  width: 180px;
  height: 35px;
  font-size: 16px;
  border-radius: 8px;
  font-weight: 400;
`;

export const UploadButton = styled.span`
font-family: Gibson;
background:  ${Blue};
color: #fff;
text-align: center;
outline: none !important;
box-shadow: none !important;
width: 80px;
height: 35px;
font-size: 12px;
border-radius: 6px; 
font-weight: 500;
text-align:center;
position:absolute;
padding-top:10px;
lineHeight: 1.27,
cursor: pointer;
:hover{
  background:  ${Coffee};  
  cursor: pointer;
}`;

export const ChipView = styled.span`
  font-family: ${Gibson};
  text-align: center;
  background: #ffeeff;
  outline: none !important;
  box-shadow: none !important;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-weight: 400;
  padding: 5px;
  font-size: 17px;
  // margin:10px
  pointer-events: none;
  //  min-width:16%;
  width: 80px;
`;

export const StyleLink = styled(Link)`
  width: 165px;
  height: 2000px;
  font-size: 19px;
  border-radius: 12px;
  font-weight: 400;
  appearance: none;
  color: white;
  background: ${Blue};
  font-family: ${Gibson};
  padding: 15px;
  textdecoration: none;
  apperance: button;
  text-align: center;
  outline: none !important;
  box-shadow: none !important;
  :hover {
    background: ${Coffee};
  }
`;
