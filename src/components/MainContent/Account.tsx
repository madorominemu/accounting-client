import {Button, Space, Table, DatePicker, Select, Modal, Form, Input, Checkbox, Radio, Switch, message, Popconfirm, DatePickerProps} from 'antd';
import '../../assets/css/Account.css';
import {useEffect, useState} from 'react';
import {getAllAccount, setAccount, updateAccount, deleteAccount} from '../../api/account'
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setPickMonth, setPickUseType } from '../../store/account';

const { Column } = Table;
const { Option } = Select;

const Account = () => {

    const dispatch = useAppDispatch();
    const { pickMonth, pickUseType } = useAppSelector((state) => state.account);
    const { isLogin, userId, username } = useAppSelector((state) => state.user);

    const [addFormVisible, setAddFormVisible] = useState(false);
    const [updateFormVisible, setUpdateFormVisible] = useState(false);
    const [form] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [dataFilterSource, setDataFilterSource] = useState([]);

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        dispatch(setPickMonth(dateString));
    };

    const handleChange = (value: string) => {
        dispatch(setPickUseType(value));
    };

    interface acc {
        id: React.Key;
        price: number;
        date: string;
        isIncome: boolean;
        useType: string;
        remark: string;
    }

    //created
    useEffect(() => {
        getData();
    },[isLogin])

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: acc[]) => {
            console.log(`id: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    }

    const handleCancel = () => {
        setAddFormVisible(false);
        form.resetFields();
    }

    const cancelUpdate = () => {
        setUpdateFormVisible(false);
        updateForm.resetFields();
    }

    //获取数据
    const getData = () => {
        getAllAccount(userId).then(res => {
            // @ts-ignore
            setDataSource(res.data);
            // @ts-ignore
            setDataFilterSource(res.data);
        })
    }

    //添加
    const handleOk = () => {
        form.validateFields().then((res) => {
            let params = new URLSearchParams();
            params.append('userId',userId.toString());
            params.append('price',res.price);
            params.append('date',res.date.format('YYYY-MM-DD'));
            params.append('isIncome',res.isIncome===undefined?'0':(res.isIncome?'1':'0'));
            params.append('useType',res.useType);
            params.append('remark',res.remark===undefined?"":res.remark);
            setAccount(params).then(res => {
                // @ts-ignore
                if(res.code === 1) {
                    getData();
                    message.success('添加成功');
                    setAddFormVisible(false);
                    form.resetFields();
                }else {
                    message.error('添加失败');
                }
            }).catch(err => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleDelete = (record:any) => {
        deleteAccount(record.id).then(res => {
            // @ts-ignore
            if(res.code === 1) {
                getData();
                message.success('删除成功');
                // @ts-ignore
                console.log(res.msg);
            }else {
                alert('删除失败');
            }
        })
    }
    //编辑数据初始化
    const handleUpdate = (record:any) => {
        setUpdateFormVisible(true);
        updateForm.setFieldsValue({
            id: record.id,
            price: record.price,
            date: moment(record.date),
            isIncome: record.isIncome,
            useType: record.useType,
            remark: record.remark
        });
    }
    //提交编辑
    const submitUpdate = () => {
        updateForm.validateFields().then((res) => {
            let params = new URLSearchParams();
            params.append('id',res.id);
            params.append('price',res.price);
            params.append('date',res.date.format('YYYY-MM-DD'));
            params.append('isIncome',res.isIncome===undefined?'0':(res.isIncome?'1':'0'));
            params.append('useType',res.useType);
            params.append('remark',res.remark===undefined?"":res.remark);
            updateAccount(params).then(res => {
                // @ts-ignore
                if(res.code === 1) {
                    getData();
                    message.success('修改成功');
                    setUpdateFormVisible(false);
                    updateForm.resetFields();
                }else {
                    message.error('修改失败');
                }
            }).catch(err => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    //条件查询
    const select = () => {
        let filter: never[] = [];
        dataSource.map(item => {
            // @ts-ignore
            if(item.date.includes(pickMonth) && item.useType.includes(pickUseType)){
                filter.push(item);
            }
        })
        setDataFilterSource(filter);
    }

    //重置
    const reset = () => {
        dispatch(setPickMonth(''));
        dispatch(setPickUseType(''));
        getData();
    }

    //排序func
    const sortByDate = (a:any,b:any) => {
        let aTimeString = a.date.replace('年','-').replace('月','-').replace('日','');
        let bTimeString = b.date.replace('年','-').replace('月','-').replace('日','');
        let aTime = new Date(aTimeString).getTime();
        let bTime = new Date(bTimeString).getTime();
        return aTime - bTime;
    }
    const sortByPrice = (a:any,b:any) => {
        return a.price - b.price;
    }

    return(
        <div className="Account">
            <div className="OptionBar">
                <div className="SearchBar">
                    <DatePicker onChange={onChange} picker="month" />
                    <Select onChange={handleChange} style={{width: 120}}>
                        <Option value="餐饮">餐饮</Option>
                        <Option value="购物">购物</Option>
                        <Option value="服饰">服饰</Option>
                        <Option value="娱乐">娱乐</Option>
                        <Option value="工资">工资</Option>
                        <Option value="其他">其他</Option>
                    </Select>
                    <Button type="primary" onClick={select}>查询</Button>
                    <Button onClick={reset}>重置</Button>
                </div>
                <Button type="primary" onClick={() => setAddFormVisible(true)}>记一笔</Button>
            </div>
            <div className="dataBar">
                <Table rowSelection={{
                    type: 'checkbox',
                    ...rowSelection
                }}
                       dataSource={dataFilterSource}
                       rowKey={data => data.id}
                       pagination={{pageSize: 10, position: ['bottomRight']}}
                >
                    <Column title="日期" dataIndex="date" key="date" width="200px" render={text => <span>{moment(text).format('YYYY年MM月DD日')}</span>} sorter={sortByDate}/>
                    <Column title="金额" dataIndex="price" key="price" width="200px" sorter={sortByPrice}/>
                    <Column title="分类" dataIndex="useType" key="useType" align="center" width="100px"/>
                    <Column title="备注" dataIndex="remark" key="remark" width="950px"/>
                    <Column align="center"
                        title="操作"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <a onClick={() => handleUpdate(record)}>编辑</a>
                                <Popconfirm
                                    title="确认删除？"
                                    onConfirm={() => handleDelete(record)}
                                    okText="确认"
                                    cancelText="取消"
                                >
                                    <a href="#">删除</a>
                                </Popconfirm>
                            </Space>
                        )}
                        />
                </Table>
            </div>
            <Modal title="记一笔" visible={addFormVisible} onOk={handleOk} onCancel={handleCancel} okText="提交" cancelText="取消">
                <Form form={form}>
                    <Form.Item
                        label="金额"
                        name="price"
                        rules={[{ required: true, message: '请填写金额' }]}
                        normalize={(value => { return parseInt(value) })}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="日期"
                        name="date"
                        rules={[{ required: true, message: '请选择日期' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        name="isIncome"
                        valuePropName="checked"
                    >
                        <Switch checked={false}/>
                    </Form.Item>
                    <Form.Item
                        label="分类"
                        name="useType"
                        rules={[{ required: true, message: '请选择分类' }]}
                    >
                        <Radio.Group>
                            <Radio value="餐饮">餐饮</Radio>
                            <Radio value="购物">购物</Radio>
                            <Radio value="服饰">服饰</Radio>
                            <Radio value="娱乐">娱乐</Radio>
                            <Radio value="工资">工资</Radio>
                            <Radio value="其他">其他</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="remark"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="编辑" visible={updateFormVisible} onOk={submitUpdate} onCancel={cancelUpdate} okText="提交" cancelText="取消">
                <Form form={updateForm}>
                    <Form.Item
                        label="id"
                        name="id"
                        hidden={true}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="金额"
                        name="price"
                        rules={[{ required: true, message: '请填写金额' }]}
                        normalize={(value => { return parseInt(value) })}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="日期"
                        name="date"
                        rules={[{ required: true, message: '请选择日期' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        name="isIncome"
                        valuePropName="checked"
                    >
                        <Switch checked={false}/>
                    </Form.Item>
                    <Form.Item
                        label="分类"
                        name="useType"
                        rules={[{ required: true, message: '请选择分类' }]}
                    >
                        <Radio.Group>
                            <Radio value="餐饮">餐饮</Radio>
                            <Radio value="购物">购物</Radio>
                            <Radio value="服饰">服饰</Radio>
                            <Radio value="娱乐">娱乐</Radio>
                            <Radio value="工资">工资</Radio>
                            <Radio value="其他">其他</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="remark"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Account;