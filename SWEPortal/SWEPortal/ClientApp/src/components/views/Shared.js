import './base.css'
import { useState } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import api from '../../api/api'

const FormHeader = ({ name }) => (
    <div>
        <h2>{name}</h2>
        <hr />
    </div>
)

const ErrorMessages = ({ errors }) => (
    <div className="error-parent">
        {errors.map(error => <div key={error.message} className="error">{error.message}</div>)}
    </div>
)

export { FormHeader, ErrorMessages };
