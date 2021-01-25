import React from 'react';
import cx from 'classnames';
import Bootstrap from './../../../Bootstrap/bootstrap.module.css';
import styles from './existproject.module.css';

export default function ProjectsCard(props) {
    let {
        formval,
        dock,
        index,
        projectId
      } = props;
     //  alert(JSON.stringify(formval))
  return (
    <div className={cx(Bootstrap['col-md-3'],styles.projectcards)}  onClick={dock(index,projectId)}>
    <div >
         {/* <button className={Bootstrap['btn']} ></button> */}
    <p>{formval.project_name}</p>
    <hr className={styles['projectsearch__underline']} />
    </div>        
    <div >
         <h6>Project Id: {formval.project_id}</h6>
    </div>
    <div className={cx(Bootstrap['row'])}>
            <div className={Bootstrap['col-sm']}>
                    <div >
                    <p>First Name</p>
                        <hr className={styles['projectsearch__underline']}/>
                        <h6>{formval.client_first_name}</h6>
                    </div>
                    <div >
                    <p> Mobile No</p>
                         <hr className={styles['projectsearch__underline']}/>
                         <h6>{formval.client_mobile}</h6>
                   </div>
                   <div >
                   <p>City</p>
                        <hr className={styles['projectsearch__underline']}/>
                        <h6>{formval.client_city}</h6>
                   </div>                           
            </div>
            <div className={Bootstrap['col-sm']}>
                  <div >
                  <p>Last Name</p>
                        <hr className={styles['projectsearch__underline']}/>
                        <h6>{formval.client_last_name}</h6>
                    </div>
                    <div >
                    <p>Email address</p>
                        <hr className={styles['projectsearch__underline']}/>
                        <h6>{formval.client_email}</h6>
                   </div>
                   <div >
                   <p> Locality/Area</p>
                        <hr className={styles['projectsearch__underline']}/>
                        <h6>{formval.client_area}</h6>
                   </div>
            </div>
     </div>
</div>

  )
}
