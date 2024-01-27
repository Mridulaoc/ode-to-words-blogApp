import React from 'react'

const Button = ({
    children,
    type = 'button',
    bgColor ='bg-transparent border border-gray-600',
    textColor = 'text-white',
    className = '',
    ...props
}) => {
  return (
    <button className={`px-6 py-2 rounded-lg hover:bg-yellow-500 hover:border-yellow-500 transition-colors duration-1000 ease-in ${className} ${bgColor} ${textColor}`} type={type} {...props}>
        {children}
    </button>
  )
}

export default Button
