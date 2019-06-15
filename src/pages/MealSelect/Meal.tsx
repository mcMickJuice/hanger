import React from 'react'

interface Props {
  id: string
  name: string
}

const style = {
  padding: '16px',
  backgroundColor: 'tomato',
}

const Meal = ({ name }: Props) => {
  return (
    <div style={style}>
      <div>{name}</div>
    </div>
  )
}

export default Meal
