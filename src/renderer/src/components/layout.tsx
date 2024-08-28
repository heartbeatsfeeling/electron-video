import { IconButton } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { Fragment } from 'react'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import TransformIcon from '@mui/icons-material/Transform'
import MetaData from './meta-data'
import Message from './message'

export default function Layout () {
  return (
    <Fragment>
      <Message />
      <header></header>
      <div className='wrapper'>
        <div className="lnb">
          <MetaData />
          <ul>
            <li className='active'>
              <IconButton aria-label="delete">
                <div>
                  <ContentCutIcon />
                  <div className='text'>裁剪</div>
                </div>
              </IconButton>
            </li>
            {/* <li className='active'>
              <IconButton aria-label="delete">
                <div>
                  <TextFieldsIcon />
                  <div className='text'>字幕</div>
                </div>
              </IconButton>
            </li>
            <li>
              <IconButton aria-label="delete">
                <div>
                  <TransformIcon />
                  <div className='text'>转码</div>
                </div>
              </IconButton>
            </li> */}
          </ul>
        </div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </Fragment>
  )
}
