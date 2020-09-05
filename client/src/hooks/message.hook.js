import { useCallback } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useMessage = () => {
   return useCallback(text => {
      toast(text, {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
      })
   }, [])
}

export default useMessage