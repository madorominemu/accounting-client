import * as echarts from 'echarts';
import {useEffect, useRef, useState} from 'react';
import '../../assets/css/Accounting.css';
import {DatePicker, DatePickerProps, Radio, RadioChangeEvent, TimePicker, TimePickerProps} from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setPickMonth, setPickUseType } from '../../store/account';
import {getAllAccount} from '../../api/account';

const Accounting = () => {

    const dispatch = useAppDispatch();
    const { pickMonth, pickUseType } = useAppSelector((state) => state.account);
    const [dataSource, setDataSource] = useState([]);

    const lineRef = useRef(null);
    const piePayRef = useRef(null);
    const pieIncomeRef = useRef(null);

    //created
    useEffect(() => {
        getData();
    },[])

    //请求
    const getData = () => {
        getAllAccount(1).then(res => {
            // @ts-ignore
            setDataSource(res.data);
        })
    }

    useEffect(()=>{
        // // @ts-ignore
        // console.log(dataFilter(dataSource, pickMonth));
        // // @ts-ignore
        // console.log(dataTags(dataFilter(dataSource, pickMonth)));
        // // @ts-ignore
        // console.log(dataSum(dataTags(dataFilter(dataSource, pickMonth)),dataFilter(dataSource, pickMonth)));
    },[pickMonth])

    //按时间与账单类型(收入或支出)过滤
    const dataFilter = (dataSource:[], pickMonth:String, isIncome:number) => {
        let filter: { value: any; name: any; }[] = [];
        dataSource.forEach((item:any) => {
            if(item.date.includes(pickMonth) && item.isIncome === isIncome) {
                let obj = {value: item.price, name: item.useType}
                filter.push(obj);
            }
        })
        return filter;
    }
    //获取标签
    const dataTags = (dataSource: { value: any; name: any }[]) => {
        let tags:String[] = [];
        dataSource.forEach((item:any) => {
            if(!tags.includes(item.name)) {
                tags.push(item.name)
            }
        })
        return tags;
    }
    //相同用途的金额相加
    const dataSum = (tags:String[],dataSource: { value: any; name: any }[]) => {
        let data: { value: number; name: String }[] = [];
        tags.forEach((tag:String) => {
            let sum = 0;
            dataSource.forEach((item:{ value: any; name: any }) => {
                if(item.name === tag) {
                    sum += item.value;
                }
            })
            data.push({value: sum,name: tag})
        })
        return data;
    }
    //支出饼图option
    const getOptionsPay = () => {
        // @ts-ignore
        let tags = dataTags(dataFilter(dataSource, pickMonth, 0));
        // @ts-ignore
        let data = dataSum(dataTags(dataFilter(dataSource, pickMonth, 0)),dataFilter(dataSource, pickMonth, 0));
        let options = {
            title: {
                text: '支出',
                left: 'center',
                top: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data: tags
            },
            series: [
                {
                    name: '支出',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    data: data,
                }
            ]
        }
        return options;
    }
    //收入饼图option
    const getOptionsIncome = () => {
        // @ts-ignore
        let tags = dataTags(dataFilter(dataSource, pickMonth, 1));
        // @ts-ignore
        let data = dataSum(dataTags(dataFilter(dataSource, pickMonth, 1)),dataFilter(dataSource, pickMonth, 1));
        let options = {
            title: {
                text: '收入',
                left: 'center',
                top: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data: tags
            },
            series: [
                {
                    name: '收入',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    data: data,
                }
            ]
        }
        return options;
    }



    //按时间与账单类型(收入或支出)过滤
    const dataFilterByDate = (dataSource:[], pickMonth:String, isIncome:number) => {
        let filter: { value: any; date: any; }[] = [];
        dataSource.forEach((item:any) => {
            if(item.date.includes(pickMonth) && item.isIncome === isIncome) {
                let obj = {value: item.price, date: item.date.substring(5,10)}
                filter.push(obj);
            }
        })
        return filter;
    }
    //获取日期不重复
    const dataDay = (dataSource: { value: any; date: any }[]) => {
        let days:String[] = [];
        dataSource.forEach((item:any) => {
            if(!days.includes(item.date)) {
                days.push(item.date)
            }
        })
        return days;
    }
    //相同日期的金额相加
    const dataSumInSameDay = (days:String[],dataSource: { value: any; date: any }[]) => {
        let data: { value: number; date: String }[] = [];
        days.forEach((day:String) => {
            let sum = 0;
            dataSource.forEach((item:{ value: any; date: any }) => {
                if(item.date === day) {
                    sum += item.value;
                }
            })
            data.push({value: sum,date: day})
        })
        return data;
    }
    //折线图option
    const getOptionLine = () => {
        // @ts-ignore
        let payDays = dataDay(dataFilterByDate(dataSource, pickMonth, 0));
        // @ts-ignore
        let payDataSource = dataSumInSameDay(dataDay(dataFilterByDate(dataSource, pickMonth, 0)),dataFilterByDate(dataSource, pickMonth, 0));

        // @ts-ignore
        let incomeDays = dataDay(dataFilterByDate(dataSource, pickMonth, 1));
        // @ts-ignore
        let incomeDataSource = dataSumInSameDay(dataDay(dataFilterByDate(dataSource, pickMonth, 1)),dataFilterByDate(dataSource, pickMonth, 1));


        let payDate:String[] = [];
        let payData:number[] = [];
        payDataSource.forEach((item:{value:number,date:String}) => {
            payDate.push(item.date);
            payData.push(item.value);
        })

        let incomeDate:String[] = [];
        let incomeData:number[] = [];
        incomeDataSource.forEach((item:{value:number,date:String}) => {
            incomeDate.push(item.date);
            incomeData.push(item.value);
        })

        let finalDate = [];
        if(payDate.length > incomeDate.length){
            finalDate = payDate;
        }else{
            finalDate = incomeDate;
        }

        const options = {
            title: {
                text: '趋势统计'
            },
            legend: {
                data: ['支出','收入']
            },
            xAxis: {
                data: finalDate
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: payData,
                    type: 'line',
                    name: '支出'
                },
                {
                    data: incomeData,
                    type: 'line',
                    name: '收入'
                }
            ]
        }
        return options
    }
    const payData = {
        date: ['8-1', '8-4', '8-8', '8-13', '8-17', '8-25', '8-30'],
        data: [100, 12, 55, 39, 88, 288, 65]
    }

    const incomeData = {
        date: ['8-3', '8-5', '8-10', '8-15', '8-25', '8-28'],
        data: [120, 40, 100, 35, 66, 3]
    }
    //折线option
    const options = {
        title: {
            text: '趋势统计'
        },
        legend: {
            data: ['支出','收入']
        },
        xAxis: {
            data: payData.date
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: payData.data,
                type: 'line',
                name: '收入'
            },
            {
                data: incomeData.data,
                type: 'line',
                name: '支出'
            }
        ]
    }

    const optionsPay = {
        title: {
            text: '支出',
            left: 'center',
            top: 'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            data: ['衣物','娱乐','饮食']
        },
        series: [
            {
                name: '支出',
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    {value: 335, name: '衣物'},
                    {value: 234, name: '娱乐'},
                    {value: 1548, name: '饮食'}
                ],
            }
        ]
    }

    const optionsIncome = {
        title: {
            text: '收入',
            left: 'center',
            top: 'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            data: ['工资','理财','转账']
        },
        series: [
            {
                name: '收入',
                type: 'pie',
                radius: ['40%', '70%'],
                data: [
                    {value: 2000, name: '工资'},
                    {value: 1000, name: '理财'},
                    {value: 500, name: '转账'}
                ],
            }
        ]
    }

    type PickerType = 'month' | 'year';
    const [type, setType] = useState<PickerType>('month');
    const PickerWithType = ({
        type,
        onChange,
    }: {
        type: PickerType;
        onChange: DatePickerProps['onChange'];
    }) => {
        return <DatePicker picker={type} onChange={onChange} />;
    }

    //折线图
    useEffect(() => {
        let op = getOptionLine();
        // @ts-ignore
        const chart = echarts.init(lineRef.current);
        chart.setOption(op);
        return () => {
            chart.dispose()
        }
    },[pickMonth])

    //支出饼图
    useEffect(() => {
        let op = getOptionsPay();
        // @ts-ignore
        const chart = echarts.init(piePayRef.current);
        chart.setOption(op);
        return () => {
            chart.dispose()
        }
    },[pickMonth])

    //收入饼图
    useEffect(() => {
        let op = getOptionsIncome();
        // @ts-ignore
        const chart = echarts.init(pieIncomeRef.current);
        chart.setOption(op);
        return () => {
            chart.dispose()
        }
    },[pickMonth])
    return(
        <div className="Accounting">
            <div className="optionBar">
                <div>
                    <PickerWithType type={type} onChange={(date, dateString) => {dispatch(setPickMonth(dateString));}}/>
                </div>
                <Radio.Group value={type} onChange={e => {setType(e.target.value)}}>
                    <Radio.Button value="month">月</Radio.Button>
                    <Radio.Button value="year">年</Radio.Button>
                </Radio.Group>
            </div>
            <div ref={lineRef} className="line"></div>
            <div className="pie">
                <div ref={piePayRef} className="piePay"></div>
                <div ref={pieIncomeRef} className="pieIncome"></div>
            </div>
        </div>
    )
}

export default Accounting;