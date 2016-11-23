import React from 'react'
import R from 'ramda'
import classnames from 'classnames'
import { Link } from 'react-router'

import styles from './dashboard-style.styl'
import ChartComponent from './ChartComponent'
import opt from './chartsdata'

const renderChart = (opt1, numb) => {
  const lay = numb === 0 ? styles.left : styles.right
  return (
    <div
      key={ opt1.title.text }
      className={ classnames(styles.preContainer, lay) }
    >
      <div
        className={ styles.container }
      >
        <ChartComponent
          container={ opt1.title.text }
          options={ opt1 }
        />
      </div>
    </div>
  )
}


const Dashboard = () => {
  const graph = R.zip([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], opt)
  return (
    <div className={ styles.dashboard }>
      <div className={ styles.mainBlock }>
        <div className={ styles.headBlock }>
          <div className={ styles.title }>
            { 'Целевые показатели' }
          </div>
          <Link to={ '/' } className={ styles.link }>
            <div
              title={ 'Close card' }
              className={ styles.close }
            >
            </div>
          </Link>
        </div>
        { graph.map(([numb, option]) => renderChart(option, numb)) }
      </div>
    </div>
  )
}

export default Dashboard
