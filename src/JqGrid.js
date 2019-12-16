import React from "react";
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import JqxGrid, { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import StartbucksSeoulData from "./data/starbucks-seoul";


export default function JqGrid({ style }) {
  const source = new jqx.dataAdapter({
    datafields: [
      { name: 'sido_name' },
      { name: 'gugun_name' },
      { name: 's_name' },
      { name: 'tel' },
      { name: 'addr' },
      { name: 'lat' },
      { name: 'lot' },
    ],
    datatype: 'json',
    localdata : StartbucksSeoulData,
  });

  const columns = [
    { text: '시도', datafield: 'sido_name' },
    { text: '구군', datafield: 'gugun_name' },
    { text: '이름', datafield: 's_name' },
    { text: '전화번호', datafield: 'tel' },
    { text: '주소', datafield: 'addr' },
    { text: '위도', datafield: 'lat' },
    { text: '경도', datafield: 'lot' },
  ];

  return (
    <div>
      <JqxGrid
        source={source}
        columns={columns}
        editable={true}
        onCellbeginedit={e => console.log("onCellbeginedit:", e.args)}
        onCellendedit={e => console.log("onCellenddit:", e.args)}
        onRowclick={data => console.log("clicked :", data)}
        // width={'100%'}
        // pageable={true}
        columnsresize={true}
        autoheight={true}
        sortable={true}
        altrows={true}
        enabletooltips={true}
        selectionmode={'singlerow'}
        editmode={"dblclick"}
      />
    </div>
  );
}
