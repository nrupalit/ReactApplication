import React from 'react'
import './manpowertable.css'

export default function ProjectManpowerScheduleTable(props) {
let rowIndex=0;
let { upperHeader,lowerHeader,row,edit,onCheck,onInputChange,checkRow }=props;
let checkedStyle={backgroundColor:"#f28c8f",color:"white"}
let UpperheaderJsx=upperHeader.map(header=>{
    return <th colspan="4">
    {header}
    </th>
})

let LowerheaderJsx=lowerHeader.map(header=>{
    return <th>
    {header}
    </th>
})

let TableHeaderGrey=lowerHeader.map(header=>{
    return <th className="table__heading">
    {/* {header} */}
    </th>
})

let rowJsx=row.map((row,rowIndex)=>{
    return <tr id={`row:${rowIndex}`} key={`row:${rowIndex}`}     style={{}}>
    {edit==true? (<td>
        <input type="checkbox" onChange={()=>onCheck(rowIndex)} />
    </td>):null} 
        {row.map((cell,index)=>{
        return <td id={`cell:${index}`} key={`cell:${index}`}>
            <input type="text" value={cell}
            className="tablerowinput" 
            style={{textAlign:'center'}}
            onChange={(e)=>onInputChange(e.target.value,rowIndex,index)}            
            disabled = {edit==true?false:true} style={checkRow==rowIndex?checkedStyle:null}/>              
           </td>
    })}
    </tr>
})
  return (
    //   <form className="manpowergco__scrolltable">
    <React.Fragment>
    <div className="table__bottom--padding"> 

    <table className="manpowergco">
    {props.children}
        <thead>
            <tr className="table__heading">
             {/* <th className="table__heading">
             {/* {LowerheaderJsx} */}
                 {/* </th> */} 
                 {edit==true? (<th className="table__heading">
        </th>):null}
                 {TableHeaderGrey}

            </tr>
        </thead>
        <tbody>
            {rowJsx}
        </tbody>  
    </table>
    </div>
    </React.Fragment>
    // </form>
  )
}
