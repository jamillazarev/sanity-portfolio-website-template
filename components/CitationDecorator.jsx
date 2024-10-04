import React from 'react'
import styles from './CitationDecorator.module.css'

const CitationDecorator = props => {
  return <cite className={styles.citation}>{props.children}</cite>
}

export default CitationDecorator