import React from 'react'
import PropTypes from 'prop-types'
import styles from './Icon.module.css'

const Icon = (props) => {
  const { children, className, size } = props
  const classes = (className) ? `${className} ${styles.icon}` : styles.icon
  const customSize = {
    height: size,
    width: size
  }
  let iconContents = (
    <use xlinkHref={`#${props.name}`} />
  )
  /* If inline SVG used render */
  if (children && (children.type === 'g' || children.type === 'svg')) {
    iconContents = children
  }

  return (
    <span className={styles.wrapper}>
      <svg style={customSize} className={classes}>
        {iconContents}
      </svg>
    </span>
  )
}

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  children: PropTypes.element,
}
export default Icon
