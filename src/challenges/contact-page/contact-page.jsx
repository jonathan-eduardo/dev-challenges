import styles from './contact-page.module.css'
import ContactFormIcon from '../images/contact-form-icon.svg'
import { useEffect, useState } from 'react'
import data from './fields.json'

export default function ContactPage() {
  const [fields, setFields] = useState([])

  useEffect(() => {
    setFields(data.fields)
  }, [])

  return (
    <div className={styles.background}>
      <div className={styles.page}>
        <header className={styles.header}>
          <ContactFormIcon />
        </header>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Interested in our
            <br /> business pricing?
          </h1>
          <h2 className={styles.subtitle}>
            Fill out the form to view details and we’ll
            <br /> contact you as soon as possible.
          </h2>
          <form className={styles.form}>
            {fields &&
              fields.map((field) => {
                console.log(field)
                return <FormField key={field.id} {...field} />
              })}
            <button
              onClick={(e) => e.preventDefault()}
              className={styles.submitButton}
            >
              Contact Sales
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}

function FormField({ label, type, id, placeholder, elementType, options }) {
  function FormElement() {
    if (elementType === 'input') {
      return (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={styles.input}
        />
      )
    } else if (elementType === 'select') {
      return (
        <select name={name} id={id} className={styles.select}>
          {options.map(({ option }) => {
            return <option key={option}>{option}</option>
          })}
        </select>
      )
    } else if (elementType === 'textarea') {
      return (
        <textarea
          rows="10"
          className={styles.textarea}
          placeholder={placeholder}
          defaultValue="50-100 employees"
          name={name}
          id={id}
        ></textarea>
      )
    } else {
      return null
    }
  }

  return (
    <div
      className={`${styles.formField} ${
        elementType === 'textarea' && styles.fullWidth
      }`}
    >
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {<FormElement />}
    </div>
  )
}
