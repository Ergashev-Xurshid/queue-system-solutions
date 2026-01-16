import React from 'react'
import { ScaleLoader } from 'react-spinners'

function LoaderFunction() {
  return (
    <div className="flex justify-center items-center mt-10">
     <ScaleLoader color="#a3d6bff1" width={20} height={150} />
    </div>
  )
}

export default LoaderFunction