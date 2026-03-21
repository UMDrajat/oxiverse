import React from 'react'

interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

type ButtonProps = BaseButtonProps & (
  | { href?: string; target?: string; rel?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
  | { href?: never; target?: never; rel?: never } & React.ButtonHTMLAttributes<HTMLButtonElement>
)

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900'

  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-lg shadow-primary-500/30',
    secondary: 'bg-accent-600 hover:bg-accent-700 text-white focus:ring-accent-500 shadow-lg shadow-accent-500/30',
    outline: 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 focus:ring-primary-500',
    ghost: 'text-dark-300 hover:text-white hover:bg-white/5 focus:ring-dark-500',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
