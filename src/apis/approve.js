import axios from './index'

export const getH5ApprovalInfo = body => {
  return axios.post('/usrCloud/vn/ns/personnel/approval/getH5ApprovalInfo', body)
}
