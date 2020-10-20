/**
 * 详细接口类型定义在: @/typescript/api-interface/*
 */

/**
 * 测试接口
 * @param params
 * @param options
 */
export function queryTestInfo(
  params?: queryTestInfoUsingGET.Params,
  options?: RequestOptions
): Promise<queryTestInfoUsingGET.Response> {
  return $api.request('/demo/demo-test', params, options);
}

/**
 * 测试接口-返回错误
 * @param params
 * @param options
 */
export function queryTestInfoError(
  params?: queryTestInfoUsingGET.Params,
  options?: RequestOptions
): Promise<queryTestInfoUsingGET.Response> {
  return $api.request('/demo/demo-test-error', params, options);
}

/**
 * 测试接口
 * @param params
 */
export function getLoginQRCode(params?: queryTestInfoUsingGET.Params): Promise<queryTestInfoUsingGET.Response> {
  return $api.request('/api/user/wechat/loginqrcode', params, {
    protocol: 'https://',
    host: 'iot.zgljd.com',
    baseUrl: '',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // deviceId: '9FDEC1790F3104B5',
      random: `${Math.random()}`,
      timestamp: `${Date.now()}`,
    },
  });
}
