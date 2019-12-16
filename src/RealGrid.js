import React, {useCallback, useEffect, useRef, useState} from "react";
import "./RealGris.scss";
import {Alert} from "antd";
import StartbucksSeoulData from "./data/starbucks-seoul";

// window 객체에 바인딩된 RealGridJS
const RealGridJS = window.RealGridJS;

const columns = [
  { fieldName: 'sido_name', header: { text: '시도 '}, renderer: { showTooltip: true }, width: 50 },
  { fieldName: 'gugun_name', header: { text: '구군' }, width: 50 },
  { fieldName: 's_name', header: { text: '이름' }, width: 200 },
  { fieldName: 'tel', header: { text: '전화번호' } },
  { fieldName: 'addr', header: { text: '주소' } },
  { fieldName: 'lat', header: { text: '위도' } },
  { fieldName: 'lot', header: { text: '경도' } },
];


export function RealGridExample() {
  return (
    <RealGrid source={StartbucksSeoulData}
              columns={columns}
              selectionmode={'singleRow'}
              onCellbeginedit={e => console.log("onCellbeginedit:", e.args)}
              onCellendedit={e => console.log("onCellenddit:", e.args)}
              onRowclick={data => console.log("onRowclick :", data)}
              style={{ height: 500 }} />
  );
}


export default function RealGrid({
  source,
  columns,
  onCellbeginedit, onCellendedit,
  onRowclick,
  selectionmode,
  style,
}) {
  const gridRef = useRef();
  const [gridView, setGridView] = useState();
  const [dataProvider, setDataProvider] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if ( !RealGridJS ) {
      setError("RealGridJS 임포트를 해주세요.");
    }
    else {
      init();
    }
  }, []);

  useEffect(() => {
    if ( dataProvider )
      dataProvider.setRows(source);
  }, [dataProvider, source]);

  const init = useCallback(() => {
    RealGridJS.setTrace(true);  // FIXME: DEBUG 여부

    const el = gridRef.current;
    const localDataProvider = new RealGridJS.LocalDataProvider();
    localDataProvider.setFields(columns.map(({ fieldName }) => ({ fieldName })));
    localDataProvider.onRowUpdating = (provider, row) => {
      if ( onCellbeginedit ) {
        const values = provider.getRow(row);
        return onCellbeginedit({ args: { row: values } });
      }
      return true;
    };
    localDataProvider.onRowUpdated = (provider, row) => {
      if ( onCellendedit ) {
        const values = provider.getRow(row);
        onCellendedit({ args: { row: values } });
      }
    };

    setDataProvider(localDataProvider);

    const gridView = new RealGridJS.GridView(el);
    gridView.setOptions({
      indicator: { visible: false },
      checkBar: { visible: false },
      sateBar: { visible: false },
      edit: {
        insertable: true,
        appendable: true,
        updatable: true,
        editable: true,
      },
    });
    gridView.setSelectOptions({ style: selectionmode });
    gridView.setDataSource(localDataProvider);

    gridView.onCurrentChanged = (grid, newIndex) => {
      const row = grid.getSelectionData()[0];
      if ( onRowclick )
        onRowclick(row);
    };

    gridView.setColumns(columns);

    // const header = gridView.getColumnProperty('col1', 'header');
    // header.text = '컬럼2';
    // gridView.setColumnProperty('col1', 'header', header);

    setGridView(gridView);
  }, []);

  return (
    <div>
      {error && <Alert message={error} type={"error"}  />}
      <div ref={gridRef}
           className="real-grid"
           style={{ ...style }} />
    </div>
  );
}
