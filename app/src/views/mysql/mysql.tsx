import React from 'react'
import { Button, DatePicker, message, Divider, Col, Tooltip, Table, Card, Popover } from 'antd'
import { CheckCircleOutlined, StarFilled, StarOutlined, StarTwoTone } from '@ant-design/icons'

import './mysql.less'

/* eslint-disable */
export const EMP_ALL = `select ifnull(e.Name,'') 姓名, '' as '部门', '' as '小组', '' as '职务', ifnull(e.Phone,'') as 手机号, ifnull(e.Identity,'') as 身份证, ifnull(e.CreaterTime,'') as 入职时间, (case e.IsQuite when 0 then '在职' when 1 then '离职' end) as 状态, e.ID as 旧系统员工ID, substring_index(e.code,' ',1) as 旧系统小组,substring_index(e.code,' ',-1) as 旧系统编号 from tbl_emp as e where e.Code != 'admin' and e.Code not like '%磅%' and e.isQuite=0 order by e.CreaterTime desc;`

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ews',
})

const columns = [
  {
    title: '姓名',
    dataIndex: '姓名',
    key: 'A',
  },
  {
    title: '部门',
    dataIndex: '部门',
    key: 'B',
  },
  {
    title: '小组',
    dataIndex: '小组',
    key: 'C',
  },
  {
    title: '职务',
    dataIndex: '职务',
    key: 'D',
  },
  {
    title: '手机号',
    dataIndex: '手机号',
    key: 'E',
  },
  {
    title: '身份证',
    dataIndex: '身份证',
    key: 'F',
  },
  {
    title: '入职时间',
    dataIndex: '入职时间',
    key: 'G',
  },
  {
    title: '状态',
    dataIndex: '状态',
    key: 'H',
  },
  {
    title: '旧系统员工ID',
    dataIndex: '旧系统员工ID',
    key: 'I',
  },
  {
    title: '旧系统小组',
    dataIndex: '旧系统小组',
    key: 'J',
  },
  {
    title: '旧系统编号',
    dataIndex: 'age',
    key: 'K',
  },
]

export default class MySQL extends React.Component<PageProps> {
  state = {
    dataSource: [],
  }

  componentDidMount(): void {
    connection.connect()
    connection.query(EMP_ALL, (error: any, results: ReadonlyArray<any>) => {
      if (error) throw error
      this.setState({ dataSource: results })
    })
    connection.end()
  }

  onExport() {
    console.log('1111')
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
          style={{ width: '100%', height: '100%' }}
          className="mysql flex column center"
          dataSource={this.state.dataSource}
          columns={columns}
          rowKey="旧系统员工ID"
        />
      </Card>
    )
  }
}
