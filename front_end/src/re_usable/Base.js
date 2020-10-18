import React from 'react'
import Menu from './Menu'

export default function Base({title="My Title",className="p-4",children}) {
    return (
        <div>
            <Menu/>
            <div className="container-fluid text-center">
                <h2 className="display-4">{title}</h2>
                <div className={className}>{children}</div>
            </div>
        </div>
    )
}
