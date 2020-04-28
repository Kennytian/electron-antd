/* eslint-disable */
export const EMP_ALL = `select ifnull(e.Name,'') 姓名, '' as '部门', '' as '小组', '' as '职务', ifnull(e.Phone,'') as 手机号, ifnull(e.Identity,'') as 身份证, ifnull(e.CreaterTime,'') as 入职时间, (case e.IsQuite when 0 then '在职' when 1 then '离职' end) as 状态, e.ID as 旧系统员工ID, substring_index(e.code,' ',1) as 旧系统小组,substring_index(e.code,' ',-1) as 旧系统编号 from tbl_emp as e where e.Code != 'admin' and e.Code not like '%磅%' and e.isQuite=0 order by e.CreaterTime desc;`;

export const TABLE_COLS = [
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
];

export const EXCEL_HEADERS = [
  '姓名', // A
  '部门', // B
  '小组', // C
  '职务', // D
  '手机号', // E
  '身份证', // F
  '入职时间', // G
  '状态', // H
  '旧系统员工ID', // I
  '旧系统小组', // J
  '旧系统编号', // K
];

export const EXCEL_COLS_WIDTH = [
  { wch: 12 }, // A
  { wch: 9 }, // B
  { wch: 9 }, // C
  { wch: 9 }, // D
  { wch: 12 }, // E
  { wch: 19 }, // F
  { wch: 20 }, // G
  { wch: 6 }, // H
  { wch: 34 }, // I
  { wch: 10 }, // J
  { wch: 10 }, // K
];
