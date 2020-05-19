import { remote } from 'electron';
import { writeFileSync } from 'fs';
import React from 'react';
import { Button, Tooltip, Table, Card } from 'antd';
import { EMP_ALL, EXCEL_COLS_WIDTH, EXCEL_HEADERS, TABLE_COLS } from './const';
import './mysql.less';

const xlsx = require('node-xlsx');
const toArray = require('lodash.toarray');
const moment = require('moment');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ews',
});

let exportData: ReadonlyArray<any> = [];

export default class MySQL extends React.Component<PageProps> {
  state = {
    dataSource: [],
  };

  private readonly timeNow = () => moment(Date.now()).format('YYYYMMDD-HHmmss');

  componentDidMount(): void {
    connection.connect();
    connection.query(EMP_ALL, (error: any, results: ReadonlyArray<any>) => {
      if (error) throw error;
      exportData = results;
      this.setState({ dataSource: results });
    });
    connection.end();
  }

  async onExport() {
    const defaultName = '旧员工导出数据';
    const options: Electron.SaveDialogOptions = {
      title: '保存文件',
      defaultPath: `${defaultName}-${this.timeNow()}`,
      buttonLabel: '保存',
      filters: [
        { name: 'Excel文件', extensions: ['xlsx'] },
        { name: '所有文件', extensions: ['*'] },
      ],
    };

    const { filePath, canceled } = await remote.dialog.showSaveDialog(options);
    if (filePath && !canceled) {
      const data = exportData.map((item, index) => {
        if (index === 0) return EXCEL_HEADERS;
        return toArray(item);
      });

      const cols = { '!cols': EXCEL_COLS_WIDTH };
      const sheetName = defaultName;
      const buffer = xlsx.build([{ name: sheetName, data }], cols);
      writeFileSync(filePath, buffer);
    }
  }

  render() {
    return (
      <Card
        title="导出小工具"
        extra={
          <Tooltip title={'点击一下就可完成导出功能'}>
            <Button type="primary" onClick={this.onExport}>
              导出
            </Button>
          </Tooltip>
        }
      >
        <Table
          className="mysql flex column center"
          dataSource={this.state.dataSource}
          columns={TABLE_COLS}
          rowKey="旧系统员工ID"
        />
      </Card>
    );
  }
}
