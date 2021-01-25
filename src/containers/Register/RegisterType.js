import React from 'react';
import Bootstrap from "./../../Bootstrap/bootstrap.module.css";
import styles from "./Register.module.css";
import cx from "classnames";


export default function RegisterType(props) {
    const {accountType}=props;
  return (
    <>
        <div className={cx(Bootstrap["container"], styles["register-account-wrapper"])}>
            <div className={Bootstrap['row']}>
                <div className={cx(Bootstrap['col-md-6'],styles['account-card'])}>
                        <div className={Bootstrap['row']}>
                        <img src={require('assets/icons/individual.svg')}
                        height="150"
                        width="180"
                        className={styles['account_img']}
                        />
                        </div>
                        <div className={Bootstrap['row']}>
                        <button className={styles['account_button']}
                        onClick={accountType('individual')}
                        > Individual  </button>
                        </div>
                        </div>
                <div className={cx(Bootstrap['col-md-6'],styles['account-card'])}>
                    <div className={Bootstrap['row']}>
                    <img src={require('assets/icons/company.svg')} 
                    height="150" 
                    width="180" 
                    className={styles['account_img']}/>

                    </div>
                    <div className={Bootstrap['row']}>
                    <button className={styles['account_button']}
                  onClick={accountType('company')}

                    > Company </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
