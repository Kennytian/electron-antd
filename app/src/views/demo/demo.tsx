import * as React from 'react';
import { Button, Input, Spin, Card, Upload } from 'antd';

import { withStore } from '@/src/components';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { readFileSync } from 'fs';

interface DemoProps extends PageProps, StoreProps {
  count: StoreStates['count'];
  countAlias: StoreStates['count'];
}

declare interface DemoState {
  resData: queryTestInfoUsingGET.Response | {};
  loading: boolean;
  createWindowLoading: boolean;
  asyncDispatchLoading: boolean;
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

@withStore(['count', { countAlias: 'count' }])
export default class Demo extends React.Component<DemoProps, DemoState> {
  // state 初始化
  state: DemoState = {
    resData: {},
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
  };

  // 构造函数
  constructor(props: DemoProps) {
    super(props);
  }

  componentDidMount() {
    console.log(this);
  }

  uploadProps = {
    name: 'file',
    action: '#',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info: UploadChangeParam) {
      console.log('info.file.status===', info.file.status);
      if (info.file.status === 'done' || info.file.status === 'error') {
        // @ts-ignore
        const { path } = info?.file?.originFileObj;
        const content = readFileSync(path).toString();
        console.log(content);
      }
      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (info.file.status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
  };

  render() {
    const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state;
    const { count: reduxCount, countAlias } = this.props;
    return (
      <div className="layout-padding">
        <Card title="Redux Test" className="mb-16">
          <p>redux count : {reduxCount}</p>
          <p>redux countAlias : {countAlias}</p>

          <div className="mt-16">
            <Button
              type="primary"
              onClick={() => {
                this.props.dispatch({ type: 'ACTION_ADD_COUNT', data: reduxCount + 1 });
              }}
            >
              Add
            </Button>

            <Button
              className="ml-16"
              type="primary"
              onClick={() => {
                this.props.dispatch({ type: 'ACTION_ADD_COUNT', data: countAlias + 1 });
              }}
            >
              Add (alias)
            </Button>

            <Button
              className="ml-16"
              type="primary"
              loading={asyncDispatchLoading}
              onClick={() => {
                this.props.dispatch(this.asyncDispatch);
              }}
            >
              Add (async)
            </Button>
          </div>

          <p className="text-gray mt-16 mb-16">
            Redux runs in the main process, which means it can be shared across all renderer processes.
          </p>

          <Button onClick={this.openNewWindow} loading={createWindowLoading}>
            Open new window
          </Button>
        </Card>

        <Card title="Request Test" className="mb-16">
          <Spin spinning={loading}>
            <div className="mb-16">
              <Button type="primary" onClick={this.requestTest.bind(this)}>
                Request
              </Button>

              <Button className="ml-16" type="primary" onClick={this.requestTestError.bind(this)}>
                Request Error (notification)
              </Button>

              <Button className="ml-16" type="primary" onClick={this.requestTestErrorModal.bind(this)}>
                Request Error (modal)
              </Button>

              <Button className="ml-16" type="primary" onClick={this.requestQRCode}>
                requestQRCode
              </Button>
            </div>

            <Input.TextArea value={JSON.stringify(resData)} autoSize />
          </Spin>
        </Card>

        <Card title="文件上传" className="mb-16">
          <Upload {...this.uploadProps}>
            <Button>
              <i className="ri-file-upload-line" />
              <span style={{ marginLeft: 3, marginTop: -8 }}>文件上传</span>
            </Button>
          </Upload>
        </Card>
      </div>
    );
  }

  asyncDispatch = (dispatch: Dispatch) => {
    return new Promise((resolve) => {
      this.setState({ asyncDispatchLoading: true });
      setTimeout(() => {
        const { count } = this.props;
        dispatch({ type: 'ACTION_ADD_COUNT', data: count + 1 });
        this.setState({ asyncDispatchLoading: false });
        resolve();
      }, 1000);
    });
  };

  openNewWindow = () => {
    this.setState({ createWindowLoading: true });
    $tools.createWindow('Demo').finally(() => this.setState({ createWindowLoading: false }));
  };

  requestTest() {
    this.setState({ loading: true });
    $api
      .queryTestInfo({})
      .then((resData) => {
        this.setState({ resData });
      })
      .finally(() => this.setState({ loading: false }));
  }

  requestQRCode = () => {
    this.setState({ loading: true });
    $api
      .getLoginQRCode({})
      .then((resData) => {
        console.log('resData====', resData);
        this.setState({ resData });
      })
      .finally(() => this.setState({ loading: false }));
  };

  requestTestError() {
    this.setState({ loading: true });
    $api
      .queryTestInfoError({})
      .catch((resData) => {
        this.setState({ resData });
      })
      .finally(() => this.setState({ loading: false }));
  }

  requestTestErrorModal() {
    this.setState({ loading: true });
    $api
      .queryTestInfoError({}, { errorType: 'modal' })
      .catch((resData) => {
        this.setState({ resData });
      })
      .finally(() => this.setState({ loading: false }));
  }
} // class Demo end
