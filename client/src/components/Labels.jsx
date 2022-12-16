import React from 'react'
import {default as api} from '../store/apiSlice';
import {getLabels} from '../helper/helper'

// const obj = [
//     {
//         type: 'Savings',
//         color: '#f9c74f',
//         percent: 45
//     },
//     {
//         type: 'Investment',
//         color: '#f9c74f',
//         percent: 20
//     },
//     {
//         type: 'Expense',
//         color: 'rgb(54,162,235)',
//         percent: 10
//     }
// ]

const Labels = () => {

    // console.log(api.useGetCategoriesQuery());
    const {data,isFetching,isSuccess,isError} = api.useGetLabelsQuery();
    // console.log(data);

    // for first two functions
    // getSum(data);


    
    
    let Transactions;

    if(isFetching){
        Transactions = <div>Fetching</div>

    }else if(isSuccess){
        // console.log(getLabels(data, 'type'))
        Transactions = getLabels(data, 'type').map((data,index)=> <LableComponent key={index} data={data}></LableComponent>)

    }else if(isError){
        Transactions = <div>Error</div>

    }
    

  return (
    <>
        {/* { */}
            {/* obj.map((data,index)=> <LableComponent key={index} data={data}></LableComponent>) */}

            {Transactions}
            
        {/* } */}
    </>
  )
}

export default Labels


function LableComponent({data}){
    if(!data) return <></>
    return(
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div className='w-2 h-2 rounded py-3' style={{background: data.color ?? '#f9c74f'}}></div>
                <h3 className='text-md'>{data.type ?? ''}</h3>
            </div>
            <h3 className='font-bold' style={{color: data.color ?? '#f9c74f'}}>{Math.round(data.percent) ?? 0}%</h3>
            {/* <h3 className='font-bold' style={{color: data.color ?? '#f9c74f'}}>0%</h3> */}
        </div>
    )
}