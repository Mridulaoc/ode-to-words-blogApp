import React, {useId} from 'react'

const Select = React.forwardRef(function Select ({
    label,
    options,
    className="",
    ...props
},ref)
{
    const id = useId();
    return(
        <div className='w-full flex gap-2 justify-center my-3'>
            {label && <label htmlFor={id}>{label}</label>}
            <select className={`${className} rounded-md`} id={id} ref={ref} {...props}>
                {options ?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
})
 

export default Select
