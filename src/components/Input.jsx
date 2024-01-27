import React,{useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
},ref){
     const id = useId();
    return(
        <div className='w-full flex flex-col px-10 py-3'>
        {label && <label htmlFor={id} className='inline-block mb-1 pl-1 text-left'>
                {label}
        </label>}
        <input type={type} ref={ref} className={`${className} px-2 py-3 bg-transparent border border-gray-600 rounded-md placeholder-gray-500 text-white`} {...props} id={id} />

        </div>
    )
  
})

export default Input
