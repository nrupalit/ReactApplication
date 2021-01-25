import React from 'react'
import './manpowertable.css';

export default function ProjectManpowerMainTableHeader(props) {
    const { upperHeader,lowerHeader,edit}=props;

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
  return (
      <React.Fragment>
          <thead>
            <tr className="upperHeader">
        {edit==true? (<th>
        </th>):null}
               {UpperheaderJsx}
               {}
            </tr>
        </thead>

        <thead>
            <tr className="lowerHeader">
        {edit==true? (<th>
        </th>):null}
               {LowerheaderJsx}
               {}
            </tr>
        </thead>
    </React.Fragment>
  )
}
