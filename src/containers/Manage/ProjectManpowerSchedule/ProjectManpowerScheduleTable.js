import React from 'react'
import  './manpowerscheduletable.css'
export default function ProjectManpowerScheduleTable(props) {
let rowIndex=0;
let {lowerHeader, row,edit,onCheck,onInputChange,totalFootCount}=props;

let TableHeaderGrey=lowerHeader.map(header=>{
    return <th className="table__heading">
    </th>
})

let rowJsx=row.map((row,rowIndex)=>{
    return <tr id={`row:${rowIndex}`} key={`row:${rowIndex}`}>
    {edit==true? (<td>
        <input type="checkbox" onChange={()=>onCheck(rowIndex)} />
    </td>):null} 
        {row.map((cell,index)=>{
        return <td id={`cell:${index}`} key={`cell:${index}`}>
        {(cell!=1)?
            <input type="text" value={cell}
            className="tablerowinput" 
            style={(edit==true)?{textAlign:'center',border:'1px solid silver'}:{textAlign:'center',border:'none'}}
            onChange={(e)=>onInputChange(e.target.value,rowIndex,index)}            
            disabled = {edit==true?false:true}/>              
            : <input type="text" value={cell}
            className="tablerowinput" 
            style={(edit==true)?{textAlign:'center',border:'1px solid silver'}:{textAlign:'center',border:'none'}}
            onChange={(e)=>onInputChange(e.target.value,rowIndex,index)}            
            disabled = {true}/>    
           }
           </td>
    })}
    </tr>

})

let tableFootJsx=totalFootCount.map((row,rowIndex)=>{
    return <td id={`tfoot:${rowIndex}`} key={`tfoot:${rowIndex}`}>
         {/* <td> */}
             {row}
         {/* </td> */}
    </td>

})

  return (
    <React.Fragment>
    <div className="table__bottom--padding"> 
            <table className="manpowergco">
                {props.children}
                <thead>
                    <tr className="table__heading"> 
                        {edit==true? 
                        (<th className="table__heading">
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
  )
}
