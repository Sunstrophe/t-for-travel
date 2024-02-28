import React from 'react'
import ExpShort from '../components/ExpShort'
import ExpSquare from '../components/ExpSquare'

function Development() {
  return (
    <div className="grid h-screen grid-cols-2">
        <div className="flex items-center justify-center">
            <ExpSquare></ExpSquare>
        </div >
        <div className="flex items-center justify-center">
            <ExpShort></ExpShort>
        </div>
    </div>
  )
}

export default Development