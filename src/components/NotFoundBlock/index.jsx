import React from 'react';
import styles from './NotFoundBlock.module.scss';

export default function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <br />
      <h1> Not found...</h1>
      <p className={styles.description}>this page does not exist</p>
    </div>
  );
}
