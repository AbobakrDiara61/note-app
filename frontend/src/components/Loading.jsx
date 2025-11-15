import React from 'react'

const Loading = () => {
  return (
    <div className='fixed w-full h-screen z-20 flex justify-center items-center bg-base/10 backdrop-blur-sm'>
        <div className='size-24 rounded-full animate-spin border-b-2 border-primary'>

        </div>
    </div>
  )
}

export default Loading
