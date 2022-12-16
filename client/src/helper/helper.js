import _ from 'lodash'

// export function getSum(transaction){
//     let sum = _(transaction)
//                 .groupBy('type')
//                 .map((objs,key) => {
//                     return objs
//                 })
//                 .value()

//         console.log(sum);
// }


// export function getSum(transaction){
//     let sum = _(transaction)
//                 .groupBy('type')
//                 .map((objs,key) => {
//                     return _.sumBy(objs,'amount')
//                 })
//                 .value()

//         console.log(sum);
// }



export function getSum(transaction,type){
    let sum = _(transaction)
                .groupBy('type')
                .map((objs,key) => {
                if(!type)  return _.sumBy(objs,'amount')  /* [300,120,233] return sum of type of values */
                return {
                    'type': key,
                    'color': objs[0].color,
                    'total': _.sumBy(objs,'amount')
                }
                })
                .value()

        // console.log(sum);
        return sum;
}


export function getLabels(transaction){
    let amountSum = getSum(transaction, 'type');
    let Total = _.sum(getSum(transaction));

    let  percent = _(amountSum)
                            .map(objs => _.assign(objs, { percent : (100 * objs.total)  / Total}))
                            .value()

    return percent;
}



export function chart_Data(transaction, custom){

    let bg = _.map(transaction, a => a.color)
    // console.log(bg)''
    bg = _.uniq(bg)
    let dataValue = getSum(transaction)

    const config = {
        data : {
          datasets: [{
              data: dataValue,
              backgroundColor: bg,
              hoverOffset: 4,
              borderRadius : 30,
              spacing: 10
            }]
        },
        options : {
            cutout: 115
        }
    }

    return custom ?? config;

}

export function getTotal(transaction){
    return _.sum(getSum(transaction));
}