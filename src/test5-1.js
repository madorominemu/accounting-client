// 假设数组list存储了某试卷题目的所有基础信息(如题目标题，题目类型，答案，选项等)，现需要将此list转换成真实的试卷题目字符串（见下面的格式例子），请用javascript编写一个函数实现上述功能（输入list数组，以console.log的方式打印出试卷题目字符串）。
//
//
// list变量例子：

 const list = [
     {
         question:'中国的首都是哪里',
         answer: 'a',
         type: 'singleSelect',
         options: {
             a: '北京',
             b: '上海',
             c: '深圳',
         },
     },
     {
         question:'以下哪些是省会城市',
         type: 'multiSelect',
         answer: ['a', 'b', 'c'],
         options: {
             a: '石家庄',
             b: '广州',
             c: '长沙',
             d: '深圳'
         },
     },
     {
         question:'重庆是中国人口最多的城市吗',
         type: 'yesno',
         answer: 'Yes'
     }
 ]
//
// 需转换的真实目标试卷题目字符串：（基于list生成的）
//
// Q1: 中国的首都是哪里？
// A: 北京
// B: 上海
// C: 深圳
// 答案：[ A ]
//
// Q2: 以下哪些是省会城市？
// A: 石家庄
// B: 广州
// C: 长沙
// D: 深圳
// 答案：[ A,B,C ]
//
// Q3: 重庆是中国人口最多的城市吗？
// 答案：[ Yes ]

const fun = (input) => {
    let n = input.length;
    for (let i = 0; i < n; i++ ) {
        let num = i + 1;
        console.log('Q'+num+': '+input[i].question+'?');
        if (input[i].type != 'yesno') {
            for (let key of Object.keys(input[i].options)) {
                console.log(key.toUpperCase() + ':' + input[i].options[key]);
            }
        }
        console.log('答案: [ '+input[i].answer.toString().toUpperCase()+' ]');
    }
}

fun(list)