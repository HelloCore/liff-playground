import React from 'react'
import liff from '@line/liff'
import styles from './App.module.css'
import Header from './components/Header'
import Snippet from './components/Snippet'
import Input from './components/Input'
import { FilterContext, FilterTypes } from './Context'
import qrCode from './qr-code.png'
import { SHARE_TARGET_PICKER_FIXED_ARGUMENT_LIST } from './constants'

const isMINI = new URLSearchParams(location.search).has('mini')
const filter = isMINI ? FilterTypes.MINI : FilterTypes.LIFF

function App() {
  let isLoggedIn = false
  try {
    isLoggedIn = liff.isLoggedIn()
  } catch (e) {
    console.log(e)
  }
  return (
    <FilterContext.Provider value={filter}>
      <Header />
      <div className={styles.container}>
        <div className={styles.liffIdBox}>
          <Input
            readonly
            value={`LIFF URL: https://liff.line.me/${import.meta.env.VITE_LIFF_ID.toString()}`}
          />
          <img src={qrCode} className={styles.qrCode} />
        </div>
        <h1>Client APIs</h1>
        <Snippet
          apiName="liff.xxxxx"
          version="1.0"
          docUrl="https://developers.line.biz/en/reference/liff/#close-window"
          skipAutoRun={true}
          hideResponse={true}
          runner={async () => {
            liff.openWindow({
              url: 'https://info.scb.co.th/scbeasy/easy_app_link.html?URI=scblvl://drtdr/landing?prodPackageId=0014_TJ_RV_01',
              external: true,
            })
            return await liff.closeWindow()
          }}
        />
      </div>
    </FilterContext.Provider>
  )
}


export default App
